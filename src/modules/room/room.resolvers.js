let rooms = [];
let roomIdCounter = 1;

export const roomResolvers = {
  Query: {
    rooms: () => rooms,
    room: (_, { id }) => rooms.find(r => r.id === id),
  },
  Mutation: {
    createRoom: (_, { input }) => {
      const newRoom = {
        id: String(roomIdCounter++),
        ...input,
        occupied: false,
        students: []
      };
      rooms.push(newRoom);
      return newRoom;
    }
  },
  Room: {
    students: (room) => room.students || []
  }
};
