/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import { Todo } from "../generated/graphql";
import theme from "../utils/theme";
import { TodoForm } from "./TodoForm";
import { FaEdit, FaRecycle, FaCheck, FaTimes } from "react-icons/fa";

type TodoTileProps = {
  todo: Todo;
  mutations: {
    markComplete: (todo: Todo) => void;
    markIncomplete: (todo: Todo) => void;
    sortUp: (todo: Todo, todoIndex: number) => void;
    sortDown: (todo: Todo, todoIndex: number) => void;
    deleteTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
  };
  currentCategory: string | undefined;
  deleteable?: boolean;
};
const iconStyles = {
  padding: 3,
  margin: 3,
};

export const TodoTile: React.FC<TodoTileProps> = ({
  todo,
  mutations,
  currentCategory,
  deleteable = false,
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const { markComplete, markIncomplete, deleteTodo, updateTodo } = mutations;
  const toggleCompleted = () => {
    if (todo.completed) {
      markIncomplete(todo);
    } else {
      markComplete(todo);
    }
  };
  const handleDelete = () => {
    deleteTodo(todo);
  };
  const revealForm = () => {
    setFormVisible(true);
  };
  const hideForm = () => {
    setFormVisible(false);
  };
  return (
    <div sx={{ display: "flex", flex: 1 }}>
      <li
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          borderColor: theme.colors.highlight,
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 6,
          background: "#3f4973",
          p: 6,
          my: 3,
        }}
      >
        {!formVisible ? (
          <div>
            {currentCategory ? "" : `${todo.category}:`} {todo.name}
          </div>
        ) : null}
        <div>
          {deleteable ? (
            <FaTimes style={iconStyles} onClick={handleDelete} />
          ) : null}
          {formVisible ? (
            <TodoForm
              todo={todo}
              updateTodo={updateTodo}
              currentCategory={currentCategory}
              sortOrder={todo.sortOrder}
              userId={todo.userId}
              cancel={hideForm}
            />
          ) : (
            <React.Fragment>
              <FaEdit style={iconStyles} onClick={revealForm} />
              {todo.completed ? (
                <FaRecycle style={iconStyles} onClick={toggleCompleted} />
              ) : (
                <FaCheck style={iconStyles} onClick={toggleCompleted} />
              )}
            </React.Fragment>
          )}
        </div>
      </li>
    </div>
  );
};
