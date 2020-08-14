/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { CreateTodoInput, Todo } from "../generated/graphql";

type TodoFormProps = {
  todo?: Todo;
  createTodo?: (input: CreateTodoInput) => void;
  updateTodo?: (input: Todo) => void;
  cancel?: () => void;
  currentCategory: string | undefined;
  userId: number;
  sortOrder: number;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  todo,
  createTodo,
  updateTodo,
  cancel,
  currentCategory,
  userId,
  sortOrder,
}) => {
  const [name, setName] = useState<string>(todo?.name || "");
  const todoCategory = todo?.category;
  const [category, setCategory] = useState<string>(
    todoCategory || currentCategory || ""
  );
  const newTodoInput = {
    name,
    category: currentCategory || category,
    completed: false,
    userId,
    sortOrder,
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value);
  };
  const clearNameField = () => {
    setName("");
  };
  const clearCategoryField = () => {
    setCategory("");
  };
  const clearForm = () => {
    clearNameField();
    clearCategoryField();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo && updateTodo) {
      updateTodo({ ...todo, name, category });
    } else if (createTodo) {
      createTodo({ todo: newTodoInput });
      if (!currentCategory) {
        clearForm();
      } else {
        clearNameField();
      }
    }
  };
  const handleCancel = () => {
    clearForm();
    if (cancel) cancel();
  };
  useEffect(() => {
    if (currentCategory || todoCategory) {
      setCategory(todoCategory || currentCategory || "");
    } else {
      clearCategoryField();
    }
  }, [currentCategory, todoCategory]);
  const disableSubmit = !name || !category;
  return (
    <form sx={{ display: "flex", mb: 0 }}>
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
      {!currentCategory || todo ? (
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
        {updateTodo ? "Update" : "Create"}
      </button>
      {cancel ? (
        <button
          sx={{
            border: "none",
            background: "background",
            color: "text",
            ml: 3,
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      ) : null}
    </form>
  );
};
