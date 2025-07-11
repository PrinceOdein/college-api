# College Hostel Management Backend API

This project is a backend API for managing a college's hostel system, built entirely with JavaScript and Apollo Server using GraphQL.

## Features

- **Student Management**
  - Create student records
  - List all students
  - Assign students to rooms

- **Room Management**
  - Create rooms with capacity
  - List all rooms
  - Track occupancy and student assignments

- **Maintenance Requests**
  - Students can submit maintenance requests for their rooms
  - Requests are linked to both the student and room
  - Admin can update the status of requests (e.g., Pending, Completed)

## Tech Stack

- **JavaScript**
- **Apollo Server (GraphQL)**
- **No external database** (data is stored in-memory for demo purposes)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node index.js
   ```

3. The server runs by default at `http://localhost:4000/`

## Project Structure

- `index.js`: Main entry point. Sets up Apollo Server and loads the GraphQL schema.
- `resolvers.js`: Implements GraphQL resolvers for CRUD operations and business logic.
- `schema.gql`: Defines the GraphQL schema (types and queries/mutations).

## Example GraphQL Operations

**Create a Student**
```graphql
mutation {
  createStudent(input: { name: "John Doe", age: 20 }) {
    id
    name
  }
}
```

**Create a Room**
```graphql
mutation {
  createRoom(input: { name: "Room 101", capacity: 2 }) {
    id
    name
    capacity
  }
}
```

**Assign Student to Room**
```graphql
mutation {
  assignStudentToRoom(studentId: "1", roomId: "1") {
    id
    name
    room {
      name
    }
  }
}
```

**Create a Maintenance Request**
```graphql
mutation {
  createMaintenanceRequest(input: { studentId: "1", roomId: "1", issue: "Leaky faucet" }) {
    id
    issue
    status
  }
}
```

## Notes

- This API is intended for demonstration and prototyping purposes.  
- Data will be lost when the server restarts.

## License

MIT License (add a LICENSE file if needed)
