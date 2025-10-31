-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
-- Note: JWT secret should be configured in Supabase dashboard

-- Create custom types
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE client_status AS ENUM ('active', 'inactive', 'churned');
CREATE TYPE notification_type AS ENUM ('new_lead', 'lead_updated', 'client_updated', 'system');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pipeline stages table
CREATE TABLE public.pipeline_stages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  website TEXT,
  status lead_status DEFAULT 'new',
  priority priority_level DEFAULT 'medium',
  pipeline_stage_id UUID REFERENCES public.pipeline_stages(id),
  source TEXT, -- 'website', 'referral', 'social', 'email', etc.
  notes TEXT,
  estimated_value DECIMAL(10,2),
  assigned_to UUID REFERENCES public.profiles(id),
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  next_follow_up_at TIMESTAMP WITH TIME ZONE,
  converted_to_client_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  website TEXT,
  status client_status DEFAULT 'active',
  billing_address JSONB,
  contract_value DECIMAL(10,2),
  contract_start_date DATE,
  contract_end_date DATE,
  assigned_to UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table (for tracking interactions)
CREATE TABLE public.activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'note', 'task'
  title TEXT NOT NULL,
  description TEXT,
  lead_id UUID REFERENCES public.leads(id),
  client_id UUID REFERENCES public.clients(id),
  created_by UUID REFERENCES public.profiles(id) NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  metadata JSONB, -- For storing additional data like call duration, email subject, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT activities_lead_or_client_check CHECK (
    (lead_id IS NOT NULL AND client_id IS NULL) OR 
    (lead_id IS NULL AND client_id IS NOT NULL)
  )
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  metadata JSONB, -- For storing additional data like lead_id, client_id, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product showcase uploads table (for displaying completed work)
CREATE TABLE public.product_showcases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL, -- Main thumbnail for display
  before_images JSONB, -- Array of before image URLs
  after_images JSONB, -- Array of after image URLs
  before_videos JSONB, -- Array of before video URLs
  after_videos JSONB, -- Array of after video URLs
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced testimonials table with text message images
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  text_message_image_url TEXT, -- URL for clickable text message screenshot
  is_text_message BOOLEAN DEFAULT false, -- Flag to indicate if this is a text message testimonial
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Keep existing before_after_images table
CREATE TABLE IF NOT EXISTS before_after_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced chat_messages table for AI agent with webhook support
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT,
  session_id VARCHAR(255),
  user_ip VARCHAR(45),
  user_agent TEXT,
  webhook_response JSONB, -- Store n8n webhook response data
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  processing_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI agent configuration table
CREATE TABLE ai_agent_config (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  webhook_url TEXT, -- n8n webhook URL
  system_prompt TEXT,
  is_active BOOLEAN DEFAULT true,
  max_tokens INTEGER DEFAULT 1000,
  temperature DECIMAL(3,2) DEFAULT 0.7,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads table for admin content management
CREATE TABLE file_uploads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  bucket_name VARCHAR(100) NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id),
  upload_purpose VARCHAR(100), -- 'testimonial', 'before_after', 'product_showcase', 'text_message'
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE before_after_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on before_after_images" ON before_after_images
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on chat_messages" ON chat_messages
  FOR SELECT USING (true);

-- Create policies for authenticated insert/update/delete
CREATE POLICY "Allow authenticated insert on testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on before_after_images" ON before_after_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on before_after_images" ON before_after_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on before_after_images" ON before_after_images
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public insert on chat_messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on chat_messages" ON chat_messages
  FOR UPDATE USING (true);

-- AI agent config policies
CREATE POLICY "Allow public read access on ai_agent_config" ON ai_agent_config
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow authenticated manage on ai_agent_config" ON ai_agent_config
  FOR ALL USING (auth.role() = 'authenticated');

-- File uploads policies
CREATE POLICY "Allow public read access on file_uploads" ON file_uploads
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on file_uploads" ON file_uploads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on file_uploads" ON file_uploads
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on file_uploads" ON file_uploads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Insert default pipeline stages
INSERT INTO public.pipeline_stages (name, description, order_index, color) VALUES
  ('New Lead', 'Newly acquired leads', 1, '#EF4444'),
  ('Contacted', 'Initial contact made', 2, '#F97316'),
  ('Qualified', 'Lead has been qualified', 3, '#EAB308'),
  ('Proposal Sent', 'Proposal has been sent', 4, '#3B82F6'),
  ('Negotiation', 'In negotiation phase', 5, '#8B5CF6'),
  ('Closed Won', 'Successfully closed', 6, '#10B981'),
  ('Closed Lost', 'Lost opportunity', 7, '#6B7280');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, company, content, rating, image_url) VALUES
