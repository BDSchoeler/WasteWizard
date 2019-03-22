import bcrypt from 'bcrypt';
module.exports = class User {
    constructor(id, firstName, lastName, email, password, adminStatus) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.adminStatus = adminStatus;
    }

    comparePassword(passw) {
        if(bcrypt.compareSync(passw, this.password, null)) {
            console.log('Password is good');
            return true;
        } else {
            console.log('Password does not match');
            return false;
        };
      };
  };
  