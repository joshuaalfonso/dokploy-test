

import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export type SortOrder = 'asc' | 'desc'
export type ViewMode = 'card' | 'table'

export type AllowedSort = | 'created_at' | 'status' | 'task_title'

export type TaskParams = {
  limit?: number
  search?: string
  status?: string
  sort?: AllowedSort
  order?: SortOrder
//   cursor?: string | null
  page: number
  view?: ViewMode
}

export function useTaskParams() {

  const [params, setParams] = useSearchParams();

  const filters: TaskParams = {
    search: params.get('search') || undefined,
    status: params.get('status') || undefined,
    page: params.get('page')
      ? Number(params.get('page'))
      : 1,
    limit: params.get('limit')
      ? Number(params.get('limit'))
      : 10,
    sort: (params.get('sort') as AllowedSort) || undefined,
    order: (params.get('order') as SortOrder) || 'desc',
    view: (params.get('view') as ViewMode) || 'card',
  }

  const setFilters = useCallback((next: Partial<TaskParams>) => {
    setParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      Object.entries(next).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      return newParams;
    });

  }, [setParams]);

  return {
    filters,
    setFilters,
  }

}