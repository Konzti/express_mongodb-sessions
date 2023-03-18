import userRoutes from './users.js';
import userLogin from './login.js';
import userRegister from './register.js';
import dashboardRouter from './dashboard.js';
import logoutRouter from './logout.js';
import apiRouter from './api.js';

export const setUpRoutes = (app) => {
    app.use('/users', userRoutes);
    app.use('/login', userLogin);
    app.use('/register', userRegister);
    app.use("/dashboard", dashboardRouter);
    app.use("/logout", logoutRouter);
    app.use('/api', apiRouter);
    app.set('view engine', 'ejs');


    app.get('/', (req, res) => {
        if (req.session.user) {
            return res.render('index', { title: "Home", user: req.session.user });
        }
        return res.render('index', { title: "Home" });

    });

    app.get('/error', (req, res) => {
        res.render('error', { title: "Something went wrong" });
    });
};