'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Filter, 
  Clock, 
  Tag,
  Download,
  Share2,
  Plus,
  Star,
  Bookmark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface OnePager {
  id: string
  title: string
  description: string
  tags: string[]
  lastModified: string
  category: string
  isFavorite: boolean
  isBookmarked: boolean
  thumbnail?: string
}

export default function OnePagersView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Example data
  const onePagers: OnePager[] = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      description: 'Key concepts and algorithms in machine learning, including supervised and unsupervised learning.',
      tags: ['ML', 'AI', 'Basics'],
      lastModified: '2 hours ago',
      category: 'Machine Learning',
      isFavorite: true,
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Neural Networks Architecture',
      description: 'Complete guide to neural network layers, activation functions, and topologies.',
      tags: ['Deep Learning', 'Neural Networks'],
      lastModified: '1 day ago',
      category: 'Deep Learning',
      isFavorite: false,
      isBookmarked: true
    },
    // Add more items as needed
  ]

  const categories = ['All', 'Machine Learning', 'Deep Learning', 'Data Science', 'Programming']

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Quick References
              </h1>
              <p className="text-gray-500 mt-2">
                Access your one-pagers and cheatsheets
              </p>
            </div>
            
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search references..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory || 'All Categories'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onePagers.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {}}
                      >
                        <Bookmark 
                          className={`h-4 w-4 ${item.isBookmarked ? 'fill-current' : ''}`}
                        />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {}}
                      >
                        <Star 
                          className={`h-4 w-4 ${item.isFavorite ? 'fill-current text-yellow-400' : ''}`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.lastModified}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}