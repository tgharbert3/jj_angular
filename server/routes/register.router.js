const express = require('express');
const { body, validationResult } = require('express-validator');

const { insertNewUserController } = require('../controllers/register.controller');

const registerRouter = express.Router();

/**
 * Post route for Registering a new user. Validated and sanitizes input.
 */
registerRouter.post('/', [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .trim()
        .escape()
        .isLength({ min: 2, max: 50 }).withMessage("First name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z' -]+$/u)//regex for lowercase and uppercase a-z, allows hypens and apostrophes
        .withMessage("Last name can only be letters, spaces, hyphens, and apstophies."),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .trim()
        .escape()
        .isLength({ min: 2, max: 50 }).withMessage("Last name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z' -]+$/u) //regex for lowercase and uppercase a-z, allows hypens and apostrophes
        .withMessage("Last name can only be letters, spaces, hyphens, and apstophies."),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail()
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Password must include upper/lowercase, letter, number, and symbols'),

    body('verify_password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords must match");
            }
            return true; //Must return true or validator will return undefined.
        })


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newUser = await insertNewUserController(req.body.firstName, req.body.lastName, email = req.body.email, req.body.password);
    res.status(200).json({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
    });
})


module.exports = registerRouter;