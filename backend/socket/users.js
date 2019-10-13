const users = [];

export const addUser = (socketId, id, username) => {
  const exists = users.find(u => u.socketId === socketId);
  if (!id || !username) return { error: 'Username is required' };
  if (exists) return { error: 'User already exists in chat' };

  const user = {
    id,
    socketId,
    username
  };
  return user;
};

export const removeUser = id => {
  const index = users.findIndex(user => user.socketId === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = id => {
  return users.find(user => user.socketId === id);
};

export const getUsersInChat = () => {
  return users;
};
