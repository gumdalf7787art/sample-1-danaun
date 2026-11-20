-- Future D1 schema: transaction-based repository integration is still required.
CREATE TABLE IF NOT EXISTS members (
 id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE COLLATE NOCASE,
 email TEXT UNIQUE COLLATE NOCASE, name TEXT NOT NULL, password_hash TEXT,
 email_verified INTEGER NOT NULL DEFAULT 0,
 role TEXT NOT NULL DEFAULT 'member' CHECK(role IN ('member','admin','owner')),
 created_at TEXT NOT NULL, legacy_id TEXT UNIQUE
);
CREATE UNIQUE INDEX IF NOT EXISTS sole_owner ON members(role) WHERE role='owner';
CREATE TABLE IF NOT EXISTS member_identities (
 provider TEXT NOT NULL CHECK(provider IN ('kakao','naver')), subject TEXT NOT NULL,
 member_id TEXT NOT NULL REFERENCES members(id), PRIMARY KEY(provider,subject), UNIQUE(member_id,provider)
);
CREATE TABLE IF NOT EXISTS member_sessions (
 token_hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id), created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS session_expiry ON member_sessions(expires_at);
CREATE TABLE IF NOT EXISTS member_tokens (
 token_hash TEXT PRIMARY KEY, member_id TEXT NOT NULL REFERENCES members(id), purpose TEXT NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS member_role_audit (
 id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, target_id TEXT NOT NULL, action TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS member_oauth_flows (
 state_hash TEXT PRIMARY KEY, provider TEXT NOT NULL, member_id TEXT, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS member_rate_limits (
 key_hash TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
