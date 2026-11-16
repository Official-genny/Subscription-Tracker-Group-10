# Subscription Tracker API

A simple Express API for storing and managing subscriptions in a JSON file.

## Requirements

- Node.js
- npm

## Run the API

From the project folder, install the packages and start the server:

```bash
npm ci
npm run dev
```

The server runs at `http://localhost:3000`.

## Subscription fields

Each subscription has this shape:

```json
{
  "id": "sub_generated-id",
  "name": "Netflix",
  "price": 15.99,
  "billingCycle": "monthly",
  "renewalDate": "2026-12-16",
  "createdAt": "2026-11-16T21:03:44.897Z",
  "updatedAt": "2026-11-16T21:03:44.897Z"
}
```

The API generates `id`, `createdAt`, and `updatedAt`. The renewal date must use the `YYYY-MM-DD` format. New subscriptions require `name`, `price`, `billingCycle`, and `renewalDate`. The price must be a positive number, and the name and billing cycle must be non-empty strings.

## Endpoints

All subscription endpoints use the `/resources` base path.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/resources` | Get all subscriptions |
| GET | `/resources/:id` | Get one subscription |
| POST | `/resources` | Create a subscription |
| PUT | `/resources/:id` | Update one or more subscription fields |
| DELETE | `/resources/:id` | Delete a subscription |

### Create a subscription

Send a `POST` request to `http://localhost:3000/resources` with a JSON body:

```json
{
  "name": "Video Service",
  "price": 12.99,
  "billingCycle": "monthly",
  "renewalDate": "2026-12-20"
}
```

The API responds with `201 Created` and the new subscription, including its generated ID and timestamps.

### Update a subscription

Send a `PUT` request to `http://localhost:3000/resources/:id`. Updates can include one or more editable fields:

```json
{
  "billingCycle": "yearly"
}
```

The API updates `updatedAt` and keeps the original `id` and `createdAt`.

### Example response

Successful requests return JSON with a `success` value, a message, and (where applicable) the subscription data:

```json
{
  "success": true,
  "message": "Subscription created successfully",
  "data": {
    "id": "sub_generated-id",
    "name": "Video Service",
    "price": 12.99,
    "billingCycle": "monthly",
    "renewalDate": "2026-12-20",
    "createdAt": "2026-11-16T21:03:44.897Z",
    "updatedAt": "2026-11-16T21:03:44.897Z"
  }
}
```

## Errors

- `400 Bad Request`: The request body is missing required fields or contains invalid values.
- `404 Not Found`: The requested subscription ID does not exist.
- `500 Internal Server Error`: An unexpected server or file-storage error occurred.

## Storage

Subscriptions are stored in `data/subscriptions.json`. Changes are written to the file, so they remain after the server restarts. The included sample records are for demonstration.

## Testing with Postman

1. Start the server with `npm run dev`.
2. Create a request using one of the endpoint paths above.
3. For `POST` and `PUT`, select **Body → raw → JSON** and enter the relevant JSON body.
4. Send the request and check the response status and body.
