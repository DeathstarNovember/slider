/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, IconButton } from "theme-ui";
import theme from "./utils/theme";
import { useApolloClient } from "@apollo/react-hooks";
import {
  Todo,
  useCurrentUserLazyQuery,
  useLoginLazyQuery,
  User,
  CreateTodoInput,
} from "./generated/graphql";
import bcrypt from "bcryptjs";
import "./App.css";
import { nonNullable } from "./utils/graphql";
import { useTodoList } from "./hooks/useTodoList";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type LoginValues = {
  username: string | null;
  password: string | null;
};

type LoginProps = {
  setUserLoggedIn: (arg0: string) => void;
};

const Login: React.FC<LoginProps> = ({ setUserLoggedIn }) => {
  const initialFormValues: LoginValues = { username: null, password: null };
  const [loginValues, setLoginValues] = useState<LoginValues>(
    initialFormValues
  );
  const { username, password } = loginValues;
  const [login] = useLoginLazyQuery({
    onCompleted: (value) => {
      const loginCandidate = value.allUsers?.nodes[0];
      const pwHash = loginCandidate?.passwordHash;
      if (password && loginCandidate && pwHash) {
        const match = bcrypt.compareSync(password, pwHash);
        if (match) {
          localStorage.setItem("hash", loginCandidate.id.toString());
          setUserLoggedIn(loginCandidate.id.toString());
        }
        setLoginValues(initialFormValues);
      }
    },
    onError: () => {
      setLoginValues(initialFormValues);
    },
  });
  const setUsername = (e: any) => {
    setLoginValues({ ...loginValues, username: e.currentTarget.value });
  };
  const setPassword = (e: any) => {
    setLoginValues({ ...loginValues, password: e.currentTarget.value });
  };
  const handleSubmit = () => {
    if (username && password) {
      login({ variables: { condition: { username } } });
    }
    return;
  };
  return (
    <div>
      <input
        placeholder="username"
        type="text"
        value={username || undefined}
        onChange={setUsername}
      />
      <input
        placeholder="password"
        type="password"
        value={password || undefined}
        onChange={setPassword}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

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

const TodoTile: React.FC<TodoTileProps> = ({
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
          py: 3,
          px: 2,
          my: 1,
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
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  mutations,
  currentCategory,
  sortable = false,
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

type CategoryTabsProps = {
  categories: string[];
  currentCategory: string | undefined;
  setCurrentCategory: (arg: string | undefined) => void;
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  currentCategory,
  setCurrentCategory,
}) => {
  const clearCategory = () => {
    setCurrentCategory(undefined);
  };
  const selectCategory = (category: string) => {
    if (category === currentCategory) {
      clearCategory();
    }
    setCurrentCategory(category);
  };
  const categoriesForDisplay = ["All", ...categories];
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {categoriesForDisplay.map((category, categoryIndex) => (
        <div
          key={`categoryTab${categoryIndex}`}
          onClick={
            category === "All" ? clearCategory : () => selectCategory(category)
          }
          sx={{
            cursor: "pointer",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color:
              currentCategory === category ? theme.colors.secondary : undefined,
          }}
        >
          <div> {category} </div>
        </div>
      ))}
    </div>
  );
};

type TodoFormProps = {
  createTodo: (input: CreateTodoInput) => void;
  currentCategory: string | undefined;
  userId: number;
  sortOrder: number;
};

const TodoForm: React.FC<TodoFormProps> = ({
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

type DashboardProps = {
  currentUser: User;
  logout: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ currentUser, logout }) => {
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
    <div sx={{ m: 3 }}>
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
            <button onClick={logout}>Logout</button>
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

const App = () => {
  const client = useApolloClient();
  const [userLoggedIn, setUserLoggedIn] = useState<string | null>(
    localStorage.getItem("hash")
  );
  const [getCurrentUser, { data }] = useCurrentUserLazyQuery();
  const logout = () => {
    setUserLoggedIn(null);
    client.clearStore();
    localStorage.clear();
  };

  useEffect(() => {
    if (userLoggedIn) {
      getCurrentUser({ variables: { id: Number(userLoggedIn) } });
    } else {
      client.clearStore();
    }
  }, [userLoggedIn]);
  const currentUser = data?.userById;

  if (currentUser) {
    return <Dashboard currentUser={currentUser} logout={logout} />;
  } else {
    return <Login setUserLoggedIn={setUserLoggedIn} />;
  }
};

export default App;
