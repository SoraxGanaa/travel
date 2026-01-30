'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Check, DollarSign, Loader2, Mail, Send, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { submitCustomTrip } from '@/app/actions/leads'
import { toast } from 'sonner'

const steps = [
  { id: 1, title: 'Огноо', icon: Calendar },
  { id: 2, title: 'Зорчигчид', icon: Users },
  { id: 3, title: 'Сонирхол', icon: Sparkles },
  { id: 4, title: 'Төсөв', icon: DollarSign },
  { id: 5, title: 'Холбоо барих', icon: Mail },
]

const interests = [
  { id: 'adventure', label: 'Адал явдал', description: 'Морь унах, авирах, кемпинг' },
  { id: 'culture', label: 'Соёл', description: 'Түүх, музей, уламжлал' },
  { id: 'nature', label: 'Байгаль', description: 'Цөл, нуур, уул' },
  { id: 'wildlife', label: 'Зэрлэг амьтад', description: 'Тахь, бүргэд, цаа буга' },
  { id: 'photography', label: 'Гэрэл зураг', description: 'Байгаль, соёлын зураг' },
  { id: 'nomadic', label: 'Нүүдэлчдийн амьдрал', description: 'Гэрт хонох, малчидтай уулзах' },
]

const budgetRanges = [
  { id: 'budget', label: '$500 - $1,000', description: 'Эдийн засаг' },
  { id: 'mid', label: '$1,000 - $2,500', description: 'Дунд зэрэг' },
  { id: 'premium', label: '$2,500 - $5,000', description: 'Дээд зэрэг' },
  { id: 'luxury', label: '$5,000+', description: 'Тансаг' },
]

interface FormData {
  dates: string
  travelersCount: number
  interests: string[]
  budgetRange: string
  email: string
  name: string
  phone: string
  message: string
}

export function CustomTripWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    dates: '',
    travelersCount: 2,
    interests: [],
    budgetRange: '',
    email: '',
    name: '',
    phone: '',
    message: '',
  })

  const updateFormData = (key: keyof FormData, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.dates.length > 0
      case 2:
        return formData.travelersCount > 0
      case 3:
        return formData.interests.length > 0
      case 4:
        return formData.budgetRange.length > 0
      case 5:
        return formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return

    setIsSubmitting(true)
    try {
      const result = await submitCustomTrip({
        userEmail: formData.email,
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        dates: formData.dates,
        travelersCount: formData.travelersCount,
        interests: formData.interests,
        budgetRange: formData.budgetRange,
        message: formData.message || undefined,
      })

      if (result.success) {
        setIsComplete(true)
        toast.success('Таны хүсэлтийг амжилттай илгээлээ!')
      } else {
        toast.error(result.error || 'Алдаа гарлаа')
      }
    } catch (error) {
      toast.error('Алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <Card className="border-border">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-chart-1/10 flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-chart-1" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Баярлалаа!
          </h2>
          <p className="text-muted-foreground mb-6">
            Таны хүсэлтийг амжилттай хүлээн авлаа. Бидний мэргэжилтнүүд 24 цагийн дотор 
            тантай холбогдож, аялалын дэлгэрэнгүй мэдээлэл өгөх болно.
          </p>
          <div className="p-4 rounded-lg bg-secondary/50 text-left max-w-md mx-auto">
            <h3 className="font-medium text-foreground mb-2">Таны хүсэлтийн хураангуй:</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium">Огноо:</span> {formData.dates}</p>
              <p><span className="font-medium">Зорчигчид:</span> {formData.travelersCount} хүн</p>
              <p><span className="font-medium">Сонирхол:</span> {formData.interests.map(i => interests.find(int => int.id === i)?.label).join(', ')}</p>
              <p><span className="font-medium">Төсөв:</span> {budgetRanges.find(b => b.id === formData.budgetRange)?.label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      isActive && 'bg-primary text-primary-foreground',
                      isCompleted && 'bg-chart-1 text-primary-foreground',
                      !isActive && !isCompleted && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium hidden sm:block',
                      isActive && 'text-primary',
                      !isActive && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-8 sm:w-16 lg:w-24 h-0.5 mx-2',
                      currentStep > step.id ? 'bg-chart-1' : 'bg-border'
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="border-border">
        <CardContent className="p-6 lg:p-8">
          {/* Step 1: Dates */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Аялалын огноо
                </h2>
                <p className="text-muted-foreground">
                  Та хэзээ Монголд ирэхээр төлөвлөж байна вэ?
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dates">Огноо эсвэл хугацааны хүрээ</Label>
                <Input
                  id="dates"
                  type="text"
                  placeholder="Жишээ: 2024 оны 7-р сар, эсвэл 2024.07.15 - 2024.07.25"
                  value={formData.dates}
                  onChange={(e) => updateFormData('dates', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Travelers */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Зорчигчдын тоо
                </h2>
                <p className="text-muted-foreground">
                  Хэдэн хүн аялахаар төлөвлөж байна вэ?
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateFormData('travelersCount', Math.max(1, formData.travelersCount - 1))}
                  disabled={formData.travelersCount <= 1}
                >
                  -
                </Button>
                <span className="text-3xl font-semibold text-foreground w-16 text-center">
                  {formData.travelersCount}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateFormData('travelersCount', formData.travelersCount + 1)}
                >
                  +
                </Button>
                <span className="text-muted-foreground">хүн</span>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Юунд сонирхолтой вэ?
                </h2>
                <p className="text-muted-foreground">
                  Нэг буюу түүнээс олон сонголт хийж болно
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      'p-4 rounded-lg border text-left transition-all',
                      formData.interests.includes(interest.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="font-medium text-foreground">{interest.label}</div>
                    <div className="text-sm text-muted-foreground">{interest.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Төсөв
                </h2>
                <p className="text-muted-foreground">
                  Нэг хүнд ногдох төсөв (нислэгээс бусад)
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    type="button"
                    onClick={() => updateFormData('budgetRange', budget.id)}
                    className={cn(
                      'p-4 rounded-lg border text-left transition-all',
                      formData.budgetRange === budget.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="font-medium text-foreground">{budget.label}</div>
                    <div className="text-sm text-muted-foreground">{budget.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Contact */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Холбоо барих мэдээлэл
                </h2>
                <p className="text-muted-foreground">
                  Бид тантай хэрхэн холбогдох вэ?
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    И-мэйл хаяг <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Нэр</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Таны нэр"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Утасны дугаар</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+976 ..."
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Нэмэлт мэдээлэл</Label>
                  <Textarea
                    id="message"
                    placeholder="Онцгой хүсэлт, асуулт..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Өмнөх
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!canProceed()}
              >
                Дараах
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Илгээж байна...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Илгээх
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
