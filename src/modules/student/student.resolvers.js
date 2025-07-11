let students = [];
let studentIdCounter = 1;

export const studentResolvers = {
  Query: {
    students: () => students,
    student: (_, { id }) => students.find(s => s.id === id),
  },
  Mutation: {
    createStudent: (_, { input }) => {
      const newStudent = { id: String(studentIdCounter++), ...input, room: null };
      students.push(newStudent);
      return newStudent;
    },
    assignStudentToRoom: (_, { studentId, roomId }, { rooms }) => {
      const student = students.find(s => s.id === studentId);
      const room = rooms.find(r => r.id === roomId);
      if (!student || !room) throw new Error('Student or Room not found');
      student.room = room;
      room.students.push(student);
      room.occupied = room.students.length >= room.capacity;
      return student;
    }
  },
  Student: {
    room: (student) => student.room || null
  }
};
