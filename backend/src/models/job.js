module.exports = class Job {
  constructor(id,
    title,
    description,
    location,
    userId,
    jobtype,
    jobtitle,
    salary,
    company,
    dateposted) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.userId = userId;
    this.jobtype = jobtype;
    this.jobtitle = jobtitle;
    this.salary = salary;
    this.company = company;
    this.dateposted = dateposted;
  }
};
