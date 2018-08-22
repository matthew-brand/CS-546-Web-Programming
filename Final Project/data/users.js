const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

const mongoCollections = require("../config/mongoCollections");

const saltRounds = 16;
const { users } = mongoCollections;

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

function checkIsProperObject(val, variableName) {
  if (typeof val !== "object") {
    throw new Error(`${variableName} is not an object`);
  }
}

const exportedMethods = {
  async getAllUsers() {
    return users().then(usersCollection => {
      try {
        return usersCollection.find({}).toArray();
      } catch (e) {
        throw new Error("Error finding any users");
      }
    });
  },

  async getUserById(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to getUserById");
    }
    checkIsProperString(id, "id");

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
    if (username === undefined || !username) {
      throw new Error(
        "The username argument was not provided to getUserByUsername"
      );
    }
    checkIsProperString(username, "username");

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
    if (username === undefined || !username) {
      throw new Error(
        "The username argument was not provided to verifyPassword"
      );
    }
    if (plainPassword === undefined || !plainPassword) {
      throw new Error(
        "The plainPassword argument was not provided to verifyPassword"
      );
    }

    checkIsProperString(username, "username");
    checkIsProperString(plainPassword, "plainPassword");

    const user = await this.getUserByUsername(username);
    if (user == null) {
      // throw new Error("No user with that username");
      return false;
    }
    if (user.emailAddress_verified === false) {
      // User does not have a Stevens email
      return false;
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
    if (username === undefined || !username) {
      throw new Error(
        "The username argument was not provided to getUserByCredentials"
      );
    }
    if (password === undefined || !password) {
      throw new Error(
        "The password argument was not provided to getUserByCredentials"
      );
    }

    checkIsProperString(username, "username");
    checkIsProperString(password, "password");

    return users().then(usersCollection =>
      usersCollection.findOne({ username, password }).then(user => {
        if (!user) throw new Error("User not found");
        return user;
      })
    );
  },

  async addUser(username, password, emailAddress) {
    if (username === undefined || !username) {
      throw new Error("The username argument was not provided to addUser");
    }
    if (password === undefined || !password) {
      throw new Error("The password argument was not provided to addUser");
    }
    if (emailAddress === undefined || !emailAddress) {
      throw new Error("The emailAddress argument was not provided to addUser");
    }

    checkIsProperString(username, "username");
    checkIsProperString(password, "password");
    checkIsProperString(emailAddress, "emailAddress");

    if (!username || !password || !emailAddress) {
      throw new Error("You must supply all parts of the account");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return users().then(usersCollection => {
      let newUser = null;
      if (!emailAddress.includes("@stevens.edu")) {
        newUser = {
          _id: uuidv4(),
          sessionid: "undefined",
          username,
          hashedPassword,
          emailAddress,
          emailAddress_verified: false
        };
      } else {
        newUser = {
          _id: uuidv4(),
          sessionid: "undefined",
          username,
          hashedPassword,
          emailAddress,
          emailAddress_verified: true
        };
      }

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

    checkIsProperString(id, "id");
    checkIsProperObject(updatedUser, "updatedUser");

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
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to setSessionID");
    }
    checkIsProperString(id, "id");

    try {
      await exportedMethods.patchUser(id, {
        sessionid: uuidv4()
      });
    } catch (e) {
      throw new Error(`Could not set session id successfully. Error: ${e}`);
    }
  },

  async getSessionID(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to getSessionID");
    }
    checkIsProperString(id, "id");

    try {
      const user = await exportedMethods.getUserById(id);
      return user.sessionid;
    } catch (e) {
      throw new Error(`Could not get session id successfully. Error: ${e}`);
    }
  },

  async clearSessionID(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to clearSessionID");
    }
    checkIsProperString(id, "id");

    try {
      await exportedMethods.patchUser(id, {
        sessionid: "undefined"
      });
    } catch (e) {
      throw new Error(`Could not clear session id successfully. Error: ${e}`);
    }
  },

  async removeUser(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to removeUser");
    }
    checkIsProperString(id, "id");

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
