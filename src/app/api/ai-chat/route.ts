import { NextRequest, NextResponse } from 'next/server'
import { saveChatMessage } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // For demo purposes, we'll use a simple response system
    // In production, you would integrate with OpenAI or another AI service
    const response = await generateAIResponse(message)

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Simple AI response generator (replace with OpenAI in production)
async function generateAIResponse(message: string): Promise<string> {
  const lowerMessage = message.toLowerCase()

  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return "Our pricing is designed to be affordable for Nigerian businesses:\n\n• Starter Plan: ₦15,000/month - Perfect for small businesses just getting started\n• Growth Plan: ₦25,000/month - Great for businesses ready to scale\n• Pro Plan: ₦40,000/month - Complete automation for established businesses\n\nAll plans include setup, training, and ongoing support. Which plan sounds right for your business size?"
  }

  // Setup questions
  if (lowerMessage.includes('setup') || lowerMessage.includes('install') || lowerMessage.includes('how does it work')) {
    return "Setting up BizPilot is super easy! Here's how it works:\n\n1. 30-minute setup call with our team\n2. We securely connect your WhatsApp Business and Instagram\n3. Customize responses to match your brand voice\n4. Train the AI on your products and services\n5. Go live within 24 hours!\n\nNo technical skills needed - we handle everything for you. Would you like to schedule a setup call?"
  }

  // Features questions
  if (lowerMessage.includes('feature') || lowerMessage.includes('what can') || lowerMessage.includes('automation')) {
    return "BizPilot automates your entire customer communication process:\n\n✅ Auto-reply to WhatsApp and Instagram messages\n✅ Automatic payment confirmations\n✅ Order tracking and updates\n✅ 24/7 customer support\n✅ Lead qualification and follow-up\n✅ Appointment booking\n\nYou'll save 25+ hours per week and never miss another customer! What type of business do you run?"
  }

  // Safety/security questions
  if (lowerMessage.includes('safe') || lowerMessage.includes('secure') || lowerMessage.includes('data')) {
    return "Absolutely! Security is our top priority:\n\n🔒 Bank-level encryption for all data\n🔒 We never store sensitive customer information\n🔒 Secure API connections only\n🔒 You maintain full control of your accounts\n🔒 GDPR and data protection compliant\n\nYour business and customer data is completely safe with us. Do you have any specific security concerns?"
  }

  // Business type questions
  if (lowerMessage.includes('fashion') || lowerMessage.includes('beauty') || lowerMessage.includes('food') || lowerMessage.includes('product')) {
    return "Perfect! BizPilot works amazingly well for product-based businesses like yours. We help you:\n\n📱 Instantly respond to product inquiries\n💰 Confirm payments automatically\n📦 Send order updates and tracking info\n🎯 Qualify leads and close more sales\n⭐ Collect reviews and testimonials\n\nOur clients typically see 40-60% increase in sales within the first month. What's your biggest challenge with customer communication right now?"
  }

  // Testimonial/results questions
  if (lowerMessage.includes('result') || lowerMessage.includes('testimonial') || lowerMessage.includes('success')) {
    return "Our clients see amazing results! Here are some real examples:\n\n🌟 Chioma (Beauty Products): \"Went from missing 10+ orders daily to zero missed sales. Revenue doubled in two months.\"\n\n🌟 Ada (Fashion Seller): \"Saved 25 hours weekly and boosted sales by 40% in the first month.\"\n\nTypical results our clients see:\n• 40-60% increase in sales\n• 25+ hours saved per week\n• Zero missed customer messages\n• Faster payment processing\n\nWhat kind of results are you hoping to achieve?"
  }

  // General greeting or unclear questions
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.length < 10) {
    return "Hello! I'm here to help you learn about BizPilot and how we can automate your business communications.\n\nI can tell you about:\n• Our automation features\n• Pricing and plans\n• Setup process\n• Success stories\n• How it works for your specific business\n\nWhat would you like to know about BizPilot?"
  }

  // Default response
  return "That's a great question! BizPilot is designed to automate your WhatsApp and Instagram business communications, helping you save time and increase sales.\n\nI'd love to give you a more specific answer. Could you tell me:\n• What type of business do you run?\n• What's your biggest challenge with customer communication?\n• Are you currently using WhatsApp or Instagram for business?\n\nThis will help me provide the most relevant information for your situation!"
}

// Webhook endpoint for n8n integration
export async function PUT(request: NextRequest) {
  try {
    const { message, webhook_id } = await request.json()
    
    // Verify webhook secret (in production)
    const webhookSecret = request.headers.get('x-webhook-secret')
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Generate AI response
    const response = await generateAIResponse(message)

    // Save to database
    await saveChatMessage({
      question: message,
      answer: response,
      session_id: `webhook-${webhook_id}`
    })

    // Return response for n8n
    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      source: 'bizpilot-ai'
    })

  } catch (error) {
    console.error('Error in webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}