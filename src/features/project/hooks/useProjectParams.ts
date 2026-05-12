import { useSearchParams } from 'react-router-dom'
import type { AllowedSort, ProjectParams } from '../project.model'
import { useCallback } from 'react'

export type SortOrder = 'asc' | 'desc'


export function useProjectParams() {

  const [params, setParams] = useSearchParams();

  const filters: ProjectParams = {
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