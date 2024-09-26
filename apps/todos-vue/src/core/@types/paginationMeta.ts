export interface IPaginationMeta {
  total: number
  lastPage: number
  currentPage: number
  pageSize: number
  prevPage: number | null
  nextPage: number | null
}
