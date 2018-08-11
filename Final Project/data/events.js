const uuidv1 = require("uuid/v1");
const mongoCollections = require("../config/mongoCollections");

const { events } = mongoCollections;

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
    return events().then(eventsCollection =>
      eventsCollection.findOne({ _id: id }).then(event => {
        if (!event) throw new Error("Event not found");
        return event;
      })
    );
  },

  getEventsByDate(date) {
    return events().then(eventsCollection => {
      try {
        return eventsCollection.find({ date }).toArray();
      } catch (e) {
        throw new Error("Error finding any events on that date");
      }
    });
  },

  getEventsByLocation(location) {
    return events().then(eventsCollection => {
      try {
        return eventsCollection.find({ location }).toArray();
      } catch (e) {
        throw new Error("Error finding any events at that location");
      }
    });
  },

  addEvent(title, description, date, time, location) {
    if (!title || !description || !date || !time || !location) {
      throw new Error("You must supply all parts of the event");
    }
    return events().then(eventsCollection => {
      const newEvent = {
        _id: uuidv1(),
        userId,
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
    if (!id) {
      throw new Error("You must supply an ID");
    }
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
