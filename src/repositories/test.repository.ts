import { Service } from "typedi";
import dbConfig from "../config/db";
import { TestData } from "../models/entities/testData";
import { PagingAndSortingOptions } from "../models/paging-and-sorting";
import PagingSortingRepository from "./paging-sorting.repository";


@Service()
export default class TestRepository extends PagingSortingRepository<TestData> {
    constructor() {
        super(TestData);
    }
    private testDataRepo = dbConfig.getRepository(TestData);

    public getTestDataWithPagingAndSorting(pagingAndSortingOptions: PagingAndSortingOptions) {
        return this.getEntitiesWithPagingAndSorting(pagingAndSortingOptions);
    }
    
}