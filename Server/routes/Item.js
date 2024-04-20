const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const ItemModel = require('../models/Item');

router.get('/message', (req, res) => {
    res.send('Hello from the server! , this is the item route');
});


router.get('/', async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.status(200).json({items:items});
    } catch (err) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          // It's not a valid ObjectId, return a 400 response
          return res.status(400).send('Invalid ID format');
        }
        const item = await ItemsModel.findOne({ _id: id });
        if (!item) {
          // No item found with the given ID, return a 404 response
          return res.status(404).send('Item not found');
        }
        res.json({ item:item });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});


