const express = require("express");
const uuidv1 = require('uuid/v1');
const router = express.Router();
const data = require("../data");
const eventsData = data.events;

router.get("/:id", async (req, res) => {
  if(!req.params.id) {
    res.status(400).json({ message: "You must supply an ID" });
  }
  else{
    try {
      const event = await eventsData.getEventById(req.params.id);
      res.json(event);
    } catch (e) {
      res.status(404).json({ message: "Event not found" });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const eventList = await eventsData.getAllEvents();
    res.json(eventList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
    if(!req.body.title || !req.body.description || !req.body.date || !req.body.time || !req.body.location) {
      res.status(400).json({ message: "You must supply a full event object, you are missing parts" });
    }
    else{
      let freshEvent = req.body;

    eventsData.addEvent(freshEvent.title, freshEvent.description, freshEvent.date, freshEvent.time, freshEvent.location)
      .then((freshEvent) => {
        res.json(freshEvent);
      }).catch ((e) => {
        res.status(501).send();
      });
    }
});

router.delete("/:id", async (req, res) => {
  if(!req.params.id){
    res.status(400).json({ message: "You must supply an ID" });
  }
  else {
    try{
      eventsData.removeEvent(req.params.id);
      res.status(200).json({message: "Event deleted"});
    }catch (e) {
      res.status(404).json({ message: "Event not found" });
    }
  }
});

module.exports = router;
