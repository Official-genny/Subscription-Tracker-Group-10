
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

const FILE_PATH = new URL('../data/subscriptions.json', import.meta.url);


// GET all subscriptions
export const getSubscriptions = async () => {
    const data = await readFile(FILE_PATH, 'utf-8');

    return JSON.parse(data);
};


// CREATE a new subscription
export const createSubscription = async (subscriptionData) => {
    const subscriptions = await getSubscriptions();
    const now = new Date().toISOString();

    const newSubscription = {
        ...subscriptionData,
        id: `sub_${randomUUID()}`,
        createdAt: now,
        updatedAt: now
    };

    subscriptions.push(newSubscription);

    await writeFile(
        FILE_PATH,
        JSON.stringify(subscriptions, null, 2)
    );

    return newSubscription;
};


// UPDATE an existing subscription
export const updateSubscription = async (id, updatedData) => {
    const subscriptions = await getSubscriptions();

    const subscriptionIndex = subscriptions.findIndex(
        item => item.id === id
    );

    if (subscriptionIndex === -1) {
        return null;
    }

    subscriptions[subscriptionIndex] = {
        ...subscriptions[subscriptionIndex],
        ...updatedData,
        id,
        updatedAt: new Date().toISOString()
    };

    await writeFile(
        FILE_PATH,
        JSON.stringify(subscriptions, null, 2)
    );

    return subscriptions[subscriptionIndex];
};


// DELETE an existing subscription
export const deleteSubscription = async (id) => {
    const subscriptions = await getSubscriptions();

    const subscriptionIndex = subscriptions.findIndex(
        item => item.id === id
    );

    if (subscriptionIndex === -1) {
        return null;
    }

    const deletedSubscription = subscriptions.splice(subscriptionIndex, 1);

    await writeFile(
        FILE_PATH,
        JSON.stringify(subscriptions, null, 2)
    );

    return deletedSubscription[0];
};
