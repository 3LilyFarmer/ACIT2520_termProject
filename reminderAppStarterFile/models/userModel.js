const database = [
  {
    id: 1,
    name: "cindy",
    email: "cindy123@gmail.com",
    password: "cindy123!",
    role: "user",
    profile_img: "",
    profile_img_des: "",
  },
  {
    id: 2,
    name: "Alex Smith",
    email: "alex123@gmail.com",
    password: "alex123!",
    role: "user",
    profile_img: "",
    profile_img_des: "",
  },
  {
    id: 4,
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
    profile_img: "",
    profile_img_des: "",
  },
];

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
  findByGitHubID: (profile) => {
    let user = database.find((user) => user.githubID === profile.id);
    if(!profile){
      throw new Error(`Couldn't find user with githubID: ${profile.id}`);
    }
    if (user) {
      return user;
    }
    else{
      user = {
        id: database.length + 1,
        githubID: profile.id,
        name: profile.displayName || profile.username,
        email: `${profile.username}@github.com`,
        password: profile.username
      }
      database.push(user);
      return user;
    }
  }
};

module.exports = { database, userModel };