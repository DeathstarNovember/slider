/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import { useApolloClient } from "@apollo/react-hooks";
import { useCurrentUserLazyQuery } from "./generated/graphql";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";

const App = () => {
  const client = useApolloClient();
  const [userLoggedIn, setUserLoggedIn] = useState<string | null>(
    localStorage.getItem("hash")
  );
  const [getCurrentUser, { data }] = useCurrentUserLazyQuery();
  const logout = () => {
    client.clearStore();
    localStorage.clear();
    setUserLoggedIn(null);
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
