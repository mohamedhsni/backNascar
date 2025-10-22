const express = require('express');
const User = require('../models/User');
const { faker } = require('@faker-js/faker');
const { default: UserResponse } = require('../response types/UserResponse');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *     UserResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/User'
 *         message:
 *           type: string
 *         error:
 *           type: boolean
 */

/**
 * @swagger
 * /api/users/random:
 *   get:
 *     summary: Create a random user
 *     description: Creates a new user with random email and password
 *     tags:
 *       - Users
 *     responses:
 *       201:
 *         description: Random user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request
 */
router.get('/random', async (req, res) => {
    const randomUser = new User({
        email: faker.internet.email(),
        password: faker.internet.password()
    });

    try {
        await randomUser.save();
        res.status(201).json(new UserResponse(randomUser, 'Random user created successfully', false));
    } catch (err) {
        res.status(400).json(new UserResponse(null, err.message, true));
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with email and password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json(new UserResponse(null, 'User not found', true));
        }

        // Check if the password matches
        if (user.password !== password)
            return res.status(401).json(new UserResponse(null, 'Invalid password', true));

        return res.status(200).json(new UserResponse(user, 'Login successful', false));

    } catch (err) {
        res.status(500).json(new UserResponse(null, err.message, true));
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(new UserResponse(null, 'User not found', true));
        }
        res.status(200).json(new UserResponse(user, 'User found successfully', false));
    } catch (err) {
        res.status(500).json(new UserResponse(null, err.message, true));
    }
});


module.exports = router;
