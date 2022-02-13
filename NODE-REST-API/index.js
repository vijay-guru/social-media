const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const usersRoute=require('./routes/users')
const authRoute= require('./routes/auth')
const postsRoute= require('./routes/posts')
const messageRoute= require('./routes/message')
const conversationRoute= require('./routes/conversation')
const uploadRoute= require('./routes/uploadRoute')
const path = require('path');
const port=5000;
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
try {
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }).then(()=>{
          console.log("mogo db connected");
      })
} catch (error) {
    console.log(error);
}
 
app.use('/images',express.static(path.join(__dirname,"public/images")))

app.use(express.json())
app.use(helmet());
app.use(morgan("common"))

app.use("/api/upload",uploadRoute)

app.use('/api/users',usersRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postsRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)

app.listen(port,() =>{
    console.log("Backend program is running");
})