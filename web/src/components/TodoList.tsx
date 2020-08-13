/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { Todo } from "../generated/graphql";
import { IconButton } from "theme-ui";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TodoTile } from "./TodoTile";

type TodoListProps = {
  todos: Todo[];
  mutations: {
    markComplete: (todo: Todo) => void;
    markIncomplete: (todo: Todo) => void;
    sortUp: (todo: Todo, todoIndex: number) => void;
    sortDown: (todo: Todo, todoIndex: number) => void;
    deleteTodo: (todo: Todo) => void;
  };
  currentCategory: string | undefined;
  sortable?: boolean;
  deleteable?: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  mutations,
  currentCategory,
  sortable = false,
  deleteable = false,
}) => {
  const { sortUp, sortDown } = mutations;
  const [showSortingControls, setShowSortingControls] = useState(false);
  const toggleSortingControls = () => {
    setShowSortingControls(!showSortingControls);
  };
  return (
    <React.Fragment>
      <div sx={{ display: "flex", flex: 1, justifyContent: "center" }}>
        <ul
          sx={{
            listStyle: "none",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 0,
          }}
        >
          {todos.map((todo, todoIndex) => (
            <div sx={{ display: "flex" }} key={`todoTile${todo.nodeId}`}>
              {sortable && showSortingControls ? (
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {todoIndex > 0 ? (
                    <IconButton
                      sx={{
                        height: 12,
                        width: 12,
                        p: 0,
                        m: 0,
                      }}
                      onClick={() => sortUp(todo, todoIndex)}
                    >
                      <FaArrowUp />
                    </IconButton>
                  ) : null}
                  {todoIndex !== todos.length - 1 ? (
                    <IconButton
                      sx={{
                        border: "none",
                        height: 12,
                        width: 12,
                        p: 0,
                        m: 0,
                      }}
                      onClick={() => sortDown(todo, todoIndex)}
                    >
                      <FaArrowDown />
                    </IconButton>
                  ) : null}
                </div>
              ) : null}
              <TodoTile
                todo={todo}
                mutations={mutations}
                currentCategory={currentCategory}
                deleteable={deleteable}
              />
            </div>
          ))}
        </ul>
      </div>
      {sortable ? (
        <div sx={{ cursor: "pointer" }} onClick={toggleSortingControls}>
          {showSortingControls ? "hide sorting" : "show sorting"}
        </div>
      ) : null}
    </React.Fragment>
  );
};
