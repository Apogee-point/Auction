const express = require('express')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage });

const router = express.Router();

const{getItems, getItem,deleteItem ,addItem, itemTimeout, changeItem, updateItem} = require('../controllers/items');

router.route('/').get(getItems);
router.route('/:id').get(getItem);
router.route('/:id').put(changeItem);
router.route('/add').post(upload.array('images'), addItem);
router.route('/:id/timeout').post(itemTimeout)
router.route('/update/:id').put(updateItem)
router.route('/delete/:id').delete(deleteItem)
module.exports = router;



