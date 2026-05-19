import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { EventController } from '../controllers/EventController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();
const userController = new UserController();
const eventController = new EventController();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
routes.post('/users', (req, res) => userController.create(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user: { $ref: '#/components/schemas/User' }
 *                 token: { type: string }
 *       401:
 *         description: Unauthorized
 */
routes.post('/auth/login', (req, res) => userController.login(req, res));

/**
 * @swagger
 * /events:
 *   get:
 *     summary: List events with filters
 *     tags: [Events]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Search query
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *       - in: query
 *         name: categories
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Event' }
 */
routes.get('/events', (req, res) => eventController.list(req, res));

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event details
 *     tags: [Events]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Event' }
 *       404:
 *         description: Event not found
 */
routes.get('/events/:id', (req, res) => eventController.show(req, res));

// Protected routes

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDTO'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 */
routes.put('/users', authMiddleware, (req, res) => userController.update(req, res));

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Unauthorized
 */
routes.get('/users/me', authMiddleware, (req, res) => userController.getMe(req, res));

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized
 */
routes.post('/events', authMiddleware, (req, res) => eventController.create(req, res));

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 */
routes.delete('/events/:id', authMiddleware, (req, res) => eventController.delete(req, res));

export default routes;
