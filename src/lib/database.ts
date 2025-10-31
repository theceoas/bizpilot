import { supabase, supabaseAdmin, Testimonial, BeforeAfterImage, ChatMessage } from './supabase'

// Testimonials functions
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .or('is_active.eq.true,is_active.is.null')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Supabase connection error:', error)
    return []
  }
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial | null> {
  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single()

  if (error) {
    console.error('Error creating testimonial:', error)
    return null
  }

  return data
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('testimonials')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('Error updating testimonial:', error)
    return false
  }

  return true
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('testimonials')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting testimonial:', error)
    return false
  }

  return true
}

// Before/After Images functions
export async function getBeforeAfterImages(): Promise<BeforeAfterImage[]> {
  try {
    const { data, error } = await supabase
      .from('before_after_images')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching before/after images:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Supabase connection error:', error)
    return []
  }
}

export async function createBeforeAfterImage(image: Omit<BeforeAfterImage, 'id' | 'created_at'>): Promise<BeforeAfterImage | null> {
  const { data, error } = await supabaseAdmin
    .from('before_after_images')
    .insert([image])
    .select()
    .single()

  if (error) {
    console.error('Error creating before/after image:', error)
    return null
  }

  return data
}

export async function updateBeforeAfterImage(id: string, updates: Partial<BeforeAfterImage>): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('before_after_images')
    .update(updates)
    .eq('id', id)

  if (error) {
    console.error('Error updating before/after image:', error)
    return false
  }

  return true
}

export async function deleteBeforeAfterImage(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('before_after_images')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    console.error('Error deleting before/after image:', error)
    return false
  }

  return true
}

// Chat Messages functions
export async function saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>): Promise<ChatMessage | null> {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([message])
    .select()
    .single()

  if (error) {
    console.error('Error saving chat message:', error)
    return null
  }

  return data
}

export async function getChatHistory(sessionId?: string): Promise<ChatMessage[]> {
  let query = supabase
    .from('chat_messages')
    .select('*')
    .order('created_at', { ascending: true })

  if (sessionId) {
    query = query.eq('session_id', sessionId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching chat history:', error)
    return []
  }

  return data || []
}

// File upload functions
export async function uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([path])

  if (error) {
    console.error('Error deleting file:', error)
    return false
  }

  return true
}