import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'
import userLogin from './routes/login.js'
import userRegister from './routes/register.js'

const app = express();
env.config();
const uri = process.env.DB_URL;

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: true, 
  useCreateIndex: true, })
  .then(()=> {
    console.log("Connected to DB")
  }).catch((error)=> {console.log(error);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/login', userLogin);
app.use('/register', userRegister);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {title: "Home"});

})
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})