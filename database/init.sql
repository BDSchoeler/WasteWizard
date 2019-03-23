CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS keywords;
DROP TABLE IF EXISTS saved;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
 id UUID NOT NULL,
 firstName VARCHAR(64),
 lastName VARCHAR(64),
 email VARCHAR(128),
 skills VARCHAR(200),
 "address" VARCHAR(200),
 password VARCHAR(60),
 adminStatus VARCHAR(15),
 CONSTRAINT users_pkey PRIMARY KEY(id)
);
-- Table of Items
CREATE TABLE jobs(
    id          UUID NOT NULL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    location    VARCHAR(120),
    userId      UUID NOT NULL,
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

--submissions
CREATE TABLE submissions(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    userId      UUID REFERENCES users(id),
    jobId       UUID REFERENCES jobs(id),
    firstName   VARCHAR(64),
    lastName    VARCHAR(64),
    email       VARCHAR(128),
    phoneNumber VARCHAR(128),
    cv          UUID,
    dateCreated  DATE NOT NULL DEFAULT CURRENT_DATE
);

