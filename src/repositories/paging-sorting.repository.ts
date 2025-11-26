import { FindOptionsRelations, FindOptionsWhere, ObjectLiteral, ObjectType } from 'typeorm';
import dbConfig from '../config/db';
import { PagingAndSortingOptions, PagingAndSortingResult } from '../models/paging-and-sorting';

export default class PagingSortingRepository<T> {
    constructor(private entity: ObjectType<T>) { }

    public async getEntitiesWithPagingAndSorting(
        pagingAndSortingOptions: PagingAndSortingOptions,
        whereCondition?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
        relation?: FindOptionsRelations<T>
    ) {
        const repo = dbConfig.getRepository(this.entity);
        const relations = relation ? relation as FindOptionsRelations<ObjectLiteral> : undefined;
        const [entityResult, entityCount] = await Promise.all([
            repo.find({
                where: whereCondition,
                relations,
                order: { [pagingAndSortingOptions.sortBy]: pagingAndSortingOptions.sortDir },
                skip: (pagingAndSortingOptions.page - 1) * pagingAndSortingOptions.pageSize,
                take: pagingAndSortingOptions.pageSize,
            }) as Promise<T[]>,
            repo.count({ where: whereCondition ? whereCondition : undefined }),
        ]);

        const page: PagingAndSortingResult<T> = {
            totalPages: Math.ceil(entityCount / pagingAndSortingOptions.pageSize),
            totalElements: entityCount,
            pageOffset: pagingAndSortingOptions.page,
            pageSize: pagingAndSortingOptions.pageSize,
            data: entityResult,
        };
        return page;
    }
}