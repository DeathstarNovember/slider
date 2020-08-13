/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import { Todo } from "../generated/graphql";
import theme from "../utils/theme";
import { TodoForm } from "./TodoForm";

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

export const TodoTile: React.FC<TodoTileProps> = ({
  todo,
  mutations,
  currentCategory,
  deleteable = false,
}) => {
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
        <div>
          {currentCategory ? "" : `${todo.category}:`} {todo.name}
        </div>
        <div>
          {deleteable ? (
            <button
              sx={{
                border: "none",
                height: 12,
                width: 12,
                borderRadius: 3,
                bg: "primary",
                p: 0,
                m: 2,
              }}
              onClick={handleDelete}
            />
          ) : null}
          <TodoForm
            todo={todo}
            updateTodo={updateTodo}
            currentCategory={currentCategory}
            sortOrder={todo.sortOrder}
            userId={todo.userId}
          />
          <button
            sx={{
              border: "none",
              height: 12,
              width: 12,
              borderRadius: 3,
              bg: todo.completed ? "green" : "red",
              p: 0,
              m: 0,
            }}
            onClick={toggleCompleted}
          />
        </div>
      </li>
    </div>
  );
};
