import express from 'express'

const logoutRouter = express.Router();

logoutRouter.post('/', (req, res) => {
    try {
        res.clearCookie('accessToken', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logging out", error);
        res.status(500).json({ message: "Unexpected logout error" })
    }
});

export default logoutRouter;