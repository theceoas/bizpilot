# BizPilot Webhook API Documentation

This document describes the webhook endpoints for managing BizPilot testimonials and deployment slots.

## Base URL
```
https://your-domain.com/api
```

## Authentication
Currently, these endpoints are public. For production use, consider adding authentication.

## Endpoints

### 1. Testimonials Management

#### GET `/testimonials`
Retrieve all active testimonials.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Ada",
    "business": "Fashion Seller",
    "testimonial": "BizPilot saved me 25 hours a week...",
    "result": "+40% Sales",
    "timeSaved": "25 hours/week",
    "avatar": "👩‍💼",
    "active": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### POST `/testimonials`
Add a new testimonial.

**Request Body:**
```json
{
  "name": "Customer Name",
  "business": "Business Type",
  "testimonial": "Customer testimonial text...",
  "result": "Result achieved",
  "timeSaved": "Time saved",
  "avatar": "👩‍💼" // Optional, defaults to "👩‍💼"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "name": "Customer Name",
  "business": "Business Type",
  "testimonial": "Customer testimonial text...",
  "result": "Result achieved",
  "timeSaved": "Time saved",
  "avatar": "👩‍💼",
  "active": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 2. Slots Management

#### GET `/slots`
Get current slots status.

**Response:**
```json
{
  "totalSlots": 3,
  "availableSlots": 2,
  "waitlistEnabled": false,
  "waitlistCount": 0,
  "lastUpdated": "2024-01-15T10:30:00Z",
  "status": "open"
}
```

#### POST `/slots`
Update slots status.

**Request Body:**
```json
{
  "action": "reserve_slot" | "release_slot" | "add_waitlist" | "set_slots_used" | "toggle_waitlist",
  "slotsUsed": 2, // Required for "set_slots_used"
  "waitlistEnabled": true // Required for "toggle_waitlist"
}
```

**Actions:**
- `reserve_slot`: Decrease available slots by 1
- `release_slot`: Increase available slots by 1
- `add_waitlist`: Increment waitlist count
- `set_slots_used`: Set specific number of slots as used
- `toggle_waitlist`: Enable/disable waitlist

**Response:**
```json
{
  "totalSlots": 3,
  "availableSlots": 1,
  "waitlistEnabled": true,
  "waitlistCount": 5,
  "lastUpdated": "2024-01-15T10:30:00Z",
  "status": "open"
}
```

### 3. Waitlist Management

#### GET `/waitlist`
Get all waitlist entries (for admin purposes).

**Response:**
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "business": "Fashion",
    "phone": "+2341234567890",
    "message": "Interested in AI team",
    "joinedAt": "2024-01-15T10:30:00Z",
    "status": "waiting"
  }
]
```

#### POST `/waitlist`
Join the waitlist.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "business": "Fashion", // Optional
  "phone": "+2341234567890", // Optional
  "message": "Interested in AI team" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined waitlist. We'll notify you when slots become available.",
  "entry": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "business": "Fashion",
    "phone": "+2341234567890",
    "message": "Interested in AI team",
    "joinedAt": "2024-01-15T10:30:00Z",
    "status": "waiting"
  }
}
```

## Usage Examples

### Adding a Testimonial via Webhook
```bash
curl -X POST https://your-domain.com/api/testimonials \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Johnson",
    "business": "Beauty Products",
    "testimonial": "BizPilot transformed my business completely!",
    "result": "+60% Revenue",
    "timeSaved": "30 hours/week"
  }'
```

### Reserving a Slot
```bash
curl -X POST https://your-domain.com/api/slots \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reserve_slot"
  }'
```

### Setting Slots Used (for bulk updates)
```bash
curl -X POST https://your-domain.com/api/slots \
  -H "Content-Type: application/json" \
  -d '{
    "action": "set_slots_used",
    "slotsUsed": 2
  }'
```

## Status Values

### Slots Status
- `"open"`: Slots are available
- `"full"`: All slots are filled
- `"waitlist"`: Waitlist is enabled

### Waitlist Status
- `"waiting"`: On waitlist
- `"contacted"`: Has been contacted
- `"converted"`: Converted to customer

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (missing required fields)
- `409`: Conflict (email already exists)
- `500`: Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## Data Storage

Data is stored in JSON files in the `/data` directory:
- `/data/testimonials.json`
- `/data/slots.json`
- `/data/waitlist.json`

For production use, consider migrating to a proper database. 