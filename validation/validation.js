const requiredFields = ['name', 'price', 'billingCycle', 'renewalDate'];
const allowedFields = requiredFields;

export function validateSubscription(input, allowPartial = false) {
    const errors = [];
    const subscription = input && typeof input === 'object' && !Array.isArray(input)
        ? input
        : null;

    if (!subscription) {
        return ['Request body must be an object'];
    }

    for (const field of Object.keys(subscription)) {
        if (!allowedFields.includes(field)) {
            errors.push(`${field} is not allowed`);
        }
    }

    if (allowPartial && !requiredFields.some(field => subscription[field] !== undefined)) {
        errors.push('Provide at least one field to update');
    }

    if (!allowPartial) {
        for (const field of requiredFields) {
            if (subscription[field] === undefined || subscription[field] === null) {
                errors.push(`${field} is required`);
            }
        }
    }

    if (subscription.name !== undefined &&
        (typeof subscription.name !== 'string' || !subscription.name.trim())) {
        errors.push('name must be a non-empty string');
    }

    if (subscription.price !== undefined &&
        (typeof subscription.price !== 'number' || !Number.isFinite(subscription.price) || subscription.price <= 0)) {
        errors.push('price must be a positive number');
    }

    if (subscription.billingCycle !== undefined &&
        (typeof subscription.billingCycle !== 'string' || !subscription.billingCycle.trim())) {
        errors.push('billingCycle must be a non-empty string');
    }

    if (subscription.renewalDate !== undefined &&
        (typeof subscription.renewalDate !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(subscription.renewalDate) ||
            Number.isNaN(Date.parse(subscription.renewalDate)) ||
            new Date(subscription.renewalDate).toISOString().slice(0, 10) !== subscription.renewalDate)) {
        errors.push('renewalDate must be a valid YYYY-MM-DD date');
    }

    return errors;
}

