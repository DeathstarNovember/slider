import gql from "graphql-tag";

export const nonNullable = <TValue>(
  value: (TValue & { __typename?: string }) | null | undefined
): value is TValue => {
  return value !== null && value !== undefined && !!value["__typename"];
};

export const userFragment = gql`
  fragment UserFragment on User {
    __typename
    id
    nodeId
    firstName
    lastName
    username
  }
`;

export const todoFragment = gql`
  fragment TodoFragment on Todo {
    __typename
    id
    nodeId
    name
    category
    dueDate
    completed
    sortOrder
    userId
    createdAt
    updatedAt
  }
`;

export const todosConnectionFragment = gql`
  fragment TodosConnectionFragment on TodosConnection {
    __typename
    totalCount
    pageInfo {
      __typename
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      __typename
      cursor
      node {
        ...TodoFragment
      }
    }
    nodes {
      ...TodoFragment
    }
  }
  ${todoFragment}
`;

export const currentUserQuery = gql`
  query CurrentUser($id: Int!) {
    userById(id: $id) {
      ...UserFragment
      todosByUserId {
        ...TodosConnectionFragment
      }
    }
  }
  ${userFragment}
  ${todosConnectionFragment}
`;

export const loginQuery = gql`
  query Login($condition: UserCondition) {
    allUsers(condition: $condition) {
      nodes {
        __typename
        id
        nodeId
        passwordHash
      }
    }
  }
`;
export const searchUserQuery = gql`
  query SearchUsers($condition: UserCondition) {
    allUsers(condition: $condition) {
      edges {
        node {
          __typename
          id
          nodeId
          firstName
          lastName
          username
        }
      }
    }
  }
`;
