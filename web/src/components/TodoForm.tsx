/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { CreateTodoInput } from "../generated/graphql";

type TodoFormProps = {
  createTodo: (input: CreateTodoInput) => void;
  currentCategory: string | undefined;
  userId: number;
  sortOrder: number;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  createTodo,
  currentCategory,
  userId,
  sortOrder,
}) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>(currentCategory || "");
  const newTodoInput = {
    name,
    category: currentCategory || category,
    completed: false,
    userId,
    sortOrder,
  };
  console.warn({ category });
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value);
    console.warn({ value: e.currentTarget.value, category });
  };
  const clearForm = () => {
    setName("");
    setCategory("");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({ todo: newTodoInput });
    clearForm();
  };
  useEffect(() => {
    if (currentCategory) {
      setCategory(currentCategory);
    } else {
      setCategory("");
    }
  }, [currentCategory]);
  const disableSubmit = !name || !category;
  return (
    <form sx={{ display: "flex", flex: 1, mt: 5, mb: 0 }}>
      <input
        sx={{
          mr: 3,
          border: "none",
          p: 3,
          backgroundColor: "input",
          display: "flex",
          flex: 1,
        }}
        placeholder="name"
        value={name}
        onChange={handleNameChange}
      />
      {!currentCategory ? (
        <input
          sx={{
            border: "none",
            p: 3,
            backgroundColor: "input",
            display: "flex",
            flex: 1,
          }}
          placeholder="category"
          value={category}
          onChange={handleCategoryChange}
        />
      ) : null}
      <button
        sx={{
          border: "none",
          background: !disableSubmit ? "background" : "primary",
          color: "text",
          ml: 3,
        }}
        disabled={disableSubmit}
        onClick={handleSubmit}
      >
        Create
      </button>
    </form>
  );
};
