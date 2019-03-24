import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import User from '../models/user';

export default class UserController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  // Get Item by Keyword
  async create(data) {
    const user = new User(uuidv4(), data.firstName, data.lastName, data.email,
      bcrypt.hashSync(data.password, 10, null), data.adminStatus, data.address, data.skills);

    const outcome = await this.pool.query(
      'INSERT INTO users( id, firstname, lastname, email, password, adminStatus, address, skills ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [user.id, user.firstName, user.lastName, user.email, user.password, user.adminStatus, user.address, user.skills],
    );
    return outcome;
  }

  async find(email) {
    const outcome = await this.pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
    );
    if (outcome.rows.length > 0) {
      const data = outcome.rows[0];
      const user = new User(data.id, data.firstname, data.lastname, data.email,
        data.password, data.adminstatus);
      return user;
    }
    return undefined;
  }

  async delete(email) {
    const outcome = await this.pool.query(
      'DELETE FROM users WHERE email=$1',
      [email],
    );
    return outcome;
  }

  async update(user) {
    const outcome = await this.pool.query(
      'UPDATE users SET firstname=$2, lastname=$3, email=$4, adminStatus=$5, address=$6, skills=$7 WHERE id=$1;',
      [user.id, user.firstName, user.lastName, user.email, user.adminStatus, user.address, user.skills],
    );
    return outcome;
  }
}
