const database = [
    {
      id: 1,
      name: "Cindy Smith",
      email: "cindy123@gmail.com",
      password: "cindy123!",
      // profile: "./uploads/img.png"
    },
    {
      id: 2,
      name: "Alex Smith",
      email: "alex123@gmail.com",
      password: "alex123!",
    }
]

const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
};

module.exports = { database, userModel };