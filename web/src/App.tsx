/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, useColorMode } from "theme-ui";
import { useApolloClient } from "@apollo/react-hooks";
import { useCurrentUserLazyQuery } from "./generated/graphql";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Router, navigate } from "@reach/router";

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
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    if (userLoggedIn) {
      getCurrentUser({ variables: { id: Number(userLoggedIn) } });
    } else {
      client.clearStore();
      navigate("/login");
    }
  }, [userLoggedIn, getCurrentUser, client]);
  const currentUser = data?.userById;
  return (
    <Router>
      {currentUser ? (
        <Dashboard path="/" currentUser={currentUser} logout={logout} />
      ) : null}
      <Login path="/login" setUserLoggedIn={setUserLoggedIn} />
    </Router>
  );
};

export default App;
