const uuidv4 = require("uuid/v4");
const fs = require("fs");
const bcrypt = require("bcrypt");

const users = [
  {
    _id: "2147c72a-ab99-402a-907f-ae3809c416da",
    username: "masterdetective123",
    hashedPassword:
      "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
    firstName: "Sherlock",
    lastName: "Holmes",
    profession: "Detective",
    bio:
      "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
  },
  {
    _id: "86e9305e-1282-4f41-865e-11e0749c2d27",
    username: "lemon",
    hashedPassword:
      "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
    firstName: "Elizabeth",
    lastName: "Lemon",
    profession: "Writer",
    bio:
      "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
  },
  {
    _id: "a50fd54e-bd4d-4098-8f80-ac9d4438176f",
    username: "theboywholived",
    hashedPassword:
      "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    firstName: "Harry",
    lastName: "Potter",
    profession: "Student",
    bio:
      "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."
  }
];

const exportedMethods = {
  async getAllUsers() {
    return users;
  },
  async getUserByID(id) {
    for (let index = 0; index < users.length; index += 1) {
      if (users[index]._id === id) {
        console.log("FOUND USER");
        console.log(`USER:${JSON.stringify(users[index])}`);
        return users[index];
      }
    }
    throw new Error("User not found");
  },
  async getUserByUsername(username) {
    for (let index = 0; index < users.length; index += 1) {
      if (users[index].username === username) {
        return users[index];
      }
    }
    return null;
  },
  async getUserIDBySessionID(sessionID) {
    let finalUserID = null;
    fs.readdirSync(`${__dirname}/../sessions/`).forEach(file => {
      if (file !== ".DS_Store") {
        const jsonSessionID = JSON.parse(
          fs.readFileSync(`${__dirname}/../sessions/${file}`, "utf8")
        );
        if (jsonSessionID.sessionID === sessionID) {
          finalUserID = jsonSessionID.userID;
        }
      }
      return null;
    });
    if (finalUserID != null) {
      return finalUserID;
    }
    return null;
  },
  async setSessionID(id) {
    exportedMethods.clearSessionID(id);
    const newSessionID = uuidv4();
    const jsonSessionID = {
      userID: id,
      sessionID: newSessionID
    };
    const jsonString = JSON.stringify(jsonSessionID);
    fs.writeFileSync(`${__dirname}/../sessions/${id}.json`, jsonString);
  },
  async getSessionID(id) {
    if (fs.existsSync(`${__dirname}/../sessions/${id}.json`)) {
      const jsonSessionID = JSON.parse(
        fs.readFileSync(`${__dirname}/../sessions/${id}.json`, "utf8")
      );
      return jsonSessionID.sessionID;
    }
    throw new Error("No Session ID Found");
  },
  async clearSessionID(id) {
    if (fs.existsSync(`${__dirname}/../sessions/${id}.json`)) {
      fs.unlinkSync(`${__dirname}/../sessions/${id}.json`);
    }
  },
  async verifyLogin(username, password) {
    const user = await this.getUserByUsername(username);
    if (user == null) {
      return false;
    }
    let compareHash = null;
    try {
      compareHash = await bcrypt.compare(password, user.hashedPassword);
    } catch (e) {
      throw new Error(`Error in data/users/verifyLogin(): ${e}`);
    }
    return compareHash;
  }
};

module.exports = exportedMethods;

// exportedMethods.setSessionID("2147c72a-ab99-402a-907f-ae3809c416da");
// console.log(
//  exportedMethods.getUserBySessionID("e0ad3a84-f904-4b9f-b785-eee628c38ce1")
// );
// console.log(exportedMethods.getSessionID("2147c72a-ab99-402a-907f-ae3809c416da"));
// exportedMethods.clearSessionID("2147c72a-ab99-402a-907f-ae3809c416da");
/*
async function login() {
  console.log(await exportedMethods.verifyLogin("lemon", "dgrer"));
}
login();
*/
