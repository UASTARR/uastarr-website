DROP TABLE IF EXISTS merchandise_images;;
DROP TABLE IF EXISTS merchandise;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS project_types;
DROP TABLE IF EXISTS sponsors;
DROP TABLE IF EXISTS sponsor_levels;
DROP TABLE IF EXISTS member_sub_teams;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS sub_teams;
DROP TABLE IF EXISTS member_types;
DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    -- year/folder_name composes the directory name for the album
    year varchar(255) NOT NULL,
    folder_name varchar(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    sub_name VARCHAR(255),
    display BOOLEAN NOT NULL DEFAULT TRUE,
    display_order SERIAL UNIQUE,
    cover_image_name VARCHAR(255),
    UNIQUE (year, folder_name)
);

CREATE TABLE member_types (
    name VARCHAR(50) PRIMARY KEY,
    type_order INT NOT NULL UNIQUE
);

CREATE TABLE sub_teams (
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    title VARCHAR(100) NOT NULL,
    member_type VARCHAR(50) DEFAULT 'general' REFERENCES member_types(name),
    img_ref_link VARCHAR(255),
    bio TEXT,
    display_order INT UNIQUE,
    joined_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE member_sub_teams (
    member_id INT REFERENCES members(id) ON DELETE CASCADE,
    sub_team_name VARCHAR(100) REFERENCES sub_teams(name) ON DELETE CASCADE,
    joined_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    leave_date TIMESTAMP,
    PRIMARY KEY (member_id, sub_team_name)
);

CREATE TABLE sponsor_levels (
    name VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    level_order INT NOT NULL UNIQUE,
    banner_colour VARCHAR(31) NOT NULL
);

CREATE TABLE sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sponsor_level VARCHAR(100) REFERENCES sponsor_levels(name) NOT NULL,
    website VARCHAR(255),
    img_ref_link VARCHAR(255),
    display_order INT,
    description TEXT,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (sponsor_level, display_order)
);

CREATE TABLE project_types (
    name VARCHAR(100) PRIMARY KEY,
    type_order INT NOT NULL UNIQUE,
    project_cover_img_ref_link VARCHAR(255) NOT NULL,
    banner_colour VARCHAR(31) NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) REFERENCES project_types(name) NOT NULL,
    album_year VARCHAR(255),
    album_folder_name VARCHAR(255),
    description TEXT,
    -- Cover image for the project
    cover_img_ref_link VARCHAR(255),
    -- Optional link to project repository
    repo_link VARCHAR(255),
    launch_date TIMESTAMP,
    playlist_link VARCHAR(255),
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_year, album_folder_name) REFERENCES albums(year, folder_name) ON DELETE SET NULL
);

CREATE TABLE merchandise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    img_ref_link VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE merchandise_images (
    id SERIAL PRIMARY KEY,
    merchandise_id INT REFERENCES merchandise(id) ON DELETE CASCADE,
    img_ref_link VARCHAR(255) NOT NULL
);