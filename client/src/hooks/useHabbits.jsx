import { useMemo } from "react"

export const useSortedHabbits = (habbits, sort) => {
  const sortedHabbits = useMemo(() => {
    if (sort === 'progress') {
      return [...habbits].sort((a, b) => b.progress - a.progress)
    } else if (sort === 'type' || 'dateAd') {
      return [...habbits].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
  }, [sort, habbits])

  return sortedHabbits
}

export const useHabbits = (habbits, sort, query) => {
  const sortedHabbits = useSortedHabbits(habbits, sort)

  const sortedAndSearchedHabbits = useMemo(() => {
    return sortedHabbits.filter(habbit => habbit.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedHabbits])

  return sortedAndSearchedHabbits
}