module.exports = class Submission {
    constructor(id, firstName, lastName, email, phoneNumber, userId, jobId, cv, dateCreated) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.userId = userId;
      this.jobId = jobId;
      this.cv = cv;
      this.dateCreated = dateCreated;
    }
  };
  