import React, { useCallback, useMemo, useState } from "react";
import AdditionUnit from "./AdditionUnit";
import SearchTodo from "./SearchTodo";
import Todo from "./Todo";
import { generateUniqueId } from "../utils";

const flexbox = {
  display: "flex",
};

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const [todoTitle, setTodoTitle] = useState("");
  const [filterText, setFiltertext] = useState("");

  const updateTodoTitle = useCallback(
    (event) => {
      const title = event.target?.value;
      setTodoTitle(title);
    },
    [setTodoTitle]
  );

  const addNewTodo = useCallback(() => {
    const id = generateUniqueId();
    console.log("id: ", id);
    setTodoList([
      ...todoList,
      { id, title: todoTitle, itemList: [], idDone: false },
    ]);
    setTodoTitle("");
  }, [setTodoList, todoTitle, todoList]);

  const updateItemsInTodo = useCallback(
    (todo) => {
      const remainingTodos = todoList.filter((item) => item.id !== todo.id);
      const updatedTodo = {
        ...todo,
      };
      setTodoList([updatedTodo, ...remainingTodos]);
    },
    [setTodoList, todoList]
  );

  const filteredTodoList = useMemo(
    () =>
      !!filterText
        ? todoList.filter((todo) => todo.title.includes(filterText))
        : todoList,
    [filterText, todoList]
  );

  const removeTodo = useCallback(
    (todo) => {
      const remainingTodos = todoList.filter((item) => item.id !== todo.id);
      setTodoList(remainingTodos);
    },
    [setTodoList, todoList]
  );

  return (
    <>
      <SearchTodo filtertext={filterText} setFilterText={setFiltertext} />
      <AdditionUnit
        inputValue={todoTitle}
        onInputChange={updateTodoTitle}
        onButtonClick={addNewTodo}
        buttonLabel="Add new Todo"
      />
      <div style={flexbox}>
        {filteredTodoList.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            updateItemsInTodo={updateItemsInTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
