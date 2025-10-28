# Splyt Tech Task

## Overview

This project is a small service that ingests location webhooks from Splyt and exposes a real-time subscription endpoint per driver. The service is built using **Node.js**, **TypeScript**, **Express**, and **WebSocket (ws)**.

---

## What Has Been Implemented

- **Express Server**: Handles HTTP requests.
- **`/event` Endpoint**: Accepts POST requests with driver events and validates the payload using **Joi**.
- **Redis Event Storage**: Stores driver events in redis.
- **WebSocket Server**: Allows clients to subscribe to events per driver and receive updates in real-time.
- **Rate Limiting Middleware**: Prevents abuse of the `/event` endpoint.
- **Simple Token Validation for WebSocket**: Ensures that only authorized clients can connect.
- **Automated unit and integration testing**: Handles automated testing using Jest

---

## Problems / Challenges

1. **WebSocket Implementation**  
   Figuring out how to manage multiple clients and send driver-specific events was tricky. Ensuring that each driver receives only their relevant events required careful mapping of `driverId` to WebSocket connections.

2. **In-Memory Storage Limitations**  
   While sufficient for this task, storing events in memory means data is lost on server restart and doesn’t scale across multiple instances.

---

## How the Task Can Be Improved

- **Persistent Storage**: Using Redis or a database would allow events to persist across server restarts and scale across multiple instances.
- **Driver-Specific Event Fetching**: Implement selective fetching (e.g., events since a given timestamp) to improve efficiency.
- **WebSocket Improvements**: Add client authentication, reconnection handling, and pub/sub for better real-time reliability.
- **LRU or TTL Caching**: Prevent memory growth by evicting old events.

---

## Time Spent

Approximately **2 days** were spent on this task, including:

- Setting up the Express server and routes
- Implementing in-memory storage and WebSocket broadcasting
- Handling payload validation and rate limiting
- Debugging WebSocket logic

---

## Additional Features

- **Centralized Logging**: Using a `logger` utility.
- **Route-Specific Rate Limiter**: Protects the `/event` endpoint.
- **Simple WebSocket Token Validation**: Ensures only authorized clients can connect.
- **Automated unit and integration testing**: Handles automated testing using Jest


