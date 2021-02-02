import env from 'dotenv';
import mongoose from 'mongoose';

env.config();
const uri = process.env.DB_URL;

const db = mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: true, 
  useCreateIndex: true, })
//   .then(()=> {
//     console.log("Connected to DB")
//   }).catch((error)=> {console.log(error);
//   });
export default db;