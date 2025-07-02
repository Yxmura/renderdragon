
-- Create enum for resource categories
CREATE TYPE resource_category AS ENUM ('music', 'sfx', 'images', 'animations', 'fonts', 'presets');

-- Create enum for resource subcategories  
CREATE TYPE resource_subcategory AS ENUM ('davinci', 'adobe');

-- Create the main resources table
CREATE TABLE public.resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category resource_category NOT NULL,
  subcategory resource_subcategory,
  credit TEXT,
  filetype TEXT,
  software TEXT,
  image_url TEXT,
  description TEXT,
  preview_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger for resources
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update downloads table to reference resources
ALTER TABLE public.downloads 
  DROP COLUMN IF EXISTS asset_id,
  ADD COLUMN resource_id INTEGER REFERENCES public.resources(id) ON DELETE CASCADE;

-- Enable RLS on resources table
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create policies for resources table
-- Allow everyone to read resources
CREATE POLICY "Anyone can view resources" 
  ON public.resources 
  FOR SELECT 
  USING (true);

-- Only admin can insert, update, delete resources
CREATE POLICY "Admin can insert resources" 
  ON public.resources 
  FOR INSERT 
  WITH CHECK (auth.jwt() ->> 'email' = 'yamura@duck.com');

CREATE POLICY "Admin can update resources" 
  ON public.resources 
  FOR UPDATE 
  USING (auth.jwt() ->> 'email' = 'yamura@duck.com');

CREATE POLICY "Admin can delete resources" 
  ON public.resources 
  FOR DELETE 
  USING (auth.jwt() ->> 'email' = 'yamura@duck.com');

-- Update downloads table policies to use resource_id
DROP POLICY IF EXISTS "Allow insert for anon" ON public.downloads;
DROP POLICY IF EXISTS "Allow select for anon" ON public.downloads;
DROP POLICY IF EXISTS "Allow update for anon" ON public.downloads;

CREATE POLICY "Anyone can view downloads" 
  ON public.downloads 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert downloads" 
  ON public.downloads 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update downloads" 
  ON public.downloads 
  FOR UPDATE 
  USING (true);
