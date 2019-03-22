import express from 'express';
import to from 'await-to-js';
import JobController from '../controllers/jobController';

const router = express.Router();
const controller = new JobController();

/* GET jobs given keywords */
router.get('/', async (req, res) => {
  console.log(req);
  const [err, items] = await to(controller.get());
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
    res.send({ success: true, data: success });
  }
});

module.exports = router;
