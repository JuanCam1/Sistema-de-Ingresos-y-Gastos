export interface UserFilters {
  name?: string
  email?: string
  page?: number
  perPage?: number
}

export interface UserMeta {
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface UserResponse<T> {
  data: T[]
  meta: UserMeta
}