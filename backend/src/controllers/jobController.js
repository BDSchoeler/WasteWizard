import { Pool } from 'pg';
import uuidv4 from 'uuid/v4';
import Job from '../models/job';
import Keyword from '../models/keyword';

export default class JobController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  // Get Item by Keyword
  async getJobs(data) {
    const result = await this.pool.query(
      'SELECT * '
      + 'FROM jobs '
      + 'JOIN keywords '
      + 'ON jobs.id = keywords.jobId '
      + 'WHERE keywords.keyword LIKE $1', [data.searchPattern],
    );
    const jobs = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      const data = result.rows[i];
      jobs.push(new Job(
        data.id,
        data.title,
        data.description,
        data.location,
        data.userId,
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
    const jobId = uuidv4();
    const job = new Job(
      jobId,
      data.title,
      data.description,
      data.location,
      data.userId,
      data.jobtype,
      data.jobtitle,
      data.salary,
      data.company,
      data.dateposted,
    );
    return this.pool.query('INSERT INTO jobs (title, description, location, userid, jobtype, jobtitle, salary, company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [job.id,
        job.title,
        job.description,
        job.location,
        job.userId,
        job.jobtype,
        job.jobtitle,
        job.salary,
        job.company,
        job.dateposted]).then( () => {
          const promises = [];
          for( let i=0; i< job.keywords.length; i++) {
            const keyword = new Keyword(uuidv4(), keywords[i], jobId)
            const promise = this.pool.query('INSERT INTO keywords (id, keyword, itemId) VALUES ($1, $2, $3)',
              [id, keyword, itemId]);
            promises.push(promise);
          }
        return Promise.all(promises);
        });
  }
}
