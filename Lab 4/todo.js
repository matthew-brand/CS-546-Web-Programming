// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const uuidv4 = require("uuid/v4");
const mongoCollections = require("./mongoCollections");

const { todoItems } = mongoCollections;

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

exports.createTask = async function createTask(title, description) {
  if (title === undefined || !title) {
    throw new Error("The title argument was not provided to createTask");
  }
  if (description === undefined || !description) {
    throw new Error("The description argument was not provided to createTask");
  }
  checkIsProperString(title, "title");
  checkIsProperString(description, "description");

  const todoCollection = await todoItems();

  const newTask = {
    _id: uuidv4(),
    title,
    description,
    completed: false,
    completedAt: null
  };

  const insertInfo = await todoCollection.insertOne(newTask);
  if (insertInfo.insertedCount === 0) throw new Error("Could not add task");

  const newId = insertInfo.insertedId;

  const task = await this.getTask(newId);
  return task;
};

exports.getAllTasks = async function getAllTasks() {
  const todoCollection = await todoItems();

  const Tasks = await todoCollection.find({}).toArray();

  return Tasks;
};

exports.getTask = async function getTask(id) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to getTask");
  }
  checkIsProperString(id, "id");

  const todoCollection = await todoItems();
  const task = await todoCollection.findOne({ _id: id });
  if (task === null) throw new Error("No task with that id");

  return task;
};

exports.completeTask = async function completeTask(id) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to completeTask");
  }
  checkIsProperString(id, "id");

  const todoCollection = await todoItems();
  const updatedTask = {
    completed: true,
    completedAt: new Date()
  };

  const newvalues = {
    $set: updatedTask
  };

  const updateInfo = await todoCollection.updateOne({ _id: id }, newvalues);
  if (updateInfo.modifiedCount === 0) {
    throw new Error("Could not update task successfully");
  }

  return this.getTask(id);
};

exports.removeTask = async function removeTask(id) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to removeTask");
  }
  checkIsProperString(id, "id");

  const todoCollection = await todoItems();
  const deletionInfo = await todoCollection.removeOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw new Error(`Could not delete task with id of ${id}`);
  }
};
