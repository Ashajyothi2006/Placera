const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');
const { db } = require('../db/assessmentDb');

// Check for Supabase environment configuration
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('[CareerChatService] Connected to Supabase PostgreSQL database.');
  } catch (err) {
    console.warn('[CareerChatService] Failed to initialize Supabase client:', err.message);
  }
}

// Initialize SQLite fallback tables with the exact same relational schema
function initCareerChatDb() {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS career_agent_conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS career_agent_messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES career_agent_conversations(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_career_conv_user ON career_agent_conversations(user_id, updated_at DESC);
      CREATE INDEX IF NOT EXISTS idx_career_msg_conv ON career_agent_messages(conversation_id, created_at ASC);
    `);
  } catch (err) {
    console.error('[CareerChatService] Error initializing tables:', err);
  }
}

initCareerChatDb();

// Generate intelligent concise title for a conversation based on first user prompt
function generateTitleFromPrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') return 'New Conversation';
  const clean = prompt.trim().replace(/^["']|["']$/g, '');

  // Look for recognizable keywords or patterns
  if (/tcs/i.test(clean)) return 'TCS Placement Preparation';
  if (/accenture/i.test(clean)) return 'Accenture Preparation';
  if (/google/i.test(clean)) return 'Google Interview Prep';
  if (/infosys/i.test(clean)) return 'Infosys Placement Prep';
  if (/resume/i.test(clean)) return 'Resume Optimization';
  if (/salary|offer|ctc/i.test(clean)) return 'Salary & Offer Advice';
  if (/system design/i.test(clean)) return 'System Design Discussion';
  if (/dsa|algorithm|coding/i.test(clean)) return 'DSA & Coding Practice';
  if (/python/i.test(clean)) return 'Python Technical Discussion';
  if (/java/i.test(clean)) return 'Java Technical Discussion';
  if (/react/i.test(clean)) return 'React & Frontend Prep';
  if (/sql|dbms/i.test(clean)) return 'SQL & Database Prep';

  // Fallback: Safe truncation of first sentence or first 45 chars
  const firstSentence = clean.split(/[.?!:\n]/)[0].trim();
  if (firstSentence.length <= 40) {
    return firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1);
  }
  return firstSentence.slice(0, 37).trim() + '...';
}

const careerChatService = {
  // 1. List conversations for an authenticated user
  async listConversations(userId, limit = 50) {
    const effectiveUserId = (userId || 'default_user').trim();

    // A. Supabase
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('career_agent_conversations')
          .select('id, user_id, title, created_at, updated_at')
          .eq('user_id', effectiveUserId)
          .order('updated_at', { ascending: false })
          .limit(limit);

        if (!error && Array.isArray(data)) {
          return data;
        }
        console.warn('[CareerChatService] Supabase list error, falling back to local db:', error?.message);
      } catch (err) {
        console.warn('[CareerChatService] Supabase query exception:', err.message);
      }
    }

    // B. SQLite Database (strictly scoped to user_id)
    try {
      const stmt = db.prepare(`
        SELECT id, user_id, title, created_at, updated_at 
        FROM career_agent_conversations 
        WHERE user_id = ? 
        ORDER BY updated_at DESC 
        LIMIT ?
      `);
      return stmt.all(effectiveUserId, limit);
    } catch (err) {
      console.error('[CareerChatService] Failed to list conversations:', err);
      return [];
    }
  },

  // 2. Create a new conversation
  async createConversation(userId, title) {
    const effectiveUserId = (userId || 'default_user').trim();
    const convId = randomUUID();
    const convTitle = (title || 'New Conversation').trim();
    const nowIso = new Date().toISOString();

    // A. Supabase
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('career_agent_conversations')
          .insert({
            id: convId,
            user_id: effectiveUserId,
            title: convTitle,
            created_at: nowIso,
            updated_at: nowIso
          })
          .select()
          .single();

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('[CareerChatService] Supabase create error:', err.message);
      }
    }

    // B. SQLite Database
    try {
      const stmt = db.prepare(`
        INSERT INTO career_agent_conversations (id, user_id, title, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?)
      `);
      stmt.run(convId, effectiveUserId, convTitle, nowIso, nowIso);
      return {
        id: convId,
        user_id: effectiveUserId,
        title: convTitle,
        created_at: nowIso,
        updated_at: nowIso
      };
    } catch (err) {
      console.error('[CareerChatService] Failed to create conversation:', err);
      throw err;
    }
  },

  // 3. Get conversation and all its messages in chronological order (strictly scoped to userId)
  async getConversation(conversationId, userId) {
    const effectiveUserId = (userId || 'default_user').trim();

    // A. Supabase
    if (supabase) {
      try {
        const { data: conv, error: convErr } = await supabase
          .from('career_agent_conversations')
          .select('*')
          .eq('id', conversationId)
          .eq('user_id', effectiveUserId)
          .single();

        if (!convErr && conv) {
          const { data: messages, error: msgErr } = await supabase
            .from('career_agent_messages')
            .select('*')
            .eq('conversation_id', conversationId)
            .eq('user_id', effectiveUserId)
            .order('created_at', { ascending: true });

          return {
            conversation: conv,
            messages: (!msgErr && messages) ? messages : []
          };
        }
      } catch (err) {
        console.warn('[CareerChatService] Supabase getConversation error:', err.message);
      }
    }

    // B. SQLite Database
    try {
      const convStmt = db.prepare(`
        SELECT * FROM career_agent_conversations 
        WHERE id = ? AND user_id = ?
      `);
      const conv = convStmt.get(conversationId, effectiveUserId);
      if (!conv) {
        return null; // Not found or not authorized
      }

      const msgStmt = db.prepare(`
        SELECT * FROM career_agent_messages 
        WHERE conversation_id = ? AND user_id = ? 
        ORDER BY datetime(created_at) ASC, rowid ASC
      `);
      const messages = msgStmt.all(conversationId, effectiveUserId);

      return {
        conversation: conv,
        messages: messages || []
      };
    } catch (err) {
      console.error('[CareerChatService] Failed to get conversation:', err);
      return null;
    }
  },

  // 4. Save a message and touch updated_at
  async saveMessage(conversationId, userId, role, content) {
    const effectiveUserId = (userId || 'default_user').trim();
    const msgId = randomUUID();
    const nowIso = new Date().toISOString();

    // A. Supabase
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('career_agent_messages')
          .insert({
            id: msgId,
            conversation_id: conversationId,
            user_id: effectiveUserId,
            role,
            content,
            created_at: nowIso
          })
          .select()
          .single();

        // Update conversation updated_at
        await supabase
          .from('career_agent_conversations')
          .update({ updated_at: nowIso })
          .eq('id', conversationId)
          .eq('user_id', effectiveUserId);

        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('[CareerChatService] Supabase saveMessage error:', err.message);
      }
    }

    // B. SQLite Database
    try {
      const msgStmt = db.prepare(`
        INSERT INTO career_agent_messages (id, conversation_id, user_id, role, content, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      msgStmt.run(msgId, conversationId, effectiveUserId, role, content, nowIso);

      const touchStmt = db.prepare(`
        UPDATE career_agent_conversations 
        SET updated_at = ? 
        WHERE id = ? AND user_id = ?
      `);
      touchStmt.run(nowIso, conversationId, effectiveUserId);

      return {
        id: msgId,
        conversation_id: conversationId,
        user_id: effectiveUserId,
        role,
        content,
        created_at: nowIso
      };
    } catch (err) {
      console.error('[CareerChatService] Failed to save message:', err);
      throw err;
    }
  },

  // 5. Rename a conversation
  async renameConversation(conversationId, userId, newTitle) {
    const effectiveUserId = (userId || 'default_user').trim();
    const cleanTitle = (newTitle || 'Untitled Conversation').trim();
    const nowIso = new Date().toISOString();

    // A. Supabase
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('career_agent_conversations')
          .update({ title: cleanTitle, updated_at: nowIso })
          .eq('id', conversationId)
          .eq('user_id', effectiveUserId)
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('[CareerChatService] Supabase rename error:', err.message);
      }
    }

    // B. SQLite Database
    try {
      const stmt = db.prepare(`
        UPDATE career_agent_conversations 
        SET title = ?, updated_at = ? 
        WHERE id = ? AND user_id = ?
      `);
      const res = stmt.run(cleanTitle, nowIso, conversationId, effectiveUserId);
      return res.changes > 0 ? { id: conversationId, title: cleanTitle } : null;
    } catch (err) {
      console.error('[CareerChatService] Failed to rename conversation:', err);
      throw err;
    }
  },

  // 6. Delete a conversation and its messages
  async deleteConversation(conversationId, userId) {
    const effectiveUserId = (userId || 'default_user').trim();

    // A. Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('career_agent_conversations')
          .delete()
          .eq('id', conversationId)
          .eq('user_id', effectiveUserId);

        if (!error) return true;
      } catch (err) {
        console.warn('[CareerChatService] Supabase delete error:', err.message);
      }
    }

    // B. SQLite Database
    try {
      // Delete child messages
      const delMsg = db.prepare(`
        DELETE FROM career_agent_messages 
        WHERE conversation_id = ? AND user_id = ?
      `);
      delMsg.run(conversationId, effectiveUserId);

      // Delete parent conversation
      const delConv = db.prepare(`
        DELETE FROM career_agent_conversations 
        WHERE id = ? AND user_id = ?
      `);
      const res = delConv.run(conversationId, effectiveUserId);
      return res.changes > 0;
    } catch (err) {
      console.error('[CareerChatService] Failed to delete conversation:', err);
      throw err;
    }
  },

  generateTitleFromPrompt
};

module.exports = careerChatService;
