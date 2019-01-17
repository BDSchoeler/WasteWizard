var data = require('./data.json');
var uuid = require('uuid/v4');

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });

  //Populate DB
  data.forEach(async (item) => {
    const id = uuid();
    //Insert Item into items table
    await pool.query('INSERT INTO items(id, title, description, favourite, category) VALUES ($1, $2, $3, $4, $5);',
      [id, item.title, item.body, false, item.category]);

    const indexOfOpenBracket = item.title.indexOf('(');
    //For each keyword and each title, insert into keywords table
    await pool.query('INSERT INTO keywords(id, "itemId", keyword) VALUES ($1, $2, $3);',
      [uuid(), id, item.title.substring(indexOfOpenBracket+1, item.title.length-1)]);

    
    const kws = item.keywords.split(',');
    kws.forEach(async (i) => {
        await pool.query('INSERT INTO keywords(id, "itemId", keyword) VALUES ($1, $2, $3);',
          [uuid(), id, i.trim()]);
    })
  })
pool.end();