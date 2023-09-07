CREATE TABLE IF NOT EXISTS instructors(
  internal_id SERIAL PRIMARY KEY,
  id VARCHAR UNIQUE NOT NULL DEFAULT CONCAT('ins_', replace(cast(gen_random_uuid() AS text), '-', '')),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE TRIGGER set_updated_at_instructors
BEFORE UPDATE ON instructors
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();