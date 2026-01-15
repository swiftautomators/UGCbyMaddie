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

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public insert submissions"
ON submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin view submissions"
ON submissions FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update submissions"
ON submissions FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete submissions"
ON submissions FOR DELETE
USING (auth.uid() IS NOT NULL);