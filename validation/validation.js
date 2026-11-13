const requiredFields = ['name', 'email', 'subscriptionDate', 'subscriptionDuration']
    
// Validate the subscription object
export function validateSubscription(input, requiredFields) {
    const errors = [];
    const subscription = input && typeof input === 'object' ? input : {};


    for (const field of requiredFields) {
        if (!input[field]) {
            errors.push(`Field '${field}' is required.`);
        }
    }

    // Validate each field if it exists
    if (subscription.name !== undefined && (typeof subscription.name !== 'string' || !subscription.name.trim())) {
    errors.push('name must be a non-empty string');
    }
    
    if (subscription.email !== undefined && (typeof subscription.email !== 'string' || !/^\S+@\S+\.\S+$/.test(subscription.email))) {
    errors.push('email must be a valid email address');
    }

    if (subscription.subscriptionDate !== undefined && (typeof subscription.subscriptionDate !== 'string' || Number.isNaN(Date.parse(subscription.subscriptionDate)))) {
    errors.push('subscriptionDate must be a valid date string');
    }

    if (subscription.subscriptionDuration !== undefined && (typeof subscription.subscriptionDuration !== 'string' || !/^\d+$/i.test(subscription.subscriptionDuration))) {
    errors.push('subscriptionDuration must be a positive integer');
    }
    
    return errors;
}

