require('dotenv').config()
const app  = require('./src/app')
const connectToDb = require('./src/db/db')

connectToDb()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));