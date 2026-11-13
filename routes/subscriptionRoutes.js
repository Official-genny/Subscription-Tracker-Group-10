
import express from 'express';

import {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscriptionController,
    updateSubscriptionController,
    deleteSubscriptionController
} from '../controllers/subscriptionController.js';

const router = express.Router();

// GET all subscriptions
router.get('/', getAllSubscriptions);

// GET subscription by ID
router.get('/:id', getSubscriptionById);

// POST - Create subscription
router.post('/', createSubscriptionController);

// PUT - Update subscription
router.put('/:id', updateSubscriptionController);

// DELETE - Delete subscription
router.delete('/:id', deleteSubscriptionController);

export default router;
