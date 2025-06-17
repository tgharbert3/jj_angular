const express = require('express');

const logoutRouter = express.Router();

logoutRouter.post('/', (req, res) => {
    try {
        req.session.destroy(error => {
            if (error) {
                console.error('Logout Error', error);
                return res.status(500).json({ message: "logout failed" });
            } else {
                res.clearCookie('connect.sid', {
                    path: '/',
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                });
                return res.status(200).json({ message: "Logged out successfully" });
            }
        })
    } catch (error) {
        console.error("Error in logging out", error);
        res.status(500).json({ message: "Unexpected logout error" })
    }
});

module.exports = logoutRouter;