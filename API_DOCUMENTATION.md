# API Documentation

## Authentication

All authenticated endpoints require the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Auth Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username"
  }
}
```

### User Endpoints

#### Get Current User
```
GET /api/users/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "username": "username",
  "subscription": {
    "tier": "pro",
    "status": "active",
    "currentPeriodEnd": "2024-08-06T00:00:00Z"
  },
  "uploadedContent": ["507f1f77bcf86cd799439012"],
  "createdAt": "2024-07-06T00:00:00Z"
}
```

#### Update User Profile
```
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername"
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "username": "newusername",
  "subscription": {...},
  "uploadedContent": [...],
  "createdAt": "2024-07-06T00:00:00Z"
}
```

#### Get Subscription Status
```
GET /api/users/me/subscription
Authorization: Bearer <token>

Response (200):
{
  "tier": "pro",
  "status": "active",
  "stripeCustomerId": "cus_xxx",
  "stripeSubscriptionId": "sub_xxx",
  "currentPeriodEnd": "2024-08-06T00:00:00Z"
}
```

### Content Endpoints

#### Get All User Content
```
GET /api/content
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Mountain View",
    "description": "Beautiful mountain landscape",
    "imageUrl": "https://example.com/image.jpg",
    "contentType": "image",
    "tags": ["nature", "landscape"],
    "isPublic": true,
    "arMetadata": {
      "scale": 1.5,
      "rotation": 0,
      "position": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "views": 42,
    "createdAt": "2024-07-06T10:30:00Z",
    "updatedAt": "2024-07-06T10:30:00Z"
  }
]
```

#### Get Content by ID
```
GET /api/content/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "username"
  },
  "title": "Mountain View",
  "description": "Beautiful mountain landscape",
  "imageUrl": "https://example.com/image.jpg",
  "contentType": "image",
  "tags": ["nature", "landscape"],
  "isPublic": true,
  "arMetadata": {...},
  "views": 43,
  "createdAt": "2024-07-06T10:30:00Z",
  "updatedAt": "2024-07-06T10:30:00Z"
}
```

#### Create Content
```
POST /api/content
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Mountain View",
  "description": "Beautiful mountain landscape",
  "imageUrl": "https://example.com/image.jpg",
  "tags": "nature,landscape",
  "isPublic": true
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Mountain View",
  "description": "Beautiful mountain landscape",
  "imageUrl": "https://example.com/image.jpg",
  "contentType": "image",
  "tags": ["nature", "landscape"],
  "isPublic": true,
  "arMetadata": {...},
  "views": 0,
  "createdAt": "2024-07-06T10:30:00Z",
  "updatedAt": "2024-07-06T10:30:00Z"
}
```

#### Update Content
```
PUT /api/content/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "isPublic": false
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  ...
}
```

#### Delete Content
```
DELETE /api/content/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Content deleted"
}
```

### Subscription Endpoints

#### Get All Plans
```
GET /api/subscriptions

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "free",
    "price": 0,
    "billingCycle": "monthly",
    "features": {
      "maxUploads": 10,
      "storageGb": 1,
      "arGoggleBrand": ["meta-quest"],
      "customBranding": false,
      "analyticsAccess": false,
      "prioritySupport": false
    },
    "description": "Free tier with basic features",
    "isActive": true,
    "createdAt": "2024-07-06T00:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "name": "pro",
    "price": 9.99,
    "billingCycle": "monthly",
    "features": {
      "maxUploads": 100,
      "storageGb": 50,
      "arGoggleBrand": ["meta-quest"],
      "customBranding": false,
      "analyticsAccess": true,
      "prioritySupport": false
    },
    "stripePriceId": "price_xxx",
    "description": "Professional tier for content creators",
    "isActive": true,
    "createdAt": "2024-07-06T00:00:00Z"
  }
]
```

#### Get Specific Plan
```
GET /api/subscriptions/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "pro",
  "price": 9.99,
  ...
}
```

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized"
}
```

### 404 Not Found
```json
{
  "error": "Content not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

## Rate Limiting

Recommended rate limits:
- Auth endpoints: 5 requests per minute
- Content endpoints: 30 requests per minute
- General: 100 requests per minute

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Create Content
```bash
curl -X POST http://localhost:5000/api/content \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Content",
    "description": "Test description",
    "imageUrl": "https://example.com/image.jpg",
    "isPublic": true
  }'
```

## Webhooks (Coming Soon)

Stripe webhooks for subscription updates:
- `payment_intent.succeeded`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Version

API Version: 1.0.0  
Last Updated: 2024-07-06
