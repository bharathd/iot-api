import { Service } from "typedi";
import { CustomerAuthObj } from "../models/interface/fas";
import CustomerRepository from "../repositories/customer.repository";
import dbConfig from "../config/db";
import crypto from "crypto";


@Service()
export default class FasService {
  constructor(private readonly customerRepository: CustomerRepository) { }

  private decodeFasToken(fasToken: string): Record<string, string> {
    const decodedString = Buffer.from(fasToken, 'base64').toString('utf-8');
    return Object.fromEntries(
      decodedString
        .split(",")
        .map((p) => p.trim())
        .map((p) => p.split("="))
        .filter(([k]) => k) // remove empty fields like "(null)"
    );
  }

  async customerAuthInit(customerAuth: CustomerAuthObj): Promise<{ customerId: string }> {
    const { customerName, mobileNumber, fasToken, organizationId } = customerAuth;
    
    const fasData = this.decodeFasToken(fasToken);
    const hid = fasData.hid;
    const macAddress = fasData.clientmac;
    const ipAddress = fasData.clientip;
    const originUrl = fasData.originurl;
    const gatewayAddress = fasData.gatewayaddress;

    const createdDate = Math.floor(Date.now() / 1000);
    // generate OTP and save customer details to DB
    const temp_otp = '2025';

    const { customerId } = await this.customerRepository.saveCustomer({
      organizationId,
      customerName,
      mobileNumber,
      hid,
      macAddress,
      ipAddress,
      otpCode: temp_otp,
      otpGeneratedDate: createdDate,
      fasToken,
      originUrl,
      gatewayAddress,
      createdDate
    });
    return { customerId };
  }

  private sha256(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
  }

  async verifyCustomerOtp(customerId: string, otp: string): Promise<{ authUrl: string }> {
    const customer = await this.customerRepository.getCustomerById(customerId);
    const { isOtpVerified, otpVerificationAttempts, otpGeneratedDate, otpCode, hid, originUrl, gatewayAddress } = customer;

    if (isOtpVerified) throw new Error("OTP already verified");
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - otpGeneratedDate > 300) throw new Error("OTP expired");
    if (otpVerificationAttempts >= 3) throw new Error("Maximum OTP verification attempts exceeded");
    if (otp !== otpCode) {
      await this.customerRepository.updateCustomer(customerId, { otpVerificationAttempts: otpVerificationAttempts + 1 });
      throw new Error("Invalid OTP");
    };

    const queryTransaction = dbConfig.createQueryRunner();
    await queryTransaction.connect();
    await queryTransaction.startTransaction();
    try {
      await this.customerRepository.updateCustomer(customerId, { isOtpVerified: true, otpVerificationAttempts: otpVerificationAttempts + 1 }, queryTransaction); 
      const rhid = hid + '1234567890';
      const hashedString = this.sha256(rhid);
      const authUrl = `http://${gatewayAddress}/opennds_auth/?tok=${hashedString}&redir=${originUrl}&custom=`
      return { authUrl };
    } catch (error) {
      await queryTransaction.rollbackTransaction();
      throw error;
    } finally {
      await queryTransaction.release();
    }
  }
}