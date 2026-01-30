'use client'

import React from "react"

import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useState, useTransition } from 'react'

const seasons = [
  { value: 'Spring', label: 'Хавар' },
  { value: 'Summer', label: 'Зун' },
  { value: 'Autumn', label: 'Намар' },
  { value: 'Winter', label: 'Өвөл' },
]

const styles = [
  { value: 'Adventure', label: 'Адал явдал' },
  { value: 'Culture', label: 'Соёл' },
  { value: 'Nature', label: 'Байгаль' },
  { value: 'Luxury', label: 'Тансаг' },
]

export function ToursFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const currentSeason = searchParams.get('season')
  const currentStyle = searchParams.get('style')

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`/tours?${params.toString()}`)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters('search', search || null)
  }

  const clearFilters = () => {
    setSearch('')
    startTransition(() => {
      router.push('/tours')
    })
  }

  const hasFilters = currentSeason || currentStyle || searchParams.get('search')

  return (
    <div className="mb-8 space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Аялал хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </form>

        {/* Season Filter */}
        <Select
          value={currentSeason || ''}
          onValueChange={(value) => updateFilters('season', value || null)}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-11">
            <SelectValue placeholder="Улирал" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх улирал</SelectItem>
            {seasons.map((season) => (
              <SelectItem key={season.value} value={season.value}>
                {season.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Style Filter */}
        <Select
          value={currentStyle || ''}
          onValueChange={(value) => updateFilters('style', value || null)}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-11">
            <SelectValue placeholder="Төрөл" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бүх төрөл</SelectItem>
            {styles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Идэвхтэй шүүлтүүр:
          </span>
          
          {searchParams.get('search') && (
            <Badge variant="secondary" className="gap-1">
              Хайлт: {searchParams.get('search')}
              <button 
                type="button"
                onClick={() => {
                  setSearch('')
                  updateFilters('search', null)
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {currentSeason && (
            <Badge variant="secondary" className="gap-1">
              {seasons.find(s => s.value === currentSeason)?.label}
              <button 
                type="button"
                onClick={() => updateFilters('season', null)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {currentStyle && (
            <Badge variant="secondary" className="gap-1">
              {styles.find(s => s.value === currentStyle)?.label}
              <button 
                type="button"
                onClick={() => updateFilters('style', null)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Бүгдийг арилгах
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Хайж байна...
        </div>
      )}
    </div>
  )
}
