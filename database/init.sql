CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS users;

-- Table of Items
CREATE TABLE jobs(
    id          UUID NOT NULL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    location    VARCHAR(120),
    user        UUID NOT NULL,
    description VARCHAR(8000),
    jobtype     VARCHAR(120),
    jobtitle    VARCHAR(120),
    salary      VARCHAR(120),
    company     VARCHAR(120),
    dateposted  DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Table of Keywords
CREATE TABLE keywords(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    keyword     VARCHAR(120) NOT NULL,
    jobId      UUID REFERENCES jobs(id) ON DELETE CASCADE
);

-- Table of saved
CREATE TABLE saved(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    userId      UUID REFERENCES users(id)
);

-- 
CREATE TABLE saved(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    userId      UUID REFERENCES users(id)
);


CREATE TABLE users (
 id UUID NOT NULL,
 firstName CHAR(64),
 lastName CHAR(64),
 email CHAR(128),
 password CHAR(60),
 CONSTRAINT users_pkey PRIMARY KEY(id)
);

