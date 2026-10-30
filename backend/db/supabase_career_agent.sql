-- ==============================================================================
-- PLACERA AI: AI Career Agent Conversation History Schema for Supabase PostgreSQL
-- ==============================================================================

-- 1. Create career_agent_conversations table
CREATE TABLE IF NOT EXISTS public.career_agent_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL DEFAULT 'New Conversation',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create career_agent_messages table
CREATE TABLE IF NOT EXISTS public.career_agent_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.career_agent_conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for high-speed queries and ordering
CREATE INDEX IF NOT EXISTS idx_career_conversations_user 
    ON public.career_agent_conversations (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_career_messages_conversation 
    ON public.career_agent_messages (conversation_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_career_messages_user 
    ON public.career_agent_messages (user_id);

-- 4. Enable Row Level Security (RLS) on both tables
ALTER TABLE public.career_agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_agent_messages ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies for career_agent_conversations
-- Users can only select their own conversations
DROP POLICY IF EXISTS "Users can view own career conversations" ON public.career_agent_conversations;
CREATE POLICY "Users can view own career conversations"
    ON public.career_agent_conversations
    FOR SELECT
    USING (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- Users can only insert conversations for themselves
DROP POLICY IF EXISTS "Users can insert own career conversations" ON public.career_agent_conversations;
CREATE POLICY "Users can insert own career conversations"
    ON public.career_agent_conversations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- Users can only update their own conversations
DROP POLICY IF EXISTS "Users can update own career conversations" ON public.career_agent_conversations;
CREATE POLICY "Users can update own career conversations"
    ON public.career_agent_conversations
    FOR UPDATE
    USING (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- Users can only delete their own conversations
DROP POLICY IF EXISTS "Users can delete own career conversations" ON public.career_agent_conversations;
CREATE POLICY "Users can delete own career conversations"
    ON public.career_agent_conversations
    FOR DELETE
    USING (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- 6. Row Level Security Policies for career_agent_messages
-- Users can only view messages belonging to their conversations
DROP POLICY IF EXISTS "Users can view own career messages" ON public.career_agent_messages;
CREATE POLICY "Users can view own career messages"
    ON public.career_agent_messages
    FOR SELECT
    USING (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- Users can only insert their own messages
DROP POLICY IF EXISTS "Users can insert own career messages" ON public.career_agent_messages;
CREATE POLICY "Users can insert own career messages"
    ON public.career_agent_messages
    FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- Users can only delete their own messages
DROP POLICY IF EXISTS "Users can delete own career messages" ON public.career_agent_messages;
CREATE POLICY "Users can delete own career messages"
    ON public.career_agent_messages
    FOR DELETE
    USING (auth.uid() = user_id OR auth.uid()::text = user_id::text);

-- 7. Trigger to automatically update updated_at on career_agent_conversations
CREATE OR REPLACE FUNCTION public.handle_career_conversation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_career_conversation_timestamp ON public.career_agent_conversations;
CREATE TRIGGER set_career_conversation_timestamp
    BEFORE UPDATE ON public.career_agent_conversations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_career_conversation_updated_at();
