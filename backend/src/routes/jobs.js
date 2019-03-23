import express from 'express';
import to from 'await-to-js';
import JobController from '../controllers/jobController';

const router = express.Router();
const controller = new JobController();

/* GET jobs given keywords */
router.get('/', async (req, res) => {
  console.log(req.query);
  const [err, items] = await to(controller.get(req.query.searchPattern));
  if (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  } else {
    res.send({ success: true, data: items });
  }
});

/* create jobs favourite status */
router.post('/', async (req, res) => {
  req.body.user = req.user;
  if (!req.body.keywords) {
    req.body.keywords = [];
  }
  const [err, success] = await to(controller.create(req.body));
  if (err) {
    res.status(err.status || '500');
    res.send({ error: err.message });
  } else {
    res.send({ success: true, data: success });
  }
});

module.exports = router;
