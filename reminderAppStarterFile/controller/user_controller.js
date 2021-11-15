const userModel = require("../usermodel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
};

function isUserValid(user, password) {
  return user.password === password;
}

function getUserByGitHubIdOrCreate(profile) {
  let user = null;
  try {
    user = userModel.findById(profile.id);
  } catch (err) {
    user = userModel.createGithubUser(profile);
  }
  return user;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