('Sarah Johnson', 'CEO', 'TechStart Inc.', 'BizPilot transformed our business operations completely. The AI automation saved us 40 hours per week!', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'),
('Michael Chen', 'Operations Manager', 'GrowthCorp', 'The lead generation system increased our conversion rate by 300%. Absolutely incredible results!', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'),
('Emily Rodriguez', 'Marketing Director', 'ScaleUp Solutions', 'We went from manual processes to fully automated workflows. BizPilot is a game-changer!', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face');

-- Insert sample before/after images
INSERT INTO before_after_images (title, description, before_image_url, after_image_url, category) VALUES
('E-commerce Automation', 'Transformed manual order processing into automated workflow', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', 'automation'),
('Lead Management System', 'From spreadsheets to intelligent CRM automation', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', 'crm'),
('Customer Support Automation', 'Automated customer service with AI chatbots', 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', 'support');

-- Insert default AI agent configuration
INSERT INTO ai_agent_config (name, description, system_prompt, is_active) VALUES
('BizPilot Assistant', 'AI assistant for customer inquiries and lead qualification', 'You are BizPilot AI Assistant, a helpful AI that helps potential customers understand our business automation services. Be friendly, professional, and focus on how we can help automate their business processes. Ask qualifying questions to understand their needs and guide them toward booking a consultation.', true);

-- Create indexes for better performance
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_pipeline_stage ON public.leads(pipeline_stage_id);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_assigned_to ON public.clients(assigned_to);
CREATE INDEX idx_activities_lead_id ON public.activities(lead_id);
CREATE INDEX idx_activities_client_id ON public.activities(client_id);
CREATE INDEX idx_activities_created_by ON public.activities(created_by);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_showcases ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Pipeline stages policies (read-only for most users)
CREATE POLICY "Users can view pipeline stages" ON public.pipeline_stages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage pipeline stages" ON public.pipeline_stages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Leads policies
CREATE POLICY "Users can view all leads" ON public.leads
  FOR SELECT USING (true);

CREATE POLICY "Users can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update leads" ON public.leads
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete leads" ON public.leads
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients policies
CREATE POLICY "Users can view all clients" ON public.clients
  FOR SELECT USING (true);

CREATE POLICY "Users can insert clients" ON public.clients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update clients" ON public.clients
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete clients" ON public.clients
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Activities policies
CREATE POLICY "Users can view all activities" ON public.activities
  FOR SELECT USING (true);

CREATE POLICY "Users can insert activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own activities" ON public.activities
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own activities" ON public.activities
  FOR DELETE USING (auth.uid() = created_by);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- Product showcases policies
CREATE POLICY "Anyone can view product showcases" ON public.product_showcases
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage product showcases" ON public.product_showcases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pipeline_stages_updated_at
  BEFORE UPDATE ON public.pipeline_stages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_showcases_updated_at
  BEFORE UPDATE ON public.product_showcases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function for creating notifications when new leads are added
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notification for admin users
  INSERT INTO public.notifications (user_id, type, title, message, metadata)
  SELECT 
    p.id,
    'new_lead'::notification_type,
    'New Lead Submitted',
    'A new lead "' || NEW.full_name || '" has been submitted from the website.',
    json_build_object('lead_id', NEW.id, 'lead_name', NEW.full_name)
  FROM public.profiles p
  WHERE p.role = 'admin';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new lead notifications
CREATE TRIGGER on_new_lead_created
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

-- Create admin user with the provided UUID
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES (
  '88e18b40-6507-428f-adb5-6a5cbc9401d1',
  'admin@bizpilot.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Admin User"}'
) ON CONFLICT (id) DO NOTHING;

-- Create admin profile
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  '88e18b40-6507-428f-adb5-6a5cbc9401d1',
  'admin@bizpilot.com',
  'Admin User',
  'admin'
) ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('testimonials', 'testimonials', true),
  ('before-after', 'before-after', true),
  ('chat-images', 'chat-images', true),
  ('product-showcases', 'product-showcases', true),
  ('text-messages', 'text-messages', true),
  ('admin-uploads', 'admin-uploads', true);

-- Create storage policies
CREATE POLICY "Allow public read access on testimonials bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'testimonials');

CREATE POLICY "Allow authenticated upload on testimonials bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'testimonials' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on before-after bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'before-after');

CREATE POLICY "Allow authenticated upload on before-after bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'before-after' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on chat-images bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'chat-images');

CREATE POLICY "Allow public upload on chat-images bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'chat-images');

CREATE POLICY "Allow public read access on product-showcases bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-showcases');

CREATE POLICY "Allow authenticated upload on product-showcases bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-showcases' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on text-messages bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'text-messages');

CREATE POLICY "Allow authenticated upload on text-messages bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'text-messages' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public read access on admin-uploads bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-uploads');

CREATE POLICY "Allow authenticated upload on admin-uploads bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'admin-uploads' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on admin-uploads bucket" ON storage.objects
  FOR DELETE USING (bucket_id = 'admin-uploads' AND auth.role() = 'authenticated');