const readline = require('readline');
const fs = require('fs');

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

const todosFile = './todos.txt';

const getTodos = () => {
  try {
    const todos = fs.readFileSync(todosFile, 'utf-8');
    return JSON.parse(todos);
  } catch (err) {
    return [];
  }
};

const saveTodos = (todos) => {
  fs.writeFileSync(todosFile, JSON.stringify(todos));
};

const addTodo = () => {
  rl.question('Enter a todo: ', todo => {
    const todos = getTodos();
    todos.push(todo);
    saveTodos(todos);
    console.log(`${todo} added to your todo list.`);
    rl.close();
    main();
  });
};

const printTodos = () => {
  const todos = getTodos();
  console.log(`You have ${todos.length} todos:`);
  todos.forEach((todo, index) => {
    console.log(`${index + 1}. ${todo}`);
  });
};

const main = () => {
  rl.question('What would you like to do? (list/add/remove/quit): ', answer => {
    switch (answer) {
      case 'add':
        addTodo();
        break
      case 'list':
        printTodos();
        rl.close();
      default:
        main();
    }
  });
};

main();