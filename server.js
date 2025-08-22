require('dotenv').config()
const app = require('./src/app.js')
const connectDb = require('./src/db/db')

connectDb()


app.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
});