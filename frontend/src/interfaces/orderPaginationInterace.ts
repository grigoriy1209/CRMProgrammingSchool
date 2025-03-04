export interface IOrderPagination <T>{
    total_items: number,
    total_pages: number,
    prev: string | null,
    current_page: number,
    next: string | null,
    result: T[],
}