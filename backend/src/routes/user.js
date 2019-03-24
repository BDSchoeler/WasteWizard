import express from 'express';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/userController';

const router = express.Router();
const controller = new UserController();

router.post('/register', (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Please pass username and password.', success: false });
  } else {
    controller
      .create(req.body)
      .then(() => res.status(201).send({
        success: true,
      }))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
});

router.post('/login', (req, res) => {
  return controller
    .find(req.body.email)
    .then((user) => {
      if (!user) {
        res.status(400).send({
          success: false,
          message: 'Email or password are incorrect.',
        });
      } else if (user.comparePassword(req.body.password)) {
        const token = jwt.sign({ id: user.id }, 'nodeauthsecret', { expiresIn: 864000 * 30 });
        res.send({ success: true, token, user });
      } else {
        res.status(400).send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

router.put('/', (req, res) => {
  return controller
    .update(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

router.delete('/', (req, res) => {
  return controller
    .delete(req.body.email)
    .then(() => {
      res.send(200);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

module.exports = router;
