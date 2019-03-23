import { Pool } from 'pg';
import uuidv4 from 'uuid/v4';
import Job from '../models/job';
import Keyword from '../models/keyword';

export default class JobController {
  constructor(pool) {
    this.pool = pool || new Pool();
  }

  // Get Item by Keyword
  async get(searchPattern) {
    let result;
    if (searchPattern) {
      result = await this.pool.query(
        'SELECT * '
        + 'FROM jobs '
        + 'JOIN keywords '
        + 'ON jobs.id = keywords.jobId '
        + 'WHERE keywords.keyword LIKE $1', [searchPattern],
      );
    } else {
      result = await this.pool.query(
        'SELECT * FROM jobs',
      );
    }
    const jobs = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      const data = result.rows[i];
      jobs.push(new Job(
        data.id,
        data.title,
        data.description,
        data.location,
        data.userid,
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
  async create(data) {
    const jobId = uuidv4();
    const job = new Job(
      jobId,
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

    return this.pool.query('INSERT INTO jobs (id, title, description, location, userid, jobtype, jobtitle, salary, company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [job.id,
        job.title,
        job.description,
        job.location,
        job.userId,
        job.jobtype,
        job.jobtitle,
        job.salary,
        job.company])
      .then(() => {
        const promises = [];
        for (let i = 0; i < data.keywords.length; i += 1) {
          const keyword = new Keyword(uuidv4(), data.keywords[i], jobId);
          const promise = this.pool.query('INSERT INTO keywords (id, keyword, jobId) VALUES ($1, $2, $3)',
            [keyword.id, keyword.keyword, keyword.jobId]);
          promises.push(promise);
        }
        return Promise.all(promises);
      });
  }
}
