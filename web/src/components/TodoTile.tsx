/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Todo } from "../generated/graphql";
import theme from "../utils/theme";

type TodoTileProps = {
  todo: Todo;
  mutations: {
    markComplete: (todo: Todo) => void;
    markIncomplete: (todo: Todo) => void;
    sortUp: (todo: Todo, todoIndex: number) => void;
    sortDown: (todo: Todo, todoIndex: number) => void;
    deleteTodo: (todo: Todo) => void;
  };
  currentCategory: string | undefined;
};

export const TodoTile: React.FC<TodoTileProps> = ({
  todo,
  mutations,
  currentCategory,
}) => {
  const { markComplete, markIncomplete } = mutations;
  const toggleCompleted = () => {
    if (todo.completed) {
      markIncomplete(todo);
    } else {
      markComplete(todo);
    }
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
