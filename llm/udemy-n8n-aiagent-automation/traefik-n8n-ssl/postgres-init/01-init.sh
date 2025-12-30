#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create user and database
    CREATE USER n8n WITH PASSWORD '$DB_POSTGRESDB_PASSWORD';
    CREATE DATABASE n8n;
    
    -- Connect to the database
    \c n8n;
    
    -- Grant all privileges on the database
    GRANT ALL PRIVILEGES ON DATABASE n8n TO n8n;
    
    -- Grant all privileges on the public schema
    GRANT ALL PRIVILEGES ON SCHEMA public TO n8n;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO n8n;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO n8n;
    
    -- Set default privileges for future objects
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO n8n;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO n8n;
EOSQL
