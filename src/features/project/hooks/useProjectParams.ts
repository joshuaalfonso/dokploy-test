import { useSearchParams } from "react-router-dom"
// import type { ProjectStatus } from "../project.model"



export function useProjectParams() {

  const [params, setParams] = useSearchParams()

  const search = params.get('search') || ''
  const status = params.get('status') || ''
  const sort = (params.get('sort') as 'asc' | 'desc') || 'desc'

  const setFilters = (next: {
    cursor: string | null
    search?: string
    status?: string
  }) => {
    const newParams = new URLSearchParams(params)

    Object.entries(next).forEach(([key, value]) => {
      if (!value) newParams.delete(key)
      else newParams.set(key, value)
    })

    setParams(newParams)
  }

  return {
    filters: { search, status, sort },
    setFilters,
  }

}