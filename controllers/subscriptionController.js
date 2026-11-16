
import {
    getSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription
} from '../services/subscriptionService.js';
import { validateSubscription } from '../validation/validation.js';

const sendValidationError = (res, errors) => {
    return res.status(400).json({
        success: false,
        message: 'Invalid subscription data',
        errors
    });
};

// Handle unexpected server errors
const handleServerError = (res, error) => {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

// GET all subscriptions
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await getSubscriptions();

        res.status(200).json({
            success: true,
            message: 'All subscriptions retrieved successfully',
            data: subscriptions
        });
    } catch (error) {
        handleServerError(res, error);
    }
};

// GET subscription by ID
export const getSubscriptionById = async (req, res) => {
    try {
        const { id } = req.params;

        const subscriptions = await getSubscriptions();

        const subscription = subscriptions.find(
            item => item.id === id
        );

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription retrieved successfully',
            data: subscription
        });
    } catch (error) {
        handleServerError(res, error);
    }
};

// POST - Create a new subscription
export const createSubscriptionController = async (req, res) => {
    try {
        const errors = validateSubscription(req.body);

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const subscription = await createSubscription({
            name: req.body.name.trim(),
            price: req.body.price,
            billingCycle: req.body.billingCycle.trim(),
            renewalDate: req.body.renewalDate.trim()
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        });
    } catch (error) {
        handleServerError(res, error);
    }
};

// PUT - Update an existing subscription
export const updateSubscriptionController = async (req, res) => {
    try {
        const { id } = req.params;
        const errors = validateSubscription(req.body, true);

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const updatedData = {};

        if (req.body.name !== undefined) {
            updatedData.name = req.body.name.trim();
        }

        if (req.body.price !== undefined) {
            updatedData.price = req.body.price;
        }

        if (req.body.billingCycle !== undefined) {
            updatedData.billingCycle = req.body.billingCycle.trim();
        }

        if (req.body.renewalDate !== undefined) {
            updatedData.renewalDate = req.body.renewalDate.trim();
        }

        const updatedSubscription = await updateSubscription(id, updatedData);

        if (!updatedSubscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: updatedSubscription
        });
    } catch (error) {
        handleServerError(res, error);
    }
};

// DELETE - Remove an existing subscription
export const deleteSubscriptionController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSubscription = await deleteSubscription(id);

        if (!deletedSubscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully',
            data: deletedSubscription
        });
    } catch (error) {
        handleServerError(res, error);
    }
};
