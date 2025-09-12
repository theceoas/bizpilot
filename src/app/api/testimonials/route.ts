import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const testimonialsPath = path.join(process.cwd(), 'data', 'testimonials.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// GET testimonials
export async function GET() {
  try {
    await ensureDataDir()
    
    try {
      const data = await fs.readFile(testimonialsPath, 'utf-8')
      const testimonials = JSON.parse(data)
      return NextResponse.json(testimonials)
    } catch {
      // If file doesn't exist, return default testimonials
      const defaultTestimonials = [
        {
          id: "1",
          name: "Ada",
          business: "Fashion Seller",
          testimonial: "BizPilot saved me 25 hours a week and boosted my sales by 40% in the first month.",
          result: "+40% Sales",
          timeSaved: "25 hours/week",
          avatar: "👩‍💼",
          active: true
        },
        {
          id: "2",
          name: "Chioma",
          business: "Beauty Products",
          testimonial: "I went from missing 10+ orders daily to zero missed sales. My customers love the instant replies!",
          result: "0 Missed Orders",
          timeSaved: "30 hours/week",
          avatar: "👩‍💼",
          active: true
        },
        {
          id: "3",
          name: "Kemi",
          business: "Phone Accessories",
          testimonial: "The AI handles everything while I focus on sourcing. My revenue doubled in 2 months.",
          result: "+100% Revenue",
          timeSaved: "20 hours/week",
          avatar: "👩‍💼",
          active: true
        }
      ]
      
      await fs.writeFile(testimonialsPath, JSON.stringify(defaultTestimonials, null, 2))
      return NextResponse.json(defaultTestimonials)
    }
  } catch {
    console.error('Error reading testimonials file')
    return NextResponse.json({ error: 'Failed to read testimonials' }, { status: 500 })
  }
}

// POST new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, business, testimonial, result, timeSaved, avatar } = body

    // Validate required fields
    if (!name || !business || !testimonial || !result || !timeSaved) {
      return NextResponse.json(
        { error: 'Missing required fields: name, business, testimonial, result, timeSaved' },
        { status: 400 }
      )
    }

    await ensureDataDir()

    // Read existing testimonials
    let testimonials = []
    try {
      const data = await fs.readFile(testimonialsPath, 'utf-8')
      testimonials = JSON.parse(data)
    } catch {
      // File doesn't exist, start with empty array
    }

    // Create new testimonial
    const newTestimonial = {
      id: Date.now().toString(),
      name,
      business,
      testimonial,
      result,
      timeSaved,
      avatar: avatar || "👩‍💼",
      active: true,
      createdAt: new Date().toISOString()
    }

    // Add to testimonials array
    testimonials.push(newTestimonial)

    // Keep only the latest 10 testimonials
    if (testimonials.length > 10) {
      testimonials = testimonials.slice(-10)
    }

    // Write back to file
    await fs.writeFile(testimonialsPath, JSON.stringify(testimonials, null, 2))

    return NextResponse.json(newTestimonial, { status: 201 })
  } catch {
    console.error('Error writing testimonials file')
    return NextResponse.json({ error: 'Failed to update testimonials' }, { status: 500 })
  }
}