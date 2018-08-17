const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

const mongoCollections = require("../config/mongoCollections");

const saltRounds = 16;
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

  async getUserById(id) {
    return users().then(usersCollection =>
      usersCollection.findOne({ _id: id }).then(user => {
        if (!user) {
          return null;
        }
        return user;
      })
    );
  },

  async getUserByUsername(username) {
    return users().then(usersCollection =>
      usersCollection.findOne({ username }).then(user => {
        if (!user) {
          return null;
        }
        return user;
      })
    );
  },

  async getUserBySessionID(sessionid) {
    return users().then(usersCollection =>
      usersCollection.findOne({ sessionid }).then(user => {
        if (!user) {
          return null;
        }
        return user;
      })
    );
  },

  async verifyPassword(username, plainPassword) {
    const user = await this.getUserByUsername(username);
    if (user == null) {
      throw new Error("No user with that username");
    }
    let compareHash = null;
    try {
      compareHash = await bcrypt.compare(plainPassword, user.hashedPassword);
    } catch (e) {
      throw new Error(`Error in data/users/verifyPassword(): ${e}`);
    }
    return compareHash;
  },

  async getUserByCredentials(username, password) {
    return users().then(usersCollection =>
      usersCollection.findOne({ username, password }).then(user => {
        if (!user) throw new Error("User not found");
        return user;
      })
    );
  },

  async addUser(username, password, emailAddress) {
    if (!username || !password || !emailAddress) {
      throw new Error("You must supply all parts of the account");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return users().then(usersCollection => {
      const newUser = {
        _id: uuidv4(),
        sessionid: "undefined",
        username,
        hashedPassword,
        emailAddress,
        emailAddress_verified: false
      };

      return usersCollection
        .insertOne(newUser)
        .then(newInsertInformation => newInsertInformation.insertedId)
        .then(newId => this.getUserById(newId));
    });
  },

  async patchUser(id, updatedUser) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to patchUser");
    }

    if (updatedUser === undefined || !updatedUser) {
      throw new Error("The updatedUser argument was not provided to patchUser");
    }

    return users().then(async usersCollection => {
      try {
        const updatedUserData = {};

        if (updatedUser.sessionid) {
          updatedUserData.sessionid = updatedUser.sessionid;
        }

        if (updatedUser.username) {
          updatedUserData.username = updatedUser.username;
        }

        if (updatedUser.emailAddress) {
          updatedUserData.emailAddress = updatedUser.emailAddress;
        }

        if (updatedUser.hashedPassword) {
          updatedUserData.hashedPassword = updatedUser.hashedPassword;
        }

        if (updatedUser.emailAddress_verified) {
          updatedUserData.emailAddress_verified =
            updatedUser.emailAddress_verified;
        }

        const newvalues = {
          $set: updatedUserData
        };

        const updateInfo = await usersCollection.updateOne(
          { _id: id },
          newvalues
        );
        // prettier-ignore
        if (updateInfo.modifiedCount === 0) {
          // eslint-disable-line eqeqeq
          // throw new Error("Could not update user successfully");
        }
      } catch (e) {
        console.log(`Error in data/users/patchUser(): ${e}`);
      }

      return this.getUserById(id);
    });
  },

  async setSessionID(id) {
    try {
      await exportedMethods.patchUser(id, {
        sessionid: uuidv4()
      });
    } catch (e) {
      throw new Error(`Could not set session id successfully. Error: ${e}`);
    }
  },

  async getSessionID(id) {
    try {
      const user = await exportedMethods.getUserById(id);
      return user.sessionid;
    } catch (e) {
      throw new Error(`Could not get session id successfully. Error: ${e}`);
    }
  },

  async clearSessionID(id) {
    try {
      await exportedMethods.patchUser(id, {
        sessionid: "undefined"
      });
    } catch (e) {
      throw new Error(`Could not clear session id successfully. Error: ${e}`);
    }
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
