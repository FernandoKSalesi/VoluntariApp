import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { EventController } from '../controllers/EventController';
import { SubscriptionController } from '../controllers/SubscriptionController';
import { NotificationController } from '../controllers/NotificationController';
import { EventRatingController } from '../controllers/EventRatingController';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const routes = Router();
const userController = new UserController();
const eventController = new EventController();
const subscriptionController = new SubscriptionController();
const notificationController = new NotificationController();
const eventRatingController = new EventRatingController();
const categoryController = new CategoryController();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl: { type: string }
 */
routes.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

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
 * /categories:
 *   get:
 *     summary: List all available categories
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Category' }
 */
routes.get('/categories', (req, res) => categoryController.list(req, res));

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
 * /users/me/subscriptions:
 *   get:
 *     summary: Get current user subscriptions
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user subscriptions
 *       401:
 *         description: Unauthorized
 */
routes.get('/users/me/subscriptions', authMiddleware, (req, res) => userController.getSubscriptions(req, res));

/**
 * @swagger
 * /users/me/organized-events:
 *   get:
 *     summary: Get current user organized events
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of organized events
 *       401:
 *         description: Unauthorized
 */
routes.get('/users/me/organized-events', authMiddleware, (req, res) => eventController.getOrganized(req, res));

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

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDTO'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized
 */
routes.put('/events/:id', authMiddleware, (req, res) => eventController.update(req, res));

// Subscription routes

/**
 * @swagger
 * /events/{eventId}/subscribe:
 *   post:
 *     summary: Subscribe to an event
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       400:
 *         description: Bad request (e.g. event full, already subscribed)
 *       401:
 *         description: Unauthorized
 */
routes.post('/events/:eventId/subscribe', authMiddleware, (req, res) => subscriptionController.subscribe(req, res));

/**
 * @swagger
 * /events/{eventId}/subscription:
 *   delete:
 *     summary: Unsubscribe from an event
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Unsubscribed successfully
 *       401:
 *         description: Unauthorized
 */
routes.delete('/events/:eventId/subscription', authMiddleware, (req, res) => subscriptionController.unsubscribe(req, res));

/**
 * @swagger
 * /events/{eventId}/check-subscription:
 *   get:
 *     summary: Check if current user is subscribed to an event
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Subscription status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSubscribed: { type: boolean }
 *       401:
 *         description: Unauthorized
 */
routes.get('/events/:eventId/check-subscription', authMiddleware, (req, res) => subscriptionController.check(req, res));

/**
 * @swagger
 * /events/{eventId}/subscriptions:
 *   get:
 *     summary: Get participants of an event
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of participants
 *       401:
 *         description: Unauthorized
 */
routes.get('/events/:eventId/subscriptions', authMiddleware, (req, res) => subscriptionController.getEventParticipants(req, res));

// Notification routes

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get current user notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *       401:
 *         description: Unauthorized
 */
routes.get('/notifications', authMiddleware, (req, res) => notificationController.getUserNotifications(req, res));

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 */
routes.put('/notifications/:id/read', authMiddleware, (req, res) => notificationController.markAsRead(req, res));

/**
 * @swagger
 * /notifications/read-all:
 *   put:
 *     summary: Mark all user notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */
routes.put('/notifications/read-all', authMiddleware, (req, res) => notificationController.markAllAsRead(req, res));

/**
 * @swagger
 * /events/{eventId}/messages:
 *   post:
 *     summary: Send a message to all event subscribers (Organizer only)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string }
 *     responses:
 *       200:
 *         description: Messages sent successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request or user is not the organizer
 */
routes.post('/events/:eventId/messages', authMiddleware, (req, res) => notificationController.sendEventMessage(req, res));

// Event Rating routes

/**
 * @swagger
 * /events/{id}/ratings:
 *   post:
 *     summary: Rate an event
 *     tags: [Event Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating: { type: integer, minimum: 1, maximum: 5 }
 *               comment: { type: string }
 *     responses:
 *       201:
 *         description: Event rated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
routes.post('/events/:id/ratings', authMiddleware, (req, res) => eventRatingController.rateEvent(req, res));

/**
 * @swagger
 * /events/{id}/ratings:
 *   get:
 *     summary: Get event ratings (Organizer only)
 *     tags: [Event Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Event ratings statistics and comments
 *       400:
 *         description: Bad request or user is not the organizer
 *       401:
 *         description: Unauthorized
 */
routes.get('/events/:id/ratings', authMiddleware, (req, res) => eventRatingController.getEventRatings(req, res));

export default routes;
