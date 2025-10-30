-- ============================================
-- Add Multiple Images Support to Projects Table
-- ============================================
-- 
-- This migration adds support for multiple images per project.
-- Run this in your Supabase SQL Editor.
--
-- Date: 2024
-- Version: 1.1
-- ============================================

-- Add the images column if it doesn't exist
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Add a helpful comment
COMMENT ON COLUMN projects.images IS 'Array of image URLs for project gallery (in addition to main image_url)';

-- Verify the change (optional - shows table structure)
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- Example: How the data looks
-- {
--   "id": 1,
--   "title": "Example Project",
--   "description": "Project description",
--   "image_url": "https://...main-image.jpg",
--   "images": [
--     "https://...gallery-image-1.jpg",
--     "https://...gallery-image-2.jpg",
--     "https://...gallery-image-3.jpg"
--   ]
-- }
