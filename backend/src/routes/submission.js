import express from 'express';
import to from 'await-to-js';
import SubmissionController from '../controllers/submissionController';

const router = express.Router();
const controller = new SubmissionController();

/* GET jobs given keywords */
router.get('/user/:userid', async (req, res) => {
  const [err, items] = await to(controller.getByUser(req.params.userid));
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
  const [err, success] = await to(controller.create(req.body.data));
  if (err) {
    res.status(err.status);
    res.send({ error: err.message });
  } else {
    res.send({ data: { success: true, data: success } });
  }
});

module.exports = router;
