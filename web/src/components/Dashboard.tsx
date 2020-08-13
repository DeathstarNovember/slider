/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { User, Todo } from "../generated/graphql";
import { nonNullable } from "../utils/graphql";
import { useTodoList } from "../hooks/useTodoList";
import { CategoryTabs } from "./CategoryTabs";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { RouteComponentProps } from "@reach/router";

type DashboardProps = RouteComponentProps & {
  currentUser: User;
  logout: () => void;
};

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  logout,
}) => {
  const todos: Todo[] = currentUser.todosByUserId.nodes.filter(nonNullable);
  const {
    completed,
    incomplete,
    categories,
    createTodo,
    ...todoMutations
  } = useTodoList(todos, currentUser);
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const [showCompletedTodos, setShowCompleted] = useState<boolean>(false);

  const filterByCategory = (allTodos: Todo[], category?: string) => {
    return category
      ? allTodos.filter((todo) => todo.category === category)
      : allTodos;
  };

  const categoryCompleteTodos = filterByCategory(completed, currentCategory);
  const categoryIncompleteTodos = filterByCategory(incomplete, currentCategory);
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompletedTodos);
  };
  return (
    <div sx={{ m: 10 }}>
      <div
        sx={{
          mb: 7,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Slider</h1>
        {currentUser ? (
          <div sx={{ display: "flex", alignItems: "center" }}>
            <h3>{currentUser.username}</h3>
            <button type="submit" onClick={logout}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
      <CategoryTabs
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <TodoForm
        createTodo={createTodo}
        currentCategory={currentCategory}
        userId={currentUser.id}
        sortOrder={incomplete.length}
      />
      <TodoList
        todos={categoryIncompleteTodos}
        mutations={todoMutations}
        currentCategory={currentCategory}
        sortable={true}
      />
      {showCompletedTodos ? (
        <TodoList
          todos={categoryCompleteTodos}
          mutations={todoMutations}
          currentCategory={currentCategory}
        />
      ) : null}
      <div sx={{ cursor: "pointer" }} onClick={toggleShowCompleted}>
        {showCompletedTodos ? "hide completed todos" : "show completed todos"}
      </div>
    </div>
  );
};
