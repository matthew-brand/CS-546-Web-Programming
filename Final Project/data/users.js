const uuidv1 = require("uuid/v1");
const mongoCollections = require("../config/mongoCollections");

const { users } = mongoCollections;

const exportedMethods = {
  getAllUsers() {
    return users().then(usersCollection => {
      try {
        return usersCollection.find({}).toArray();
      } catch (e) {
        throw new Error("Error finding any users");
      }
    });
  },

  getUserById(id) {
    return users().then(usersCollection =>
      usersCollection.findOne({ _id: id }).then(user => {
        if (!user) throw new Error("User not found");
        return user;
      })
    );
  },

  getUserByCredentials(username, password) {
    return users().then(usersCollection =>
      usersCollection.findOne({ username, password }).then(user => {
        if (!user) throw new Error("User not found");
        return user;
      })
    );
  },

  addUser(username, password, emailAddress) {
    if (!username || !password || !emailAddress) {
      throw new Error("You must supply all parts of the account");
    }
    return users().then(usersCollection => {
      const newUser = {
        _id: uuidv1(),
        _sessionid: null,
        username,
        password,
        emailAddress,
        emailAddress_verified: false
      };

      return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => newInsertInformation.insertedId)
        .then(newId => this.getRecipeById(newId));
    });
  },

  removeUser(id) {
    if (!id) {
      throw new Error("You must supply an ID");
    }
    return users().then(usersCollection =>
      usersCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw new Error(`Could not delete recipe with id of ${id}`);
        }
      })
    );
  }
};

module.exports = exportedMethods;
