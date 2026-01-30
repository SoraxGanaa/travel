// Mock database layer structured as if using PostgreSQL + Prisma
// In production, replace with actual Prisma client

export interface Tour {
  id: string
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  durationDays: number
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter'
  style: ('Adventure' | 'Culture' | 'Nature' | 'Luxury')[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  groupSize: string
  priceFrom: number
  highlights: string[]
  itineraryDays: { dayTitle: string; dayDescription: string }[]
  included: string[]
  notIncluded: string[]
  coverImage: string
  galleryImages: string[]
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
  views: number
}

export interface Lead {
  id: string
  source: 'tour' | 'custom'
  tourId?: string
  tourName?: string
  userEmail: string
  name?: string
  phone?: string
  message?: string
  // Custom trip fields
  dates?: string
  travelersCount?: number
  interests?: string[]
  budgetRange?: string
  status: 'new' | 'contacted' | 'closed'
  submittedAt: Date
}

// Mock data storage (in-memory)
const tours: Map<string, Tour> = new Map()
const leads: Map<string, Lead> = new Map()

// Sample tours data
const sampleTours: Tour[] = [
  {
    id: '1',
    title: 'Говийн нууц аялал',
    slug: 'gobi-desert-expedition',
    shortDescription: 'Говийн цөлийн гайхамшигт байгаль, тэмээн сүрэг, түүхэн дурсгалуудыг судлах аялал.',
    fullDescription: 'Монгол орны хамгийн алдартай Говийн цөлөөр аялж, Хонгорын элс, Баянзаг, Ёлын ам зэрэг үзэсгэлэнт газруудыг үзэж, нүүдэлчдийн амьдралтай танилцана.',
    durationDays: 8,
    season: 'Summer',
    style: ['Adventure', 'Nature'],
    difficulty: 'Medium',
    groupSize: '2-12',
    priceFrom: 1890,
    highlights: ['Хонгорын элс', 'Баянзаг - Шатсан хад', 'Ёлын ам', 'Тэмээн аялал', 'Нүүдэлчдийн гэрт хонох'],
    itineraryDays: [
      { dayTitle: '1-р өдөр: Улаанбаатар - Баянзаг', dayDescription: 'Өглөө Улаанбаатараас хөдөлж, Баянзаг руу явна. Замдаа хөдөөний үзэсгэлэнт газруудыг үзнэ.' },
      { dayTitle: '2-р өдөр: Баянзаг судлах', dayDescription: 'Динозаврын ясны нээлт болсон алдартай Баянзагийг судална.' },
      { dayTitle: '3-р өдөр: Хонгорын элс', dayDescription: 'Монголын хамгийн том элсэн манхан Хонгорын элсэнд очиж, тэмээгээр аялна.' },
      { dayTitle: '4-р өдөр: Элсэн манхан', dayDescription: 'Элсэн манханд авирч, нар жаргах үзэгдлийг сонирхоно.' },
      { dayTitle: '5-р өдөр: Ёлын ам', dayDescription: 'Зуны дундуур ч мөс хайлдаггүй Ёлын амыг үзнэ.' },
      { dayTitle: '6-р өдөр: Цагаан суварга', dayDescription: 'Далайн ёроолын хурдас чулуулгаас бүрдсэн Цагаан сувраг үзнэ.' },
      { dayTitle: '7-р өдөр: Буцах зам', dayDescription: 'Улаанбаатар руу буцах замдаа нүүдэлчдийн гэрт зочилно.' },
      { dayTitle: '8-р өдөр: Улаанбаатар', dayDescription: 'Аялал дуусна. Нисэх онгоцны буудалд хүргэнэ.' }
    ],
    included: ['Унааны үйлчилгээ', 'Хоол хүнс', 'Байр', 'Хөтөч', 'Музейн тасалбар', 'Тэмээн аялал'],
    notIncluded: ['Олон улсын нислэг', 'Виз', 'Аялалын даатгал', 'Хувийн зардал', 'Архины зардал'],
    coverImage: 'https://images.unsplash.com/photo-1569330667576-d3a1c08e1dc0?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1569330667576-d3a1c08e1dc0?w=800',
      'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=800',
      'https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=800'
    ],
    status: 'published',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    views: 245
  },
  {
    id: '2',
    title: 'Хөвсгөл нуурын аялал',
    slug: 'khuvsgul-lake-adventure',
    shortDescription: 'Монголын "Далайн ээж" хэмээн алдаршсан Хөвсгөл нуурын эргээр аялах.',
    fullDescription: 'Дэлхийн цэнгэг усны нөөцийн 2%-ийг агуулсан Хөвсгөл нуурын эргээр морь унаж, цаатан ардын соёлтой танилцана.',
    durationDays: 6,
    season: 'Summer',
    style: ['Nature', 'Culture'],
    difficulty: 'Easy',
    groupSize: '2-8',
    priceFrom: 1590,
    highlights: ['Хөвсгөл нуур', 'Морин аялал', 'Цаатан айл', 'Загас барих', 'Тайга ой'],
    itineraryDays: [
      { dayTitle: '1-р өдөр: Улаанбаатар - Мөрөн', dayDescription: 'Дотоодын нислэгээр Мөрөн хот руу нисч, Хөвсгөл нуур руу явна.' },
      { dayTitle: '2-р өдөр: Нуурын эрэг', dayDescription: 'Нуурын эргээр алхаж, орон нутгийн соёлтой танилцана.' },
      { dayTitle: '3-р өдөр: Морин аялал', dayDescription: 'Монгол морьтой тайга ой руу аялна.' },
      { dayTitle: '4-р өдөр: Цаатан айл', dayDescription: 'Цаа буга маллдаг цаатан ардын амьдралтай танилцана.' },
      { dayTitle: '5-р өдөр: Чөлөөт өдөр', dayDescription: 'Загас барих эсвэл завиар аялах сонголттой.' },
      { dayTitle: '6-р өдөр: Буцах', dayDescription: 'Мөрөн хотоос Улаанбаатар руу нисэж буцна.' }
    ],
    included: ['Дотоодын нислэг', 'Унааны үйлчилгээ', 'Хоол хүнс', 'Байр', 'Хөтөч', 'Морин аялал'],
    notIncluded: ['Олон улсын нислэг', 'Виз', 'Аялалын даатгал', 'Хувийн зардал'],
    coverImage: 'https://images.unsplash.com/photo-1602858789614-72e3a4698e48?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1602858789614-72e3a4698e48?w=800',
      'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=800'
    ],
    status: 'published',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-15'),
    views: 189
  },
  {
    id: '3',
    title: 'Тэрэлж, Хустайн аялал',
    slug: 'terelj-hustai-tour',
    shortDescription: 'Улаанбаатарт ойрхон байрлах Тэрэлж, Хустайн байгалийн цогцолборуудаар аялах.',
    fullDescription: 'Тэрэлжийн үзэсгэлэнт хадан хөшөө, Хустайн тахь үзэж, нүүдэлчдийн гэрт хонох богино хугацааны аялал.',
    durationDays: 3,
    season: 'Spring',
    style: ['Nature', 'Culture'],
    difficulty: 'Easy',
    groupSize: '2-15',
    priceFrom: 590,
    highlights: ['Тэрэлж', 'Яст мэлхий хад', 'Хустайн тахь', 'Гэрт хонох', 'Морин аялал'],
    itineraryDays: [
      { dayTitle: '1-р өдөр: Тэрэлж', dayDescription: 'Тэрэлжийн байгалийн цогцолборт очиж, Яст мэлхий хадыг үзнэ.' },
      { dayTitle: '2-р өдөр: Хустай', dayDescription: 'Хустайн нуруунд очиж, зэрлэг тахь үзнэ.' },
      { dayTitle: '3-р өдөр: Буцах', dayDescription: 'Улаанбаатар руу буцна.' }
    ],
    included: ['Унааны үйлчилгээ', 'Хоол хүнс', 'Байр', 'Хөтөч', 'Цогцолборын тасалбар'],
    notIncluded: ['Олон улсын нислэг', 'Виз', 'Аялалын даатгал', 'Хувийн зардал'],
    coverImage: 'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=800'
    ],
    status: 'published',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05'),
    views: 312
  },
  {
    id: '4',
    title: 'Орхоны хөндийн соёлын аялал',
    slug: 'orkhon-valley-cultural',
    shortDescription: 'ЮНЕСКО-гийн дэлхийн өвд бүртгэгдсэн Орхоны хөндийгөөр аялах.',
    fullDescription: 'Эртний Монголын нийслэл Хархорум, Эрдэнэ зуу хийд, Орхоны хүрхрээ зэрэг түүхэн дурсгалуудыг үзнэ.',
    durationDays: 5,
    season: 'Autumn',
    style: ['Culture', 'Nature'],
    difficulty: 'Easy',
    groupSize: '2-10',
    priceFrom: 1290,
    highlights: ['Эрдэнэ зуу хийд', 'Хархорум музей', 'Орхоны хүрхрээ', 'Нүүдэлчдийн гэр', 'Морин аялал'],
    itineraryDays: [
      { dayTitle: '1-р өдөр: Улаанбаатар - Хархорум', dayDescription: 'Хархорум руу явж, Эрдэнэ зуу хийдийг үзнэ.' },
      { dayTitle: '2-р өдөр: Хархорум музей', dayDescription: 'Хархорумын түүхийн музей үзнэ.' },
      { dayTitle: '3-р өдөр: Орхоны хүрхрээ', dayDescription: 'Орхоны хүрхрээ рүү морьтой аялна.' },
      { dayTitle: '4-р өдөр: Нүүдэлчдийн амьдрал', dayDescription: 'Нүүдэлчдийн гэрт хонож, тэдний амьдралтай танилцана.' },
      { dayTitle: '5-р өдөр: Буцах', dayDescription: 'Улаанбаатар руу буцна.' }
    ],
    included: ['Унааны үйлчилгээ', 'Хоол хүнс', 'Байр', 'Хөтөч', 'Музейн тасалбар', 'Морин аялал'],
    notIncluded: ['Олон улсын нислэг', 'Виз', 'Аялалын даатгал', 'Хувийн зардал'],
    coverImage: 'https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=800',
      'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=800'
    ],
    status: 'published',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-25'),
    views: 156
  },
  {
    id: '5',
    title: 'Алтайн тансаг аялал',
    slug: 'altai-luxury-expedition',
    shortDescription: 'Монголын баруун хязгаарт орших Алтайн нурууны үзэсгэлэнт байгалиар аялах тансаг зэрэглэлийн аялал.',
    fullDescription: 'Алтайн цасат оргил, казах бүргэдчин, эртний хадны зураг зэргийг үзэж, тансаг гэр буудалд хоноход.',
    durationDays: 10,
    season: 'Summer',
    style: ['Luxury', 'Adventure', 'Culture'],
    difficulty: 'Hard',
    groupSize: '2-6',
    priceFrom: 3890,
    highlights: ['Алтай таван богд', 'Казах бүргэдчин', 'Хадны зураг', 'Тансаг гэр буудал', 'Морин аялал'],
    itineraryDays: [
      { dayTitle: '1-р өдөр: Улаанбаатар - Өлгий', dayDescription: 'Өлгий хот руу нисч, тансаг буудалд хононо.' },
      { dayTitle: '2-р өдөр: Казах бүргэдчин', dayDescription: 'Казах бүргэдчинтэй уулзаж, бүргэдээр ан агнах үзүүлбэр үзнэ.' },
      { dayTitle: '3-р өдөр: Алтайн нуруу', dayDescription: 'Алтайн нуруу руу аялж, үзэсгэлэнт байгалийг сонирхоно.' },
      { dayTitle: '4-р өдөр: Цасат оргил', dayDescription: 'Алтай таван богдын ойролцоо очиж, мөсөн гол үзнэ.' },
      { dayTitle: '5-р өдөр: Хадны зураг', dayDescription: 'Эртний хүн амьдарч байсан газрын хадны зураг үзнэ.' },
      { dayTitle: '6-7-р өдөр: Морин аялал', dayDescription: '2 өдрийн морин аялал хийнэ.' },
      { dayTitle: '8-р өдөр: Казах соёл', dayDescription: 'Казах ардын соёл, хоол хүнстэй танилцана.' },
      { dayTitle: '9-р өдөр: Чөлөөт өдөр', dayDescription: 'Сонирхлоороо амрах эсвэл нэмэлт аялал хийх.' },
      { dayTitle: '10-р өдөр: Буцах', dayDescription: 'Өлгийгөөс Улаанбаатар руу нисч буцна.' }
    ],
    included: ['Дотоодын нислэг', 'Тансаг байр', 'Хоол хүнс', 'Хөтөч', 'Бүх аялал', 'Морин аялал'],
    notIncluded: ['Олон улсын нислэг', 'Виз', 'Аялалын даатгал', 'Хувийн зардал', 'Дарс, архи'],
    coverImage: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800',
      'https://images.unsplash.com/photo-1596395463831-2f53e797d361?w=800',
      'https://images.unsplash.com/photo-1587502537147-2ba64a62e4e6?w=800'
    ],
    status: 'published',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-10'),
    views: 98
  }
]

