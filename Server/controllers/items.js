const Items = require('../models/Item')
const mysql = require('mysql2')
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ssai@12345',
  database: 'auctionDB'
});

conn.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database: ', err);
      query = " Create table Transactions ("
      return;
  }
  console.log('Connected to MySQL database!');
});

const getItems = async (req, res) => {
    try {
        const items = await Items.find()
        // console.log(items)
        res.status(200).json({items:items})
        responseList = []
        for (var item in Items){
            if (item.isLive) {
                responseList.push(item)
            }
        }
        //res.status(200).json({items:responseList})
        // res.json({items:items});
    } catch(error) {
        console.log(error)
        res.status(501).json({msg : "Internal Server Error"})
    }
}

const getItem = async (req,res)=>{
    try {
        const id = req.params.id;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          // It's not a valid ObjectId, return a 400 response
          return res.status(400).send('Invalid ID format');
        }

        const item = await Items.findOne({ _id: id });
        if (!item) {
          // No item found with the given ID, return a 404 response
          return res.status(404).send('Item not found');
        }
        res.status(200).json({ item: item });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

//! When a transaction happens
const itemTimeout = async (req,res)=>{
  const item_id=req.params.id
  const user_id=req.userId
  const sql = `INSERT INTO transactions (buyer_id,seller_id,item_id,price,date) VALUES (?,?,?,?,?)`;
  const item = await Items.findOne({_id:item_id})
  const seller_id=item.seller;
  const buyer_id=user_id;
  item.isLive = false;
  if( item.seller == user_id ) {
    // query to save in differnet table called usold
    const unsoldQuery = 'INSERT INTO unsold (seller_id,item_id,auctionDate) VALUES (?,?,?)';
    conn.query(unsoldQuery,[user_id,item_id,item.auctionEndTime],(error,results)=>{
      if(error){
        console.log(error);
      }
      else {
      res.status(200).send('Data inserted successfully');
      }
    })
  }
  else {
    // item.seller = user_id;
    await item.save();
    // Execute the query

    conn.query(sql, [buyer_id,seller_id,item_id,item.currentPrice,item.auctionEndTime],(error, results) => {
        if (error) {
        console.error(error);
        res.status(500).send('Error inserting data into the transaction table');
        } else {
        res.status(200).send('Data inserted successfully');
        }
    });
            // res.status(200).send('Data inserted successfully');

  }
}


const addItem =  async (req, res) => {
    const { name, description, startingPrice, auctionStartTime, auctionEndTime } = req.body;
    const images = req.files.map(file => file.filename);
    // console.log(images);
    const item = new Items({
      name: name,
      description: description,
      images: images,
      startingPrice: startingPrice,
      currentPrice: startingPrice,
      auctionStartTime: auctionStartTime,
      auctionEndTime: auctionEndTime,
      seller: req.userId,
    });
    try {
      await item.save();
      console.log("done")
      const temp = Items.find({name: name})
      // console.log(temp)
      res.status(200).send('Item added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, images, startingPrice, currentPrice, auctionStartTime, auctionEndTime, seller} = req.body
    try {
        const item = await Items.findByIdAndUpdate ( id, {name, description, images, startingPrice, currentPrice, auctionStartTime, auctionEndTime, seller}, {new : true})

        if (!item) {
            res.status(404).json({ message: 'Item not found' });
          } else {
            res.status(200).json({ message: 'Item updated successfully', item });
          }
    } catch {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const changeItem = async (req, res) => {
    const { id } = req.params;
    const { isLive } = req.body;
    console.log("Hello")
    try {
      const item = await Items.findByIdAndUpdate(id, { isLive }, { new: true });
  
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json({ message: 'Item updated successfully', item });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
const deleteAll = async (req, res) => {
    try {
      await Items.deleteMany({});
      res.status(200).send('All items deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
      const item = await Items.findByIdAndDelete(id);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json({ message: 'Item deleted successfully', item });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const search = async (req, res) => {
    const itemName = req.query.name;
    console.log(itemName);
    const item = await Items.find({ name: itemName });
    res.json(item[0]);
}
module.exports = { getItem, getItems, addItem, itemTimeout, updateItem, changeItem, deleteItem, search ,deleteAll}