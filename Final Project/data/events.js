const uuidv4 = require("uuid/v4");
const mongoCollections = require("../config/mongoCollections");

const { events } = mongoCollections;

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

const exportedMethods = {
  getAllEvents() {
    return events().then(eventsCollection => {
      try {
        return eventsCollection.find({}).toArray();
      } catch (e) {
        throw new Error("Error finding any events");
      }
    });
  },

  getEventById(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to removeUser");
    }
    checkIsProperString(id, "id");

    return events().then(eventsCollection =>
      eventsCollection.findOne({ _id: id }).then(event => {
        if (!event) throw new Error("Event not found");
        return event;
      })
    );
  },

  getEventsByDate(date) {
    if (date === undefined || !date) {
      throw new Error("The date argument was not provided to getEventsByDate");
    }
    checkIsProperString(date, "date");

    return events().then(eventsCollection => {
      try {
        return eventsCollection.find({ date }).toArray();
      } catch (e) {
        throw new Error("Error finding any events on that date");
      }
    });
  },

  getEventsByLocation(location) {
    if (location === undefined || !location) {
      throw new Error(
        "The location argument was not provided to getEventsByLocation"
      );
    }
    checkIsProperString(location, "location");

    return events().then(eventsCollection => {
      try {
        return eventsCollection.find({ location }).toArray();
      } catch (e) {
        throw new Error("Error finding any events at that location");
      }
    });
  },

  addEvent(title, userID, description, date, time, location) {
    if (title === undefined || !title) {
      throw new Error("The id argument was not provided to addEvent");
    }
    if (userID === undefined || !userID) {
      throw new Error("The userID argument was not provided to addEvent");
    }
    if (description === undefined || !description) {
      throw new Error("The description argument was not provided to addEvent");
    }
    if (date === undefined || !date) {
      throw new Error("The date argument was not provided to addEvent");
    }
    if (time === undefined || !time) {
      throw new Error("The time argument was not provided to addEvent");
    }
    if (location === undefined || !location) {
      throw new Error("The location argument was not provided to addEvent");
    }
    checkIsProperString(title, "title");
    checkIsProperString(userID, "userID");
    checkIsProperString(description, "description");
    checkIsProperString(date, "date");
    checkIsProperString(time, "time");
    checkIsProperString(location, "location");

    return events().then(eventsCollection => {
      const newEvent = {
        _id: uuidv4(),
        userID,
        title,
        description,
        date,
        time,
        location
      };

      return eventsCollection
        .insertOne(newEvent)
        .then(newInsertInformation => newInsertInformation.insertedId)
        .then(newId => this.getEventById(newId));
    });
  },

  removeEvent(id) {
    if (id === undefined || !id) {
      throw new Error("The id argument was not provided to removeEvent");
    }
    checkIsProperString(id, "id");

    return events().then(eventsCollection =>
      eventsCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw new Error(`Could not delete event with id of ${id}`);
        }
      })
    );
  }
};

module.exports = exportedMethods;
