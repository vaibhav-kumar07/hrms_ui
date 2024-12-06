export interface QueryParameters {
    [key: string]: string | undefined | string[];
}


export interface IResponse {
    data: any;
    meta: IPaginationMeta;
}
export interface IPaginationMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
    totalOutward: number;
    totalInward: number;
}