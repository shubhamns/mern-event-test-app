const express = require("express");
const routes = express.Router();
const { createEvent, getEvent } = require("./../controllers/event");

routes.post("/event", createEvent);

routes.get("/event", getEvent);

module.exports = routes;
