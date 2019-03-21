import express from 'express';
import to from 'await-to-js';
import jwt from 'jsonwebtoken';
import UserController from '../controllers/userController';

const router = express.Router();
const controller = new UserController();

router.post('/register', function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      res.status(400).send({msg: 'Please pass username and password.'})
    } else {
      controller
        .create(req.body)
        .then((user) => res.status(201).send({
            success:true
        }))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  });

  router.post('/login', function(req, res) {
    return controller
        .find(req.body.email)
        .then((user) => {
          if (!user) {
            return res.status(401).send({
              message: 'Authentication failed. User not found.',
            });
          }
         if( user.comparePassword(req.body.password) ) {
                const token = jwt.sign({id: user.id}, 'nodeauthsecret', { expiresIn: 864000 * 30});
                jwt.verify(token, 'nodeauthsecret', function(err, data){
                    console.log(err, data);
                })
                res.json({success: true, token: token});
            } else {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        })
        .catch((error) =>{ 
            console.log(error);
            res.status(400).send(error)
        });
  });

module.exports = router;
