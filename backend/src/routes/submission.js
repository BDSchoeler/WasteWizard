import express from 'express';
import to from 'await-to-js';
import fs from 'fs';
import SubmissionController from '../controllers/submissionController';

const router = express.Router();
const controller = new SubmissionController();

/* GET jobs given keywords */
router.get('/user', async (req, res) => {
  const [err, items] = await to(controller.getByUser(req.user));
  if (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  } else {
    res.send({ success: true, data: items });
  }
});

/* GET jobs given keywords */
router.get('/job/:jobid', async (req, res) => {
  const [err, items] = await to(controller.getByJob(req.params.jobid));
  if (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  } else {
    res.send({ success: true, data: items });
  }
});

/* create jobs favourite status */
router.post('/', async (req, res) => {
  req.body.userId = req.user;
  const [err, success] = await to(controller.create(req.body));
  if (err) {
    res.status(err.status || '500');
    res.send({ error: err.message });
  } else {
    res.send({ data: { success: true, data: success } });
  }
});

/* create jobs favourite status */
router.post('/upload/:id', async (req, res) => {
  console.log('here');
  console.log();

  fs.writeFile('./uploads/' + req.params.id + req.files.cv.name, req.files.cv.data, 'binary', (err) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  });
});

module.exports = router;
