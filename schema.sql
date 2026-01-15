-- Core table for form submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  project_type TEXT CHECK (project_type IN ('TikTok Shop', 'Paid Ads', 'Organic Growth')),
  budget_tier TEXT CHECK (budget_tier IN ('$1500-$3000', '$3000-$5000', '>$5000')),
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$    
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_submissions_email ON submissions(email);

-- Admin management table
CREATE TABLE admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Admin-only view to admins table
CREATE POLICY "Admins view admins" ON admins
FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admins));

-- Policies for submissions
-- Note: Implement application-layer rate limiting in Next.js Server Actions.
CREATE POLICY "Public insert submissions"
ON submissions FOR INSERT
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  project_type IS NOT NULL AND
  budget_tier IS NOT NULL
);

CREATE POLICY "Admin view submissions"
ON submissions FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Admin update submissions"
ON submissions FOR UPDATE
USING (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Admin delete submissions"
ON submissions FOR DELETE
USING (auth.uid() IN (SELECT user_id FROM admins));
