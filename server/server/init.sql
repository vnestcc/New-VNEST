CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  abstract TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending | approved | rejected
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS details (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  full_description TEXT NOT NULL,
  documents_url TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending | approved | rejected
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pitches (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMP NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled | completed | cancelled
  created_at TIMESTAMP DEFAULT NOW()
);
