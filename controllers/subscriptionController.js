
import {
    getSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription
} from '../services/subscriptionService.js';

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
        const { name, price } = req.body;

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Subscription name is required'
            });
        }

        if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'A valid price is required'
            });
        }

        const subscription = await createSubscription({
            name: name.trim(),
            price
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
        const { name, price } = req.body;

        if (name === undefined && price === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Provide at least one field to update'
            });
        }

        if (name !== undefined &&
            (typeof name !== 'string' || !name.trim())) {
            return res.status(400).json({
                success: false,
                message: 'A valid subscription name is required'
            });
        }

        if (price !== undefined &&
            (typeof price !== 'number' || !Number.isFinite(price) || price <= 0)) {
            return res.status(400).json({
                success: false,
                message: 'A valid price is required'
            });
        }

        const updatedData = {};

        if (name !== undefined) {
            updatedData.name = name.trim();
        }

        if (price !== undefined) {
            updatedData.price = price;
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
