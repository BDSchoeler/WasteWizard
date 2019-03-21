CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS users;

-- Table of Items
CREATE TABLE items(
    id          UUID NOT NULL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    location    VARCHAR(120),
    description VARCHAR(8000),
    jobtype     VARCHAR(120),
    jobtitle    VARCHAR(120),
    salary      VARCHAR(120),
    company     VARCHAR(120)
);

-- Table of Keywords
CREATE TABLE keywords(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    keyword     VARCHAR(120) NOT NULL,
    itemId      UUID REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE users (
 id UUID NOT NULL,
 firstName CHAR(64),
 lastName CHAR(64),
 email CHAR(128),
 password CHAR(60),
 CONSTRAINT users_pkey PRIMARY KEY(id)
);

