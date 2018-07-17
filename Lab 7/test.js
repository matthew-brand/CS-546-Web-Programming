// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const recipes = require("./data/recipes.js");

const main = async () => {
  // 1
  // const task1 = await recipes.createRecipe("Test Title",["ingre 1", "ingre 2", "ingre 3"],["step 1", "step 2", "step 3"]);
  // console.log(task1);
  // const task2 = await recipes.getAllRecipes();
  // console.log(task2);
  // const task3 = await recipes.getRecipe("b3404564-20ee-45b9-96fe-1504bea6fab2");
  // console.log(task3);
  const task4 = await recipes.patchRecipe(
    "184f1a35-8f0f-4092-9154-76b902194093",
    { title: "This is a patch update!" }
  );

  console.log(JSON.stringify(task4));
};

main().catch(error => {
  console.log(error);
});
