let maintenanceRequests = [];
let requestIdCounter = 1;

import { studentResolvers } from '../student/student.resolvers.js';
import { roomResolvers } from '../room/room.resolvers.js';

export const maintenanceResolvers = {
  Query: {
    maintenanceRequests: () => maintenanceRequests
  },
  Mutation: {
    createMaintenanceRequest: (_, { input }) => {
      const { studentId, roomId, issue } = input;

      // Access current students and rooms from modules
      const students = studentResolvers.Query.students();
      const rooms = roomResolvers.Query.rooms();

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
  }
};
