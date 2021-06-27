const Event = require("./../models/event");

exports.createEvent = async (req, res) => {
  console.log(req.body);
  const event = new Event(req.body);
  try {
    await event.save();
    res.status(200).json({
      status: 200,
      message: "Create successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.find();
    res.send(event);
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
