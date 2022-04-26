import React, { useCallback, useState } from "react";
import { generateUniqueId } from "../utils";
import AdditionUnit from "./AdditionUnit";

const basicCardStyle = {
  margin: "8px",
  //   border: "2px solid gray",
  padding: "4px",
  width: "250px",
  height: "300px",
  backgroundColor: "#99ffff",
};

const Todo = ({ todo, updateItemsInTodo, removeTodo }) => {
  const [itemText, setItemText] = useState("");
  const updateItemText = useCallback(
    (event) => {
      const text = event.target?.value;
      setItemText(text);
    },
    [setItemText]
  );
  const addItemToTodo = useCallback(() => {
    const itemId = generateUniqueId();
    const newItemList = [
      ...todo.itemList,
      { text: itemText, id: itemId, isDone: false },
    ];
    const updatedTodo = { ...todo, itemList: newItemList };
    updateItemsInTodo(updatedTodo);
    setItemText("");
  }, [updateItemsInTodo, itemText, todo]);

  const markItemAsDone = useCallback(
    (item) => {
      const updatedItem = { ...item, isDone: true };
      const remainingItems = todo.itemList.filter(
        (item) => item.id !== updatedItem.id
      );
      const updatedTodo = {
        ...todo,
        itemList: [...remainingItems, updatedItem],
      };
      updateItemsInTodo(updatedTodo);
    },
    [updateItemsInTodo, todo]
  );
  return (
    <>
      <div style={basicCardStyle}>
        <h4>{todo.title}</h4>

        <div>
          <button onClick={() => removeTodo(todo)}>Delete</button>
          <AdditionUnit
            inputValue={itemText}
            onInputChange={updateItemText}
            onButtonClick={addItemToTodo}
            buttonLabel="Add Item"
          />
        </div>
        <div>
          <ul>
            {todo.itemList.map((item) => (
              <li key={item.id}>
                {item.isDone ? (
                  <del>{item.text}</del>
                ) : (
                  <>
                    {item.text} &nbsp; &nbsp;
                    <button onClick={() => markItemAsDone(item)}>Done</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
