import express from 'express';
import session from 'express-session';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import db from'./controllers/db.js';
import store from'./controllers/sessionDB.js';
import userRoutes from './routes/users.js'
import userLogin from './routes/login.js'
import userRegister from './routes/register.js'

const app = express();
env.config();


try { await db
  if (db) {
    console.log("DB connected")
}
} catch (e){
  console.log(e)
}
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/login', userLogin);
app.use('/register', userRegister);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  req.session.isAuth = true
  console.log(req.session);
  console.log(req.session.id)
  res.render('index', {title: "Home"});

})
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})