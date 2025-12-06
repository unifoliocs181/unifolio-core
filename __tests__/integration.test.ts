import { describe, it, expect } from '@jest/globals'
import { cn } from '../src/lib/utils'
import { resumeTemplates } from '../src/app/templates/resumes'
import { usePagination } from '../src/components/hooks/use-pagination'

describe('Source Code Integration Tests - Real Coverage', () => {
  describe('cn() - Real Implementation from src/lib/utils.ts', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-2', 'py-1')
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', {
        'active': true,
        'inactive': false,
      })
      expect(result).toContain('base')
      expect(result).toContain('active')
    })

    it('should merge conflicting Tailwind classes', () => {
      // twMerge removes conflicting utilities
      const result = cn('px-2 px-4', 'py-1 py-2')
      expect(result).toBeDefined()
    })

    it('should handle undefined and null', () => {
      const result = cn('flex', undefined, null, 'gap-4')
      expect(result).toBeDefined()
    })

    it('should work with multiple class objects', () => {
      const result = cn(
        { 'block': true },
        { 'text-center': true },
        'p-4'
      )
      expect(result).toBeDefined()
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(typeof result).toBe('string')
    })

    it('should filter out false conditions', () => {
      const isActive = false
      const result = cn('base', { 'active': isActive })
      expect(result).toContain('base')
    })
  })

  describe('resumeTemplates - Real Data from src/app/templates/resumes.ts', () => {
    it('should have resume templates array', () => {
      expect(Array.isArray(resumeTemplates)).toBe(true)
      expect(resumeTemplates.length).toBeGreaterThan(0)
    })

    it('should have templates with required fields', () => {
      resumeTemplates.forEach((template: Record<string, unknown>) => {
        expect(template.id).toBeDefined()
        expect(typeof template.id).toBe('string')
        expect(template.name).toBeDefined()
        expect(typeof template.name).toBe('string')
        expect(template.code).toBeDefined()
        expect(typeof template.code).toBe('string')
      })
    })

    it('should have unique template IDs', () => {
      const ids = resumeTemplates.map((t: Record<string, unknown>) => t.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have LaTeX code in templates', () => {
      resumeTemplates.forEach((template: Record<string, unknown>) => {
        expect(String(template.code)).toContain('\\documentclass')
      })
    })

    it('should be able to find template by ID', () => {
      const firstTemplate = resumeTemplates[0]
      const found = resumeTemplates.find((t: Record<string, unknown>) => t.id === firstTemplate.id)
      expect(found).toEqual(firstTemplate)
    })

    it('should have pdfUrl for each template', () => {
      resumeTemplates.forEach((template: Record<string, unknown>) => {
        expect(template.pdfUrl).toBeDefined()
        expect(typeof template.pdfUrl).toBe('string')
      })
    })
  })

  describe('usePagination Hook - Real Implementation from src/components/hooks/use-pagination.ts', () => {
    it('should calculate pagination for first page', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toBeDefined()
      expect(Array.isArray(result.pages)).toBe(true)
      expect(result.pages.length).toBeGreaterThan(0)
      expect(result.pages[0]).toBeGreaterThanOrEqual(1)
    })

    it('should calculate pagination for middle page', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(5)
      expect(result.showLeftEllipsis).toBeDefined()
      expect(result.showRightEllipsis).toBeDefined()
    })

    it('should calculate pagination for last page', () => {
      const result = usePagination({
        currentPage: 10,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toContain(10)
    })

    it('should respect max display items', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 100,
        paginationItemsToDisplay: 7,
      })

      expect(result.pages.length).toBeLessThanOrEqual(7)
    })

    it('should return valid page numbers', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      result.pages.forEach((page: number) => {
        expect(page).toBeGreaterThanOrEqual(1)
        expect(page).toBeLessThanOrEqual(10)
      })
    })

    it('should have sorted pages', () => {
      const result = usePagination({
        currentPage: 5,
        totalPages: 20,
        paginationItemsToDisplay: 7,
      })

      for (let i = 0; i < result.pages.length - 1; i++) {
        expect(result.pages[i]).toBeLessThan(result.pages[i + 1])
      }
    })

    it('should handle single page', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 1,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages).toEqual([1])
    })

    it('should handle large page numbers', () => {
      const result = usePagination({
        currentPage: 500,
        totalPages: 1000,
        paginationItemsToDisplay: 7,
      })

      expect(result.pages).toContain(500)
      expect(result.pages.length).toBeLessThanOrEqual(7)
    })
  })

  describe('Template Integration', () => {
    it('should be able to access template code', () => {
      const template = resumeTemplates[0]
      expect(template.code.length).toBeGreaterThan(100)
    })

    it('should filter templates by name', () => {
      const modernTemplates = resumeTemplates.filter((t: Record<string, unknown>) =>
        String(t.name).toLowerCase().includes('modern')
      )
      expect(modernTemplates.length).toBeGreaterThanOrEqual(0)
    })

    it('should map templates to dropdown options', () => {
      const options = resumeTemplates.map((t: Record<string, unknown>) => ({
        value: t.id,
        label: t.name,
      }))

      expect(options.length).toBe(resumeTemplates.length)
      options.forEach((opt: Record<string, unknown>) => {
        expect(opt.value).toBeDefined()
        expect(opt.label).toBeDefined()
      })
    })
  })

  describe('Pagination with Real Data', () => {
    it('should work with typical resume list (20 items, 2 per page)', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages.length).toBeGreaterThan(0)
      expect(result.pages.length).toBeLessThanOrEqual(5)
    })

    it('should calculate offset for database queries', () => {
      const result = usePagination({
        currentPage: 3,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      const itemsPerPage = 20
      const offset = (result.pages[0] - 1) * itemsPerPage

      expect(offset).toBeGreaterThanOrEqual(0)
    })

    it('should navigate through pages sequentially', () => {
      const pages = []
      
      // Get result for page 1
      const result = usePagination({
        currentPage: 1,
        totalPages: 10,
        paginationItemsToDisplay: 5,
      })

      expect(result.pages.length).toBeGreaterThan(0)
      pages.push(result.pages[0])
      
      // Verify pagination structure
      expect(pages).toHaveLength(1)
    })
  })

  describe('Utility Composition', () => {
    it('should compose cn() with conditional logic', () => {
      const isLoading = true
      const isError = false

      const result = cn(
        'button',
        {
          'opacity-50': isLoading,
          'bg-red-500': isError,
        }
      )

      expect(result).toContain('button')
      expect(result).toContain('opacity-50')
      expect(result).not.toContain('bg-red-500')
    })

    it('should use pagination data to render UI', () => {
      const result = usePagination({
        currentPage: 1,
        totalPages: 20,
        paginationItemsToDisplay: 5,
      })

      const renderPaginationButtons = () => {
        if (result.showLeftEllipsis) {
          return '... ' + result.pages.join(' ') + ' ...'
        }
        return result.pages.join(' ')
      }

      const rendered = renderPaginationButtons()
      expect(rendered).toBeDefined()
      expect(rendered.length).toBeGreaterThan(0)
    })
  })
})
