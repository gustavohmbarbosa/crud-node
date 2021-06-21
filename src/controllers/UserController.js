const db = require("../models/Model");
const User = db.users;

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send({
      data: user,
      message: "User created"
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).send({
        message: error._message,
        errors: error.errors
      });
    } else {
      return res.status(500).send({
        message: error.message || "Some error occurred while creating the User."
      });
    }
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.find();

    return res.send(data);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User."
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findById(id);

    if (!data) {
      return res.status(404).send({
        message: `Not found user with id ${id}`
      });
    } else {
      return res.send(data);
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User."
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  
  try {
    const data = await User.findById(id);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User."
    });
  }
};

exports.delete = async (req, res) => {

};