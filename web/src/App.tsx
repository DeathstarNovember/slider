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
          borderColor: theme.colors.secondary,
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
  return (
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
            {sortable ? (
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
  const selectCategory = (category: string) => {
    setCurrentCategory(category);
  };
  const clearCategory = () => {
    setCurrentCategory(undefined);
  };
  return (
    <div sx={{ display: "flex", justifyContent: "space-evenly" }}>
      {categories.map((category, categoryIndex) => (
        <div
          key={`categoryTab${categoryIndex}`}
          sx={{ cursor: "pointer" }}
          onClick={
            currentCategory === category
              ? clearCategory
              : () => selectCategory(category)
          }
        >
          <div
            sx={
              currentCategory === category
                ? { color: theme.colors.secondary }
                : undefined
            }
          >
            {category}
          </div>
        </div>
      ))}
    </div>
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

  const filterByCategory = (allTodos: Todo[], category?: string) => {
    return category
      ? allTodos.filter((todo) => todo.category === category)
      : allTodos;
  };

  const categoryCompleteTodos = filterByCategory(completed, currentCategory);
  const categoryIncompleteTodos = filterByCategory(incomplete, currentCategory);
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
      <TodoList
        todos={categoryIncompleteTodos}
        mutations={todoMutations}
        currentCategory={currentCategory}
        sortable={true}
      />
      <TodoList
        todos={categoryCompleteTodos}
        mutations={todoMutations}
        currentCategory={currentCategory}
      />
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

type CompProps = {};
const Comp: React.FC<CompProps> = ({}) => {
  const [state, setState] = useState(undefined);

  return null;
};
