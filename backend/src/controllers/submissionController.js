import { Pool } from 'pg';
import uuidv4 from 'uuid/v4';
import Submission from '../models/submission';

export default class ItemController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  async create(data) {
    const sub = new Submission(uuidv4(), data.firstName, data.lastName, data.email, data.phoneNumber, data.userId, data.jobId, uuidv4(), data.dateCreated);

    const outcome = await this.pool.query(
      'INSERT INTO submission(id, firstName, lastName, email, phoneNumber, userId, jobId, cv) VALUES ($1, $2, $3, $4, $5)',
      [sub.id, sub.firstName, sub.lastName, sub.email, sub.phoneNumber, sub.userId, sub.jobId, sub.cv]
    );
    return outcome;
  }

  async getByUser(userId) {
    const outcome = await this.pool.query(
      'SELECT * FROM submission WHERE userId=$1',
      [userId]
    );
    const subs = [];
    for (let i = 0; i < result.rows.length; i += 1) {
        const data = outcome.rows[i]
        const sub = new Submission(data.id, data.firstName, data.lastName, data.email, data.phoneNumber, data.userId, data.jobId, data.cv, data.dateCreated);
        subs.push(sub);
    }
    return sub;
  }

  async getByJob(jobId) {
    const outcome = await this.pool.query(
      'SELECT * FROM submission WHERE jobId=$1',
      [jobId]
    );
    const subs = [];
    for (let i = 0; i < result.rows.length; i += 1) {
        const data = outcome.rows[i]
        const sub = new Submission(data.id, data.firstName, data.lastName, data.email, data.phoneNumber, data.userId, data.jobId, data.cv, data.dateCreated);
        subs.push(sub);
    }
    return sub;
  }
}
