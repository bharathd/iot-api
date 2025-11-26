import { Get, Query, Route, Tags, Security } from "tsoa";
import { Service } from "typedi";
import { PagingAndSortingOptions, PagingAndSortingResult } from "../models/paging-and-sorting";
import { TestData } from "../models/entities/testData";
import { TestService } from "../services/test.service";

@Route("api/test")
@Service()
@Tags("Test")
export default class TestController {
    constructor (public testService: TestService){}

    @Get("/")
    @Security("jwt", ["read"])
    public async getTestResp(
        @Query() name: string
    ): Promise<any> {
        return {Key: "name", Value: name };
    }

    @Get("/pagination")
    public async getTestDataWithPaging (
        @Query() page = "1",
        @Query() pageSize = "10",
        @Query() sortBy = "name",
        @Query() sortDir = "ASC",
    ): Promise<PagingAndSortingResult<TestData>> {
        const pagingAndSortingOptions: PagingAndSortingOptions = {
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            sortBy,
            sortDir,
        }
        return this.testService.getTestDataWithPagingAndSorting(pagingAndSortingOptions);
    }
}