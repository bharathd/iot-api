import { Service } from "typedi";
import TestRepository from "../repositories/test.repository";
import { PagingAndSortingOptions, PagingAndSortingResult } from "../models/paging-and-sorting";
import { TestData } from "../models/entities/testData";


@Service()
export class TestService {
    constructor(
        private testRepository: TestRepository
    ) { }

    public async getTestDataWithPagingAndSorting(pagingAndSortingOptions: PagingAndSortingOptions): Promise<PagingAndSortingResult<TestData>> {
        return await this.testRepository.getTestDataWithPagingAndSorting(pagingAndSortingOptions);
    }
}