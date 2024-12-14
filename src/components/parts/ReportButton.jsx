'use client'

import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { submitReport } from '../actions/report'

const reportOptions = [
  { label: 'Report abuse', value: 'abuse' },
  { label: 'Report irrelevance', value: 'irrelevance' },
  { label: 'Report spam', value: 'spam' },
  { label: 'Report inappropriate content', value: 'inappropriate' },
]

export function ReportDialog({content}) {

    
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const handleReport = async (reason) => {
    setIsSubmitting(true)
    // const result = await submitReport(reason)
    setResult(result)
    console.log(content);
    setIsSubmitting(false)
    setTimeout(() => setIsOpen(false), 2000) 
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open report menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
        </DialogHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Select a reason'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {reportOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => handleReport(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {result && (
          <div className={result.success ? 'text-green-600' : 'text-red-600'}>
            {result.message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

