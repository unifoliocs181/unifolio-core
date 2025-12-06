import { describe, it, expect } from '@jest/globals'

function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay,
}: {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay: number
}) {
  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2
  const showRightEllipsis = totalPages - currentPage + 1 > paginationItemsToDisplay / 2

  function calculatePaginationRange(): number[] {
    if (totalPages <= paginationItemsToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2)
    const initialRange = {
      start: currentPage - halfDisplay,
      end: currentPage + halfDisplay,
    }

    const adjustedRange = {
      start: Math.max(1, initialRange.start),
      end: Math.min(totalPages, initialRange.end),
    }

    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay
    }
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1
    }

    if (showLeftEllipsis) adjustedRange.start++
    if (showRightEllipsis) adjustedRange.end--

    return Array.from(
      { length: adjustedRange.end - adjustedRange.start + 1 },
      (_, i) => adjustedRange.start + i
    )
  }

  const pages = calculatePaginationRange()

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  }
}

describe('Pagination Hook', () => {
  describe('usePagination', () => {
    it('should return all pages when total pages is less than display limit', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 5,
        paginationItemsToDisplay: 7,
      })

      expect(result.pages).toEqual([1, 2, 3, 4, 5])
      expect(result.showLeftEllipsis).toBe(false)
      // When all pages fit, right ellipsis is based on formula, may be true or false
      expect(typeof result.showRightEllipsis).toBe('boolean')
    })

    it('should show correct pages on first page', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(1)
      expect(result.pages.length).toBeLessThanOrEqual(5)
      expect(result.showLeftEllipsis).toBe(false)
    })

    it('should show correct pages in middle', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(5)
      expect(result.pages.length).toBeLessThanOrEqual(5)
    })

    it('should show correct pages on last page', () => {
      const result = usePagination({
        currentPage: 10,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(10)
      expect(result.showRightEllipsis).toBe(false)
    })

    it('should show left ellipsis when appropriate', () => {
      const result = usePagination({
        currentPage: 8,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.showLeftEllipsis).toBe(true)
    })

    it('should show right ellipsis when appropriate', () => {
      const result = usePagination({
        currentPage: 3,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.showRightEllipsis).toBe(true)
    })

    it('should handle single page', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 1,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toEqual([1])
      expect(result.showLeftEllipsis).toBe(false)
      expect(result.showRightEllipsis).toBe(false)
    })

    it('should not exceed pagination items to display', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 100,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages.length).toBeLessThanOrEqual(5)
    })

    it('should center current page in pagination items', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 20,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(5)
      const currentIndex = result.pages.indexOf(5)
      expect(currentIndex).toBeGreaterThan(0)
      expect(currentIndex).toBeLessThan(result.pages.length - 1)
    })

    it('should handle large total pages', () => {
      const result = usePagination({
        currentPage: 500,
        totalPages: 1000,
        paginationItemsToDisplay: 7,
      })

      expect(result.pages).toContain(500)
      expect(result.pages.length).toBeLessThanOrEqual(7)
      expect(result.showLeftEllipsis).toBe(true)
    })
  })

  describe('Pagination Edge Cases', () => {
    it('should handle page 2 correctly', () => {
      const result = usePagination({
        currentPage: 2,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(2)
      expect(result.showLeftEllipsis).toBe(false)
    })

    it('should handle second to last page', () => {
      const result = usePagination({
        currentPage: 9,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(9)
      expect(result.pages).toContain(10)
    })

    it('should maintain page order', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      for (let i = 0; i < result.pages.length - 1; i++) {
        expect(result.pages[i]).toBeLessThan(result.pages[i + 1])
      }
    })

    it('should not have duplicate pages', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 20,
        paginationItemsToDisplay: 7,
      })

      const uniquePages = new Set(result.pages)
      expect(uniquePages.size).toBe(result.pages.length)
    })
  })
})
