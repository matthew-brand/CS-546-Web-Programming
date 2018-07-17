// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const uuid = require("node-uuid");
const mongoCollections = require("../config/mongoCollections");

// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const { recipes } = mongoCollections;

function checkIsProperString(val, variableName) {
  if (typeof val !== "string") {
    throw new Error(`${variableName} is not a string`);
  }
}

function checkIsProperObject(val, variableName) {
  if (typeof val !== "object") {
    throw new Error(`${variableName} is not an object`);
  }
}

exports.createRecipe = async function createRecipe(title, ingredients, steps) {
  if (title === undefined || !title) {
    throw new Error("The title argument was not provided to createRecipe");
  }
  if (ingredients === undefined || !ingredients) {
    throw new Error(
      "The ingredients argument was not provided to createRecipe"
    );
  }
  if (steps === undefined || !steps) {
    throw new Error("The steps argument was not provided to createRecipe");
  }
  checkIsProperString(title, "title");
  checkIsProperObject(ingredients, "description");
  checkIsProperObject(steps, "steps");

  const recipesCollection = await recipes();

  const newRecipe = {
    _id: uuid(),
    title,
    ingredients,
    steps
  };

  const insertInfo = await recipesCollection.insertOne(newRecipe);
  if (insertInfo.insertedCount === 0) throw new Error("Could not add recipe");

  const newId = insertInfo.insertedId;

  const recipe = await this.getRecipe(newId);
  return recipe;
};

exports.getAllRecipes = async function getAllRecipes() {
  const recipesCollection = await recipes();

  // prettier-ignore
  const Recipes = await recipesCollection.find({}, {fields: { title: 1 }}).toArray();

  // console.log(JSON.stringify(Recipes));

  return Recipes;
};

exports.getRecipe = async function getRecipe(id) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to getRecipe");
  }
  checkIsProperString(id, "id");

  const recipesCollection = await recipes();
  const recipe = await recipesCollection.findOne({ _id: id });
  if (recipe === null) throw new Error("No recipe with that id");

  return recipe;
};

exports.putRecipe = async function putRecipe(id, updatedRecipe) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to patchRecipe");
  }
  if (updatedRecipe === undefined || !updatedRecipe) {
    throw new Error(
      "The updatedRecipe argument was not provided to patchRecipe"
    );
  }
  checkIsProperString(id, "id");
  checkIsProperObject(updatedRecipe, "updatedRecipe");

  const recipesCollection = await recipes();
  delete updatedRecipe._id; // eslint-disable-line no-param-reassign

  const newvalues = {
    $set: updatedRecipe
  };

  const updateInfo = await recipesCollection.updateOne({ _id: id }, newvalues);

  // prettier-ignore
  if (updateInfo.modifiedCount == 0) { // eslint-disable-line eqeqeq
    throw new Error("Could not update recipe successfully");
  }

  return this.getRecipe(id);
};

exports.patchRecipe = async function patchRecipe(id, updatedRecipe) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to patchRecipe");
  }
  if (updatedRecipe === undefined || !updatedRecipe) {
    throw new Error(
      "The updatedRecipe argument was not provided to patchRecipe"
    );
  }
  checkIsProperString(id, "id");
  checkIsProperObject(updatedRecipe, "updatedRecipe");

  const recipesCollection = await recipes();

  const updatedRecipeData = {};

  if (updatedRecipe.title) {
    updatedRecipeData.title = updatedRecipe.title;
  }

  if (updatedRecipe.ingredients) {
    updatedRecipeData.ingredients = updatedRecipe.ingredients;
  }

  if (updatedRecipe.steps) {
    updatedRecipeData.steps = updatedRecipe.steps;
  }

  const newvalues = {
    $set: updatedRecipeData
  };
  const updateInfo = await recipesCollection.updateOne({ _id: id }, newvalues);
  // prettier-ignore
  if (updateInfo.modifiedCount == 0) { // eslint-disable-line eqeqeq
    throw new Error("Could not update recipe successfully");
  }

  return this.getRecipe(id);
};

exports.removeRecipe = async function removeRecipe(id) {
  if (id === undefined || !id) {
    throw new Error("The id argument was not provided to removeRecipe");
  }
  checkIsProperString(id, "id");

  const recipesCollection = await recipes();
  const deletionInfo = await recipesCollection.removeOne({ _id: id });

  if (deletionInfo.deletedCount === 0) {
    throw new Error(`Could not delete recipe with id of ${id}`);
  }
};
