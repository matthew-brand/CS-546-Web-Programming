// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const todo = require("./todo.js");

const main = async () => {
  // 1
  const task1 = await todo.createTask(
    "Ponder Dinosaurs",
    "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
  );
  console.log(task1);
  // 2
  const task2 = await todo.createTask(
    "Play Pokemon with Twitch TV",
    "Should we revive Helix?"
  );
  console.log(task2);
  // 3
  const allTasks = await todo.getAllTasks();
  console.log(allTasks);
  // 4
  await todo.removeTask(task1._id);
  const allTasks2 = await todo.getAllTasks();
  // 5
  console.log(allTasks2);
  // 6
  const completedTask = await todo.completeTask(task2._id);
  // 7
  console.log(completedTask);
};

main().catch(error => {
  console.log(error);
});
