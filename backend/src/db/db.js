const  mongoose = require('mongoose')

function connectToDb() {
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Server successfully connected to Db")
})
.catch((err)=>{
    console.log("Error connecting  to MongoDb : ",err)
})
}

module.exports = connectToDb