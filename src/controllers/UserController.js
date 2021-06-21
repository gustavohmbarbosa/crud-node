const db = require("../models/Model");
const User = db.users;

exports.create = async (request, response) => {
  try {
    const user = await User.create(request.body);

    return response.send({
      data: user,
      message: "User created"
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(422).send({
        message: error._message,
        errors: error.errors
      });
    } else {
      return response.status(500).send({
        message: error.message || "Some error occurred while creating the User."
      });
    }
  }
};

exports.findAll = async (request, response) => {
  try {
    const data = await User.find();

    return response.send(data);
  } catch (error) {
    return response.status(500).send({
      message: error.message || "Could not find users"
    });
  }
};

exports.findOne = async (request, response) => {
  const id = request.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).send({
        message: `Not found user with id ${id}`
      });
    } else {
      return response.send(user);
    }
  } catch (error) {
    return response.status(500).send({
      message: `Could not find User with id ${id}`
    });
  }
};

exports.update = async (request, response) => {
  const id = request.params.id;
  
  try {
    const user = await User.findByIdAndUpdate(id, request.body, { useFindAndModify: false });

    if (!user) {
      return response.status(404).send({
        message: `Not found user with id ${id}`
      });
    } else {
      return response.send({ message: "User updated" });
    }
  } catch (error) {
    return response.status(500).send({
      message: `Error updating User with id ${id}`
    });
  }
};

exports.delete = async (request, response) => {
  const id = request.params.id;
  
  try {
    const user = await User.findByIdAndRemove(id);

    if (!user) {
      return response.status(404).send({
        message: `Not found user with id ${id}`
      });
    } else {
      return response.send({ message: "User deleted" });
    }
  } catch (error) {
    return response.status(500).send({
      message: `Could not delete User with id ${id}`
    });
  }
};