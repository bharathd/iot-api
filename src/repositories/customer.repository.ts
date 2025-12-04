import { Service } from "typedi";
import dbConfig from "../config/db";
import Customer from "../models/entities/customer";
import { QueryRunner } from "typeorm";


@Service()
export default class CustomerRepository {
  private customerRepo = dbConfig.getRepository(Customer);

  public async saveCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepo.create(customerData);
    return this.customerRepo.save(customer);
  }

  public async getCustomerById(customerId: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { customerId } });
    if (!customer) throw new Error("Customer not found");
    return customer;
  }

  public async updateCustomer(customerId: string, updateData: Partial<Customer>, queryRunner?: QueryRunner): Promise<void> {
    const manager = queryRunner ? queryRunner.manager : this.customerRepo.manager;
    await manager.update(Customer, { customerId }, updateData);
  }
}