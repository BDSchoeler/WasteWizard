import { Pool } from 'pg';
import Job from '../models/job';

export default class ItemController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  // Get Item by Keyword
  async getJobs() {
    const result = await this.pool.query(
      'SELECT * FROM jobs ORDER BY dateposted',
    );
    const jobs = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      const data = result.rows[i];
      jobs.push(new Job(
        data.id,
        data.title,
        data.description,
        data.location,
        data.user,
        data.jobtype,
        data.jobtitle,
        data.salary,
        data.company,
        data.dateposted,
      ));
    }
    return jobs;
  }

  // Update Item Favourite Status
  async createJob(data) {
    const job = new Job(
      data.id,
      data.title,
      data.description,
      data.location,
      data.user,
      data.jobtype,
      data.jobtitle,
      data.salary,
      data.company,
      data.dateposted,
    );
    return this.pool.query('INSERT INTO jobs (title, description, location, user, jobtype, jobtitle, salary, company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [job.id,
        job.title,
        job.description,
        job.location,
        job.user,
        job.jobtype,
        job.jobtitle,
        job.salary,
        job.company,
        job.dateposted]);
  }
}
