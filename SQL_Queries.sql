-- Create Database
CREATE DATABASE IF NOT EXISTS iot_local_db;
USE iot_local_db;

-- Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    organization_id VARCHAR(50) PRIMARY KEY,
    organization_type VARCHAR(100) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_date INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE organization_config (
    organization_id VARCHAR(50) PRIMARY KEY,
    logo VARCHAR(500),
    background_image VARCHAR(500),
    primary_color VARCHAR(20),
    secondary_color VARCHAR(20),
    welcome_title VARCHAR(255),
    welcome_captions TEXT,
    website_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

-- User Roles Table
CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
	  is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO roles (`role_name`) VALUES ('System Admin'), ('Admin');


-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) PRIMARY KEY,
    organization_id VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_date INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    organization_id VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    mobile_number INT NOT NULL,
    hid VARCHAR(50),
    mac_address VARCHAR(50),
    ip_address VARCHAR(50),
    otp_code VARCHAR(10),
    otp_generated_date INT,
    is_otp_verified BOOLEAN DEFAULT FALSE,
    otp_resend_count INT DEFAULT 0,
    otp_verification_attempts INT DEFAULT 0,
    fas_token VARCHAR(255) NOT NULL,
    origin_url TEXT,
    gateway_address VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_date INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

-- Browsing Logs Table
CREATE TABLE IF NOT EXISTS browsing_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    organization_id VARCHAR(50) NOT NULL,
    access_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);