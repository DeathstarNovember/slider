/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import {
  useLoginLazyQuery,
  useCreateUserMutation,
  CreateUserInput,
  UserInput,
} from "../generated/graphql";
import bcrypt from "bcryptjs";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

type LoginValues = {
  username: string | null;
  password: string | null;
};
type SignupValues = {
  firstName: string | null;
  lastName: string | null;
};

type LoginProps = {
  setUserLoggedIn: (arg0: string) => void;
};

const createUserMutation = gql`
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
    onCompleted: (value) => {
      const newUser = value.createUser?.user;
      login({ variables: { condition: { username } } });
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
      }}
    >
      {signupFormVisible ? (
        <React.Fragment>
          <input
            sx={{ p: 2, fontSize: 4 }}
            placeholder="first name"
            value={firstName || undefined}
            onChange={setFirstName}
          />
          <input
            sx={{ my: 3, p: 2, fontSize: 4 }}
            placeholder="last name"
            value={lastName || undefined}
            onChange={setLastName}
          />
        </React.Fragment>
      ) : null}
      <input
        sx={{ p: 2, fontSize: 4 }}
        placeholder="username"
        type="text"
        value={username || undefined}
        onChange={setUsername}
      />
      <input
        sx={{ my: 3, p: 2, fontSize: 4 }}
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
  );
};
