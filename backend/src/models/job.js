module.exports = class Job {
  constructor(id,
    title,
    description,
    location,
    user,
    jobtype,
    jobtitle,
    salary,
    company,
    dateposted) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.user = user;
    this.jobtype = jobtype;
    this.jobtitle = jobtitle;
    this.salary = salary;
    this.company = company;
    this.dateposted = dateposted;
  }
};
