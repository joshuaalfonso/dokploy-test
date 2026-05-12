import { useSearchParams } from 'react-router-dom'
import type { ProjectParams } from '../project.model'
import { useCallback } from 'react'

export type SortOrder = 'asc' | 'desc'


export function useProjectParams() {

  const [params, setParams] = useSearchParams();

  const filters: ProjectParams = {
    search: params.get('search') || undefined,
    status: params.get('status') || undefined,
    sort: (params.get('sort') as SortOrder) || 'desc',
    limit: params.get('limit')
      ? Number(params.get('limit'))
      : 10,
    page: params.get('page')
      ? Number(params.get('page'))
      : 1,
  }

  const setFilters = useCallback((next: Partial<ProjectParams>) => {
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