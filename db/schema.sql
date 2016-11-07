DROP TABLE IF EXISTS task;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  description VARCHAR(255),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  date_created TIMESTAMP  DEFAULT FALSE DEFAULT NOW(),
  date_completed TIMESTAMP,
  date_deleted TIMESTAMP
);
-- Create an index
CREATE INDEX 'name_idx'
ON tasks (name);
