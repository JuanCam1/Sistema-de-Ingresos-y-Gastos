export interface MovementFilters {
  idUser?: string
  typeMovement?: string
  page?: number
  perPage?: number
}

export interface MovementMeta {
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface MovementResponse<T> {
  data: T[]
  meta: MovementMeta
}