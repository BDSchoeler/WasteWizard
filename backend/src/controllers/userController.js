import { Pool } from 'pg';
import bcrypt from 'bcrypt';
const uuidv4 = require('uuid/v4');
import User from '../models/user';

export default class ItemController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  // Get Item by Keyword
  async create(data) {
    const user = new User(uuidv4(), data.firstName, data.lastName, data.email,  bcrypt.hashSync(data.password, 10, null));

    const outcome = await this.pool.query(
      'INSERT INTO users( id, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)',
      [ user.id, user.firstName, user.lastName, user.email, user.password]
    );
    return outcome;
  }

  async find(email) {
    const outcome = await this.pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if(outcome.rows.length > 0) {
        const data = outcome.rows[0]
        const user = new User(data.id, data.firstName, data.lastName, data.email, data.password);
        return user;
    }
    return;
  }
}
