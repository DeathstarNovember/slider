/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { useLoginLazyQuery, useCreateUserMutation } from "../generated/graphql";
import bcrypt from "bcryptjs";
import gql from "graphql-tag";
import { RouteComponentProps, navigate } from "@reach/router";

type LoginValues = {
  username: string | null;
  password: string | null;
};
type SignupValues = {
  firstName: string | null;
  lastName: string | null;
};

type LoginProps = RouteComponentProps & {
  setUserLoggedIn: (arg0: string) => void;
};

export const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        __typename
        id
        firstName
        lastName
        username
        passwordHash
      }
    }
  }
`;

const inputStyles = {
  my: 2,
  p: 6,
  fontSize: 4,
  borderRadius: 6,
  background: "#a0a9d1",
  fontFamily: "body",
  fontWeight: 300,
  letterSpacing: 2,
};

export const Login: React.FC<LoginProps> = ({ setUserLoggedIn }) => {
  const initialLoginFormValues: LoginValues = {
    username: null,
    password: null,
  };
  const initialSignUpFormValues: SignupValues = {
    firstName: null,
    lastName: null,
  };
  const [loginValues, setLoginValues] = useState<LoginValues>(
    initialLoginFormValues
  );
  const [signupValues, setSignupValues] = useState<SignupValues>(
    initialSignUpFormValues
  );
  const [signupFormVisible, setSignupFormVisible] = useState(false);

  const { username, password } = loginValues;
  const { firstName, lastName } = signupValues;
  const loginValuesPresent = username && password;
  const signupValuesPresent = loginValuesPresent && firstName && lastName;
  const [login] = useLoginLazyQuery({
    onCompleted: (value) => {
      const loginCandidate = value.allUsers?.nodes[0];
      const pwHash = loginCandidate?.passwordHash;
      if (password && loginCandidate && pwHash) {
        const match = bcrypt.compareSync(password, pwHash);
        if (match) {
          localStorage.setItem("hash", loginCandidate.id.toString());
          setUserLoggedIn(loginCandidate.id.toString());
          navigate("/");
        }
        setLoginValues(initialLoginFormValues);
      }
    },
    onError: () => {
      setLoginValues(initialLoginFormValues);
      alert("Username not found");
    },
  });
  const [createUser] = useCreateUserMutation({
    onCompleted: () => {
      login({ variables: { condition: { username } } });
      navigate("/");
    },
  });
  const setUsername = (e: any) => {
    setLoginValues({ ...loginValues, username: e.currentTarget.value });
  };
  const setPassword = (e: any) => {
    setLoginValues({ ...loginValues, password: e.currentTarget.value });
  };
  const setFirstName = (e: any) => {
    setSignupValues({ ...signupValues, firstName: e.currentTarget.value });
  };
  const setLastName = (e: any) => {
    setSignupValues({ ...signupValues, lastName: e.currentTarget.value });
  };
  const handleSubmit = () => {
    if (loginValuesPresent) {
      login({ variables: { condition: { username } } });
    }
    return;
  };
  const handleSignup = () => {
    if (signupValuesPresent && password) {
      createUser({
        variables: {
          input: {
            user: {
              firstName,
              lastName,
              username,
              passwordHash: bcrypt.hashSync(password),
            },
          },
        },
      });
    }
  };
  return (
    <div
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        letterSpacing: 2,
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 9,
          borderRadius: 6,
          background: "#5e6baa",
        }}
      >
        {signupFormVisible ? (
          <React.Fragment>
            <input
              sx={inputStyles}
              placeholder="first name"
              value={firstName || undefined}
              onChange={setFirstName}
            />
            <input
              sx={inputStyles}
              placeholder="last name"
              value={lastName || undefined}
              onChange={setLastName}
            />
          </React.Fragment>
        ) : null}
        <input
          sx={inputStyles}
          placeholder="username"
          type="text"
          value={username || undefined}
          onChange={setUsername}
        />
        <input
          sx={inputStyles}
          placeholder="password"
          type="password"
          value={password || undefined}
          onChange={setPassword}
        />
        {!signupFormVisible ? (
          <div
            sx={{
              p: 2,
              fontSize: 6,
              fontWeight: 200,
              color: loginValuesPresent ? "text" : "background",
              cursor: loginValuesPresent ? "pointer" : "default",
            }}
            onClick={handleSubmit}
          >
            Login
          </div>
        ) : null}
        {signupFormVisible ? (
          <div>
            <div
              sx={{
                p: 2,
                fontSize: 4,
                fontWeight: 200,
                color: "text",
                cursor: "pointer",
              }}
              onClick={handleSignup}
            >
              Submit
            </div>
            <div
              sx={{
                p: 2,
                fontSize: 4,
                fontWeight: 200,
                color: "text",
                cursor: "pointer",
              }}
              onClick={() => setSignupFormVisible(false)}
            >
              Cancel
            </div>
          </div>
        ) : (
          <div
            sx={{
              p: 2,
              fontSize: 4,
              fontWeight: 200,
              color: "text",
              cursor: "pointer",
            }}
            onClick={() => setSignupFormVisible(true)}
          >
            Sign Up
          </div>
        )}
      </div>
    </div>
  );
};