// Initialize with sample data
sampleTours.forEach(tour => tours.set(tour.id, tour))

// Tour CRUD operations
export async function getTours(filters?: {
  status?: 'draft' | 'published'
  season?: string
  style?: string
  search?: string
}): Promise<Tour[]> {
  let result = Array.from(tours.values())
  
  if (filters?.status) {
    result = result.filter(t => t.status === filters.status)
  }
  if (filters?.season) {
    result = result.filter(t => t.season === filters.season)
  }
  if (filters?.style) {
    result = result.filter(t => t.style.includes(filters.style as Tour['style'][number]))
  }
  if (filters?.search) {
    const search = filters.search.toLowerCase()
    result = result.filter(t => 
      t.title.toLowerCase().includes(search) || 
      t.shortDescription.toLowerCase().includes(search)
    )
  }
  
  return result.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  return Array.from(tours.values()).find(t => t.slug === slug) || null
}

export async function getTourById(id: string): Promise<Tour | null> {
  return tours.get(id) || null
}

export async function createTour(data: Omit<Tour, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<Tour> {
  const id = Math.random().toString(36).substring(2, 9)
  const tour: Tour = {
    ...data,
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0
  }
  tours.set(id, tour)
  return tour
}

export async function updateTour(id: string, data: Partial<Tour>): Promise<Tour | null> {
  const tour = tours.get(id)
  if (!tour) return null
  
  const updated = { ...tour, ...data, updatedAt: new Date() }
  tours.set(id, updated)
  return updated
}

export async function deleteTour(id: string): Promise<boolean> {
  return tours.delete(id)
}

export async function getToursCount(): Promise<number> {
  return tours.size
}

export async function getMostViewedTour(): Promise<Tour | null> {
  const allTours = Array.from(tours.values())
  if (allTours.length === 0) return null
  return allTours.reduce((max, t) => t.views > max.views ? t : max, allTours[0])
}

// Lead operations
export async function getLeads(filters?: {
  status?: Lead['status']
  source?: Lead['source']
}): Promise<Lead[]> {
  let result = Array.from(leads.values())
  
  if (filters?.status) {
    result = result.filter(l => l.status === filters.status)
  }
  if (filters?.source) {
    result = result.filter(l => l.source === filters.source)
  }
  
  return result.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
}

export async function getLeadById(id: string): Promise<Lead | null> {
  return leads.get(id) || null
}

export async function createLead(data: Omit<Lead, 'id' | 'submittedAt' | 'status'>): Promise<Lead> {
  const id = Math.random().toString(36).substring(2, 9)
  const lead: Lead = {
    ...data,
    id,
    status: 'new',
    submittedAt: new Date()
  }
  leads.set(id, lead)
  return lead
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
  const lead = leads.get(id)
  if (!lead) return null
  
  const updated = { ...lead, status }
  leads.set(id, updated)
  return updated
}

export async function getNewLeadsCount(days: number = 7): Promise<number> {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  
  return Array.from(leads.values()).filter(
    l => l.status === 'new' && l.submittedAt >= cutoff
  ).length
}

export async function getLeadsCount(): Promise<number> {
  return leads.size
}
