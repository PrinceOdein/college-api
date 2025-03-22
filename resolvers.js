// resolvers.js
let students = [];
let rooms = [];
let maintenanceRequests = [];

let studentIdCounter = 1;
let roomIdCounter = 1;
let requestIdCounter = 1;

export const resolvers = {
  Query: {
    students: () => students,
    rooms: () => rooms,
    maintenanceRequests: () => maintenanceRequests,
    student: (_, { id }) => students.find(s => s.id === id),
    room: (_, { id }) => rooms.find(r => r.id === id),
  },
  Mutation: {
    createStudent: (_, { input }) => {
      const newStudent = { id: String(studentIdCounter++), ...input, room: null };
      students.push(newStudent);
      return newStudent;
    },
    createRoom: (_, { input }) => {
      const newRoom = { id: String(roomIdCounter++), ...input, occupied: false, students: [] };
      rooms.push(newRoom);
      return newRoom;
    },
    assignStudentToRoom: (_, { studentId, roomId }) => {
      const student = students.find(s => s.id === studentId);
      const room = rooms.find(r => r.id === roomId);
      if (!student || !room) throw new Error('Student or Room not found');
      // Assign student to room
      student.room = room;
      room.students.push(student);
      room.occupied = room.students.length >= room.capacity;
      return student;
    },
    createMaintenanceRequest: (_, { input }) => {
      const { studentId, roomId, issue } = input;
      const student = students.find(s => s.id === studentId);
      const room = rooms.find(r => r.id === roomId);
      if (!student || !room) throw new Error('Invalid student or room');
      const newRequest = {
        id: String(requestIdCounter++),
        student,
        room,
        issue,
        status: 'Pending'
      };
      maintenanceRequests.push(newRequest);
      return newRequest;
    },
    updateMaintenanceRequestStatus: (_, { id, status }) => {
      const request = maintenanceRequests.find(r => r.id === id);
      if (!request) throw new Error('Request not found');
      request.status = status;
      return request;
    }
  },
  Room: {
    students: (room) => students.filter(s => s.room && s.room.id === room.id)
  },
  Student: {
    room: (student) => student.room || null
  }
};
