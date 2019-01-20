import express from 'express';
import to from 'await-to-js';
import ItemController from '../controllers/itemController';

const router = express.Router();
const controller = new ItemController();

/* GET items given keywords */
router.get('/keyword/:keywords', async (req, res) => {
  const [err, items] = await to(controller.getItems(req.params.keywords));
  if (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  } else {
    res.send({ data: items });
  }
});

/* GET favourited items */
router.get('/favourites', async (req, res) => {
  let [err, items] = await to(controller.getFavourites());
  if (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  } else {
    res.send({ data: items });
  }
});

/* PUT item favourite status */
router.put('/:id', async (req, res) => {
  const [err, success] = await to(controller.updateItem(req.params.id, req.body.data));
  if (err) {
    res.status(err.status);
    res.send({ error: err.message });
  } else {
    res.send({ data: { success: true } });
  }
});

module.exports = router;
