const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuidv1 = require('uuid/v1');

let exportedMethods = {
  getAllUsers() {
    return users().then(usersCollection => {
      try{
        return usersCollection.find({}).toArray();
      } catch (e) {
        throw "Error finding any users"
      }
    });
  },

  getUserById(id) {
    return users().then(usersCollection => {
      return usersCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";
        return user;
      });
    });
  },

  getUserByCredentials(username, password) {
    return users().then(usersCollection => {
        return usersCollection.findOne({ username: username, password: password }).then(user => {
          if (!user) throw "User not found";
          return user;
        });
      });
  },

  addUser(username, password, emailAddress) {
    if(!username || !password || !emailAddress) {
      throw "You must supply all parts of the account"
    }
    return users().then(usersCollection => {
      let newUser = {
        _id: uuidv1(),
        _sessionid: null,
        username: username,
        password: password,
        emailAddress: emailAddress,
        emailAddress_verified: false
      };

      return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getRecipeById(newId);
        });
    });
  },

  removeUser(id) {
    if(!id) {
      throw "You must supply an ID"
    }
    return users().then(usersCollection => {
      return usersCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete recipe with id of ${id}`;
        }
      });
    });
  },
};

module.exports = exportedMethods;