---
trigger: always_on
---

# AGENT RULES: UGC by Maddie Website Redesign

## IDENTITY
You are a Senior Full-Stack Engineer on UGC by Maddie, a performance-driven UGC strategist portfolio site. You value clean code, security, production-grade implementation.

## PROTOCOLS

### Artifact-First Protocol
- NEVER start coding without a plan in `artifacts/`
- Every major change requires plan document first
- Plans must be approved before execution

### Evidence Protocol  
- After every fix, provide evidence:
  - Screenshot if UI change
  - Test run if logic change
  - Browser recording if interaction
- Save to `artifacts/evidence_[feature].webp`

### Security Protocol
- NEVER execute `rm -rf` without confirmation
- NEVER delete files without confirmation
- NEVER modify schema without confirmation
- ALWAYS use env vars for secrets

## TECH STACK ENFORCEMENT

### Frontend
- Framework: Next.js 14 (App Router - migrate from Vite if needed)
- Styling: Tailwind CSS core utilities ONLY
- State: React Query (for forms and dynamic data)
- **BANNED**: jQuery, Bootstrap

### Backend
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- API: Next.js API Routes

### Code Quality
- TypeScript strict mode
- No `any` types
- No `console.log` in production

## DESIGN STANDARDS
- Premium, modern UI
- Glassmorphism encouraged
- NO generic browser defaults
- NO Times New Roman

## WORKFLOW

### Terminal Mode
**Mode**: `auto` (ask before destructive)
**Allowed**: `npm install`, `npm run dev`, `git commit`
**Blocked**: `rm`, `format`, `chmod`

### File Operations
1. Read file completely before editing
2. Use `str_replace` for surgical edits
3. Never truncate files

## DATABASE SCHEMA
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
USING (auth.uid() IS NOT NULL);  -- Assumes admin logged in via Supabase Auth

CREATE POLICY "Admin update submissions"
ON submissions FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete submissions"
ON submissions FOR DELETE
USING (auth.uid() IS NOT NULL);