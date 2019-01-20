CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS keywords;

-- Table of Items
CREATE TABLE items(
    id          UUID NOT NULL PRIMARY KEY,
    title       VARCHAR(120) NOT NULL,
    category    VARCHAR(120),
    description VARCHAR(8000),
    favourite   BOOLEAN
);

-- Table of Keywords
CREATE TABLE keywords(
    id          UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v1(),
    keyword     VARCHAR(120) NOT NULL,
    itemId      UUID REFERENCES items(id) ON DELETE CASCADE
);