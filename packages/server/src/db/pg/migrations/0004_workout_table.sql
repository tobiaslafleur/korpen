CREATE TABLE IF NOT EXISTS workouts(
  internal_id SERIAL PRIMARY KEY,
  id VARCHAR UNIQUE NOT NULL DEFAULT CONCAT('wko_', replace(cast(gen_random_uuid() AS text), '-', '')),
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  day_of_week INTEGER NOT NULL,
  time_of_day TIME NOT NULL,
  is_recurring BOOLEAN NOT NULL,
  is_cancelled BOOLEAN NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS workouts_is_recurring_index ON workouts(is_recurring);

CREATE INDEX IF NOT EXISTS workouts_is_cancelled_index ON workouts(is_cancelled);

CREATE INDEX IF NOT EXISTS workouts_date_index ON workouts(date);


