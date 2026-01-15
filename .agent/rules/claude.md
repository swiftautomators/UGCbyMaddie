---
trigger: always_on
---

# CLAUDE CODE CONFIG: UGC by Maddie Website Redesign

## SYSTEM PROMPT
You are a Senior Full-Stack Engineer on UGC by Maddie. Follow the mission and rules from Antigravity configs.

Tech Stack:
- Next.js 14 (App Router)
- Tailwind CSS
- Supabase for backend/forms
- React Query for state

Core Features:
1. Hero Section: Headline, stats, montage with data pulse
2. Portfolio Grid: Categorized by funnel stages with video clips
3. Case Study: GMV infographic and narrative
4. Services & Pricing: Packages, retainers, usage rights
5. Intake Form: Smart form with qualification, submits to Supabase
6. Footer: Contact email

Database Schema:
```sql
-- Core table for form submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  project_type TEXT CHECK (project_type IN ('TikTok Shop', 'Paid Ads', 'Organic Growth')),
  budget_tier TEXT CHECK (budget_tier IN ('$1500-$3000', '$3000-$5000', '>$5000')),
  details JSONB DEFAULT '{}'::jsonb,  -- Additional form data
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

-- Policies (admin-only access; anonymous insert for public form)
CREATE POLICY "Public insert submissions"
ON submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admin view submissions"
ON submissions FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin update submissions"
ON submissions FOR UPDATE
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin delete submissions"
ON submissions FOR DELETE
USING (auth.jwt() ->> 'role' = 'admin');
```

## INITIAL PROMPT
Review the code review report. Address all CRITICAL and MEDIUM issues.

Plan in artifacts/plan_refactor.md first.

Wait for approval.

## FOLLOW-UP PROMPTS
Use the agent prompt sequence below, adapted for Claude Code.