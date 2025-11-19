-- database/schema.sql
CREATE TABLE clients (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14),
  phone VARCHAR(20),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE processes (
  id VARCHAR(255) PRIMARY KEY,
  client_id VARCHAR(255) REFERENCES clients(id),
  title VARCHAR(255) NOT NULL,
  value DECIMAL(10,2),
  deadline DATE,
  status VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
  id VARCHAR(255) PRIMARY KEY,
  process_id VARCHAR(255) REFERENCES processes(id),
  client_id VARCHAR(255) REFERENCES clients(id),
  original_name VARCHAR(255),
  filename VARCHAR(255),
  file_path VARCHAR(500),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
