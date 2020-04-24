const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get login user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/register
// @desc    Register User
// @access  Public
router.post(
    '/register',
    [
        check('login', 'Login musi zawierać od 4 do 12 znaków')
            .isLength({ min: 4, max: 12 })
            .trim()
            .escape(),
        check('password', 'Hasło musi zawierać od 6 do 16 znaków').isLength({
            min: 6,
            max: 16,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { login, password } = req.body;

        try {
            let userLogin = await User.findOne({ login });

            const errorsTable = [];

            if (userLogin) {
                errorsTable.push({
                    msg: 'Podany login jest zajęty',
                    param: 'login',
                });
            }

            if (errorsTable.length > 0)
                return res.status(400).json({ errors: errorsTable });

            const user = new User({
                login,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('login', 'Wprowadź login!').exists(),
        check('password', 'Wprowadź hasło!').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { login, password } = req.body;

        try {
            let user = await User.findOne({ login });

            if (!user) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: 'Wprowadziłeś nieprawidłowe dane',
                            param: 'other',
                        },
                    ],
                });
            }

            const isMath = await bcrypt.compare(password, user.password);

            if (!isMath) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: 'Wprowadziłeś nieprawidłowe dane',
                            param: 'other',
                        },
                    ],
                });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
