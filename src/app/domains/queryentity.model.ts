import { QueryWhere } from './querywhere.model';

export interface QueryEntity {
    queryWhere?: QueryWhere[];
    queryFields?: string;
    queryOrder?: string;
    pageSize?: number;
    pageIndex?: number;
}
