"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Instagram, Package, DollarSign } from "lucide-react"

export function BusinessForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    instagram: "",
    whatTheySell: "",
    revenue: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call the webhook with form data
      const response = await fetch('https://n8n.srv1089510.hstgr.cloud/webhook/a29b1c46-276d-443f-b9e7-5e4f16c0c25a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Still show success message to user even if webhook fails
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-6">
            We will be in touch soon.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
          Get Your Custom AI Solution
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Tell us about your business and we&apos;ll get in touch
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
              WhatsApp Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+234 801 234 5678"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm font-medium text-gray-700">
              Instagram Username *
            </Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="instagram"
                type="text"
                placeholder="@yourusername"
                value={formData.instagram}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* What They Sell */}
          <div className="space-y-2">
            <Label htmlFor="whatTheySell" className="text-sm font-medium text-gray-700">
              What do you sell? *
            </Label>
            <div className="relative">
              <Package className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Textarea
                id="whatTheySell"
                placeholder="Describe your products or services (e.g., fashion accessories, electronics, food items, etc.)"
                value={formData.whatTheySell}
                onChange={(e) => handleInputChange("whatTheySell", e.target.value)}
                className="pl-10 min-h-[80px]"
                required
              />
            </div>
          </div>

          {/* Revenue Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="revenue" className="text-sm font-medium text-gray-700">
              Monthly Revenue *
            </Label>
            <Select value={formData.revenue} onValueChange={(value) => handleInputChange("revenue", value)}>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                  <SelectValue placeholder="Select your monthly revenue range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-500k">Less than ₦500,000</SelectItem>
                <SelectItem value="500k-5m">₦500,000 - ₦5,000,000</SelectItem>
                <SelectItem value="5m-10m">₦5,000,000 - ₦10,000,000</SelectItem>
                <SelectItem value="10m-plus">₦10,000,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Get My Custom AI Solution →"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}