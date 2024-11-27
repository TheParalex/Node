-- Create a database
CREATE DATABASE my_database;

-- Use the database
USE my_database;

-- Create a table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Insert a sample record
INSERT INTO users (name, email) VALUES ('John Doe', 'john.doe@example.com');
