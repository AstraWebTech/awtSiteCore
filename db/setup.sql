SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS info_block_custom_values;
DROP TABLE IF EXISTS info_block_custom_fields;
DROP TABLE IF EXISTS info_block_elements;
DROP TABLE IF EXISTS info_blocks;
DROP TABLE IF EXISTS resize_images;
DROP TABLE IF EXISTS images;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_code VARCHAR(255),
    external_code VARCHAR(255),
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url TEXT
);

CREATE TABLE info_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_code VARCHAR(255),
    external_code VARCHAR(255),
    name VARCHAR(255),
    sort INT,
    is_active BOOLEAN,
    active_from DATETIME,
    active_to DATETIME
);

CREATE TABLE info_block_elements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    info_block_id INT,
    parent_id INT,
    character_code VARCHAR(255),
    external_code VARCHAR(255),
    name VARCHAR(255),
    sort INT,
    is_active BOOLEAN,
    active_from DATETIME,
    active_to DATETIME,
    FOREIGN KEY (parent_id) REFERENCES info_block_elements(id) ON DELETE CASCADE
);

CREATE TABLE info_block_custom_fields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    info_block_id INT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (info_block_id) REFERENCES info_blocks(id) ON DELETE CASCADE
);

CREATE TABLE info_block_custom_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    info_block_element_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    value TEXT,
    FOREIGN KEY (info_block_element_id) REFERENCES info_block_elements(id) ON DELETE CASCADE
);


CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    url TEXT
);

CREATE TABLE resize_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id INT,
    less_width INT,
    more_width INT,
    less_height INT,
    more_height INT,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
);
