
export interface IPaginated<T = any> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page: number;
    totalPages: number;
    offset: number;
    prePage: number;
    nextPage: number;
}