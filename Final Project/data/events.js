const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
const uuidv1 = require('uuid/v1');

let exportedMethods = {
  getAllEvents() {
    return events().then(eventsCollection => {
      try{
        return eventsCollection.find({}).toArray();
      } catch (e) {
        throw "Error finding any events"
      }
    });
  },

  getEventById(id) {
    return events().then(eventsCollection => {
      return eventsCollection.findOne({ _id: id }).then(event => {
        if (!event) throw "Event not found";
        return event;
      });
    });
  },

  getEventsByDate(date) {
    return events().then(eventsCollection => {
        try{
          return eventsCollection.find({date: date}).toArray();
        } catch (e) {
          throw "Error finding any events on that date"
        }
      });
  },

  getEventsByLocation(location) {
    return events().then(eventsCollection => {
        try{
          return eventsCollection.find({location: location}).toArray();
        } catch (e) {
          throw "Error finding any events at that location"
        }
      });
  },

  addEvent(title, description, date, time, location, user_id) {
    if(!title || !description || !date || !time || !location || !user_id) {
      throw "You must supply all parts of the event"
    }
    return events().then(eventsCollection => {
      let newEvent = {
        _id: uuidv1(),
        user_id: user_id,
        title: title,
        description: description,
        date: date,
        time: time,
        location: location
      };

      return eventsCollection
        .insertOne(newEvent)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getRecipeById(newId);
        });
    });
  },

  removeEvent(id) {
    if(!id) {
      throw "You must supply an ID"
    }
    return events().then(eventsCollection => {
      return eventsCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete event with id of ${id}`;
        }
      });
    });
  },
};

module.exports = exportedMethods;