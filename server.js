import subscriptionRoutes from './routes/subscriptionRoutes.js';
import express from 'express';

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Subscription Tracker API'
    });
});
app.use('/api/v1/subscriptions', subscriptionRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});