CREATE TABLE IF NOT EXISTS insight_posts (
 id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE,
 category TEXT NOT NULL CHECK(category IN ('column','questions','tv')),
 status TEXT NOT NULL CHECK(status IN ('draft','published','archived')),
 version INTEGER NOT NULL DEFAULT 1, published_at TEXT, updated_at TEXT NOT NULL,
 payload TEXT NOT NULL CHECK(json_valid(payload))
);
CREATE INDEX IF NOT EXISTS insight_public ON insight_posts(status,category,published_at DESC);
