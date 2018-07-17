// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const express = require("express");

const router = express.Router();
const data = require("../data");

const recipeData = data.recipes;

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

router.get("/:id", async (req, res) => {
  try {
    const recipe = await recipeData.getRecipe(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipeList = await recipeData.getAllRecipes();
    res.json(recipeList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const recipePostData = req.body;

  if (!recipePostData) {
    res.status(400).json({ error: "You must provide data to create a recipe" });
    return;
  }

  if (!recipePostData.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }

  if (!recipePostData.ingredients) {
    res.status(400).json({ error: "You must provide ingredients" });
    return;
  }

  if (!recipePostData.steps) {
    res.status(400).json({ error: "You must provide steps" });
    return;
  }

  checkIsProperString(recipePostData.title, "title");
  checkIsProperObject(recipePostData.ingredients, "description");
  checkIsProperObject(recipePostData.steps, "steps");

  try {
    const newRecipe = await recipeData.createRecipe(
      recipePostData.title,
      recipePostData.ingredients,
      recipePostData.steps
    );
    res.json(newRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;

  if (!updatedData) {
    res.status(400).json({ error: "You must provide data to update a recipe" });
    return;
  }

  if (!updatedData.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }

  if (!updatedData.ingredients) {
    res.status(400).json({ error: "You must provide ingredients" });
    return;
  }

  if (!updatedData.steps) {
    res.status(400).json({ error: "You must provide steps" });
    return;
  }

  try {
    await recipeData.getRecipe(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  try {
    await recipeData.putRecipe(req.params.id, updatedData);
    const recipe = await recipeData.getRecipe(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedData = req.body;

  if (!updatedData) {
    res.status(400).json({ error: "You must provide data to update a recipe" });
    return;
  }

  try {
    await recipeData.getRecipe(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  try {
    await recipeData.patchRecipe(req.params.id, updatedData);
    const recipe = await recipeData.getRecipe(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await recipeData.getRecipe(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
  try {
    await recipeData.removeRecipe(req.params.id);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
