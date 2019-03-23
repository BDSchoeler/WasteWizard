import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwNTg4NjhmLTRlOTYtNDU1NC1hOTVmLTUyM2IzMGFkMWM4NSIsImlhdCI6MTU1MzM3OTE4MCwiZXhwIjoxNTc5Mjk5MTgwfQ.e6zgxs9W5IQZipqRYK5LqyJh7bJLDdx9xp4NYilJYiA'
  // }
});

// baseURL: baseurl,
// transformRequest: [function (data, headers) {
//   headers['Authorization'] = auth()
//   return JSON.stringify(data)
// }],
// headers: {
//   'Content-Type': 'application/json'
// }
// })

export default instance;