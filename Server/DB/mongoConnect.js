const mongoose = require('mongoose')

const mongoConnect = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
}

module.exports = mongoConnect