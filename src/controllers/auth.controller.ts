import { Body, Post, Route, Tags } from "tsoa";
import { Service } from "typedi";
import AuthService from "../services/auth.service";
import { LoginUserObj } from "../models/interface/user";
import { CreateOrganizationObj } from "../models/interface/organization";
import OrganizationService from "../services/organization.service";
import User from "../models/entities/user";


@Route("api/auth")
@Service()
@Tags("Auth")
export default class AuthController {
    constructor(
        private organizationService: OrganizationService,
        private authService: AuthService,
    ){}

    @Post("/register")
    public createOrganization(@Body() organizationObj: CreateOrganizationObj): Promise<boolean> {
        return this.organizationService.createOrganization(organizationObj);
    }

    @Post("/login")
    public loginUser(@Body() user: LoginUserObj): Promise<{userDetails: User, token: string}> {
        return this.authService.loginUser(user.email, user.password);
    }
}