import { describe, it, expect } from '@jest/globals'

function cn(...inputs: unknown[]): string {
  const clsx = (value: unknown): string => {
    if (typeof value === 'string') {
      return value
    }
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map(clsx).filter(Boolean).join(' ')
      }
      return Object.entries(value)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(' ')
    }
    return ''
  }

  const twMerge = (value: string): string => value

  return twMerge(clsx(inputs))
}

describe('Utility Functions', () => {
  describe('cn() - Class Name Utility', () => {
    it('should merge simple string classes', () => {
      const result = cn('px-2', 'py-1')
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
    })

    it('should handle conditional classes in objects', () => {
      const result = cn({
        'font-bold': true,
        'text-red': false,
      })
      expect(result).toContain('font-bold')
      expect(result).not.toContain('text-red')
    })

    it('should merge array of classes', () => {
      const result = cn(['flex', 'gap-4'])
      expect(result).toContain('flex')
      expect(result).toContain('gap-4')
    })

    it('should handle mixed inputs', () => {
      const result = cn('mb-4', { 'text-center': true }, ['py-2'])
      expect(result).toContain('mb-4')
      expect(result).toContain('text-center')
      expect(result).toContain('py-2')
    })

    it('should filter out falsy values', () => {
      const result = cn('p-2', null, undefined, false, '')
      expect(result).toContain('p-2')
      expect(result.split(' ').length).toBeLessThanOrEqual(2)
    })

    it('should handle empty inputs', () => {
      const result = cn()
      expect(result).toBeDefined()
    })

    it('should handle nested objects', () => {
      const result = cn({
        'block': true,
        'hidden': false,
      })
      expect(result).toContain('block')
    })

    it('should handle undefined conditional values', () => {
      const condition = undefined
      const result = cn({ 'active': !!condition })
      expect(result).not.toContain('active')
    })

    it('should combine multiple class objects', () => {
      const result = cn(
        { 'text-sm': true, 'text-lg': false },
        { 'font-bold': true }
      )
      expect(result).toContain('text-sm')
      expect(result).toContain('font-bold')
      expect(result).not.toContain('text-lg')
    })

    it('should handle single class string', () => {
      const result = cn('flex')
      expect(result).toBe('flex')
    })
  })

  describe('String Validation Utilities', () => {
    it('should validate email format', () => {
      const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      }

      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
    })

    it('should validate password strength', () => {
      const validatePassword = (password: string): boolean => {
        return password.length >= 8 && /[A-Z]/.test(password)
      }

      expect(validatePassword('StrongPass123')).toBe(true)
      expect(validatePassword('weak')).toBe(false)
      expect(validatePassword('nouppercasehere')).toBe(false)
    })

    it('should trim and normalize strings', () => {
      const normalizeString = (str: string): string => {
        return str.trim().toLowerCase().replace(/\s+/g, ' ')
      }

      expect(normalizeString('  Hello   World  ')).toBe('hello world')
      expect(normalizeString('TEST')).toBe('test')
    })

    it('should truncate long strings', () => {
      const truncate = (str: string, length: number): string => {
        return str.length > length ? str.substring(0, length) + '...' : str
      }

      expect(truncate('This is a long string', 10)).toBe('This is a ...')
      expect(truncate('Short', 20)).toBe('Short')
    })
  })

  describe('Array Utilities', () => {
    it('should chunk array into groups', () => {
      const chunk = <T,>(arr: T[], size: number): T[][] => {
        const result: T[][] = []
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size))
        }
        return result
      }

      const result = chunk([1, 2, 3, 4, 5], 2)
      expect(result).toEqual([[1, 2], [3, 4], [5]])
    })

    it('should flatten nested arrays', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const flatten = (arr: any[]): any[] => {
        return arr.reduce((acc, val) => {
          return Array.isArray(val) ? [...acc, ...flatten(val)] : [...acc, val]
        }, [])
      }

      const result = flatten([1, [2, [3, 4]], 5])
      expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it('should remove duplicates from array', () => {
      const unique = <T,>(arr: T[]): T[] => {
        return Array.from(new Set(arr))
      }

      const result = unique([1, 2, 2, 3, 3, 3, 4])
      expect(result).toEqual([1, 2, 3, 4])
    })

    it('should find difference between arrays', () => {
      const difference = <T,>(arr1: T[], arr2: T[]): T[] => {
        return arr1.filter((item) => !arr2.includes(item))
      }

      const result = difference([1, 2, 3, 4], [2, 4])
      expect(result).toEqual([1, 3])
    })
  })

  describe('Object Utilities', () => {
    it('should merge objects deeply', () => {
      const mergeDeep = (
        obj1: Record<string, unknown>,
        obj2: Record<string, unknown>
      ): Record<string, unknown> => {
        const result = { ...obj1 }
        for (const key in obj2) {
          if (
            typeof obj2[key] === 'object' &&
            obj2[key] !== null &&
            !Array.isArray(obj2[key])
          ) {
            result[key] = mergeDeep(
              obj1[key] as Record<string, unknown>,
              obj2[key] as Record<string, unknown>
            )
          } else {
            result[key] = obj2[key]
          }
        }
        return result
      }

      const obj1 = { a: 1, b: { c: 2 } }
      const obj2 = { b: { d: 3 } }
      const result = mergeDeep(obj1, obj2)

      expect(result.a).toBe(1)
      expect((result.b as Record<string, number>).c).toBe(2)
      expect((result.b as Record<string, number>).d).toBe(3)
    })

    it('should pick specific keys from object', () => {
      const pick = <T extends Record<string, unknown>>(
        obj: T,
        keys: (keyof T)[]
      ): Partial<T> => {
        const result: Partial<T> = {}
        keys.forEach((key) => {
          result[key] = obj[key]
        })
        return result
      }

      const obj = { a: 1, b: 2, c: 3 }
      const result = pick(obj, ['a', 'c'])

      expect(result).toEqual({ a: 1, c: 3 })
      expect((result as Record<string, number>).b).toBeUndefined()
    })

    it('should omit specific keys from object', () => {
      const omit = <T extends Record<string, unknown>>(
        obj: T,
        keys: (keyof T)[]
      ): Partial<T> => {
        const result: Partial<T> = {}
        for (const key in obj) {
          if (!keys.includes(key as keyof T)) {
            result[key as keyof T] = obj[key]
          }
        }
        return result
      }

      const obj = { a: 1, b: 2, c: 3 }
      const result = omit(obj, ['b'])

      expect(result).toEqual({ a: 1, c: 3 })
      expect((result as Record<string, number>).b).toBeUndefined()
    })

    it('should check if object is empty', () => {
      const isEmpty = (obj: Record<string, unknown>): boolean => {
        return Object.keys(obj).length === 0
      }

      expect(isEmpty({})).toBe(true)
      expect(isEmpty({ a: 1 })).toBe(false)
    })
  })

  describe('Numeric Utilities', () => {
    it('should clamp number within range', () => {
      const clamp = (value: number, min: number, max: number): number => {
        return Math.max(min, Math.min(max, value))
      }

      expect(clamp(5, 1, 10)).toBe(5)
      expect(clamp(15, 1, 10)).toBe(10)
      expect(clamp(-5, 1, 10)).toBe(1)
    })

    it('should round to specific decimal places', () => {
      const round = (num: number, decimals: number): number => {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
      }

      expect(round(3.14159, 2)).toBe(3.14)
      expect(round(10.5555, 2)).toBe(10.56)
    })

    it('should check if number is even or odd', () => {
      const isEven = (num: number): boolean => num % 2 === 0

      expect(isEven(2)).toBe(true)
      expect(isEven(3)).toBe(false)
    })
  })
})
