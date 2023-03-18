import store from '../db/store.js';

export const logoutHandler = async (req, res) => {
    store.destroy(req.sessionID, (err) => {
        if (err) {
            req.session.destroy(() => {
                res.redirect("/");
            });
        }
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
};