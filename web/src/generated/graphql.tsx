import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
  Datetime: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `SequelizeMeta`. */
  allSequelizeMetas?: Maybe<SequelizeMetasConnection>;
  /** Reads and enables pagination through a set of `Todo`. */
  allTodos?: Maybe<TodosConnection>;
  /** Reads and enables pagination through a set of `User`. */
  allUsers?: Maybe<UsersConnection>;
  sequelizeMetaByName?: Maybe<SequelizeMeta>;
  todoById?: Maybe<Todo>;
  userById?: Maybe<User>;
  /** Reads a single `SequelizeMeta` using its globally unique `ID`. */
  sequelizeMeta?: Maybe<SequelizeMeta>;
  /** Reads a single `Todo` using its globally unique `ID`. */
  todo?: Maybe<Todo>;
  /** Reads a single `User` using its globally unique `ID`. */
  user?: Maybe<User>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllSequelizeMetasArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SequelizeMetasOrderBy>>;
  condition?: Maybe<SequelizeMetaCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllTodosArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TodosOrderBy>>;
  condition?: Maybe<TodoCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySequelizeMetaByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySequelizeMetaArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTodoArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};


/** Methods to use when ordering `SequelizeMeta`. */
export enum SequelizeMetasOrderBy {
  Natural = 'NATURAL',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `SequelizeMeta` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SequelizeMetaCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `SequelizeMeta` values. */
export type SequelizeMetasConnection = {
  __typename?: 'SequelizeMetasConnection';
  /** A list of `SequelizeMeta` objects. */
  nodes: Array<Maybe<SequelizeMeta>>;
  /** A list of edges which contains the `SequelizeMeta` and cursor to aid in pagination. */
  edges: Array<SequelizeMetasEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SequelizeMeta` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type SequelizeMeta = Node & {
  __typename?: 'SequelizeMeta';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  name: Scalars['String'];
};

/** A `SequelizeMeta` edge in the connection. */
export type SequelizeMetasEdge = {
  __typename?: 'SequelizeMetasEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SequelizeMeta` at the end of the edge. */
  node?: Maybe<SequelizeMeta>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** Methods to use when ordering `Todo`. */
export enum TodosOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  DueDateAsc = 'DUE_DATE_ASC',
  DueDateDesc = 'DUE_DATE_DESC',
  CompletedAsc = 'COMPLETED_ASC',
  CompletedDesc = 'COMPLETED_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Todo` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TodoCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `dueDate` field. */
  dueDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `completed` field. */
  completed?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `category` field. */
  category?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};


/** A connection to a list of `Todo` values. */
export type TodosConnection = {
  __typename?: 'TodosConnection';
  /** A list of `Todo` objects. */
  nodes: Array<Maybe<Todo>>;
  /** A list of edges which contains the `Todo` and cursor to aid in pagination. */
  edges: Array<TodosEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Todo` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Todo = Node & {
  __typename?: 'Todo';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
  dueDate?: Maybe<Scalars['Datetime']>;
  completed: Scalars['Boolean'];
  category?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `User` that is related to this `Todo`. */
  userByUserId?: Maybe<User>;
};

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Todo`. */
  todosByUserId: TodosConnection;
};


export type UserTodosByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TodosOrderBy>>;
  condition?: Maybe<TodoCondition>;
};

/** A `Todo` edge in the connection. */
export type TodosEdge = {
  __typename?: 'TodosEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Todo` at the end of the edge. */
  node?: Maybe<Todo>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  PasswordHashAsc = 'PASSWORD_HASH_ASC',
  PasswordHashDesc = 'PASSWORD_HASH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: Maybe<Scalars['String']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `SequelizeMeta`. */
  createSequelizeMeta?: Maybe<CreateSequelizeMetaPayload>;
  /** Creates a single `Todo`. */
  createTodo?: Maybe<CreateTodoPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Updates a single `SequelizeMeta` using its globally unique id and a patch. */
  updateSequelizeMeta?: Maybe<UpdateSequelizeMetaPayload>;
  /** Updates a single `SequelizeMeta` using a unique key and a patch. */
  updateSequelizeMetaByName?: Maybe<UpdateSequelizeMetaPayload>;
  /** Updates a single `Todo` using its globally unique id and a patch. */
  updateTodo?: Maybe<UpdateTodoPayload>;
  /** Updates a single `Todo` using a unique key and a patch. */
  updateTodoById?: Maybe<UpdateTodoPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
  /** Deletes a single `SequelizeMeta` using its globally unique id. */
  deleteSequelizeMeta?: Maybe<DeleteSequelizeMetaPayload>;
  /** Deletes a single `SequelizeMeta` using a unique key. */
  deleteSequelizeMetaByName?: Maybe<DeleteSequelizeMetaPayload>;
  /** Deletes a single `Todo` using its globally unique id. */
  deleteTodo?: Maybe<DeleteTodoPayload>;
  /** Deletes a single `Todo` using a unique key. */
  deleteTodoById?: Maybe<DeleteTodoPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserById?: Maybe<DeleteUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSequelizeMetaArgs = {
  input: CreateSequelizeMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSequelizeMetaArgs = {
  input: UpdateSequelizeMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSequelizeMetaByNameArgs = {
  input: UpdateSequelizeMetaByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTodoByIdArgs = {
  input: UpdateTodoByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSequelizeMetaArgs = {
  input: DeleteSequelizeMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSequelizeMetaByNameArgs = {
  input: DeleteSequelizeMetaByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTodoByIdArgs = {
  input: DeleteTodoByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};

/** All input for the create `SequelizeMeta` mutation. */
export type CreateSequelizeMetaInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SequelizeMeta` to be created by this mutation. */
  sequelizeMeta: SequelizeMetaInput;
};

/** An input for mutations affecting `SequelizeMeta` */
export type SequelizeMetaInput = {
  name: Scalars['String'];
};

/** The output of our create `SequelizeMeta` mutation. */
export type CreateSequelizeMetaPayload = {
  __typename?: 'CreateSequelizeMetaPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SequelizeMeta` that was created by this mutation. */
  sequelizeMeta?: Maybe<SequelizeMeta>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `SequelizeMeta`. May be used by Relay 1. */
  sequelizeMetaEdge?: Maybe<SequelizeMetasEdge>;
};


/** The output of our create `SequelizeMeta` mutation. */
export type CreateSequelizeMetaPayloadSequelizeMetaEdgeArgs = {
  orderBy?: Maybe<Array<SequelizeMetasOrderBy>>;
};

/** All input for the create `Todo` mutation. */
export type CreateTodoInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Todo` to be created by this mutation. */
  todo: TodoInput;
};

/** An input for mutations affecting `Todo` */
export type TodoInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
  dueDate?: Maybe<Scalars['Datetime']>;
  completed: Scalars['Boolean'];
  category?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** The output of our create `Todo` mutation. */
export type CreateTodoPayload = {
  __typename?: 'CreateTodoPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Todo` that was created by this mutation. */
  todo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Todo`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
};


/** The output of our create `Todo` mutation. */
export type CreateTodoPayloadTodoEdgeArgs = {
  orderBy?: Maybe<Array<TodosOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  id?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateSequelizeMeta` mutation. */
export type UpdateSequelizeMetaInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SequelizeMeta` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SequelizeMeta` being updated. */
  sequelizeMetaPatch: SequelizeMetaPatch;
};

/** Represents an update to a `SequelizeMeta`. Fields that are set will be updated. */
export type SequelizeMetaPatch = {
  name?: Maybe<Scalars['String']>;
};

/** The output of our update `SequelizeMeta` mutation. */
export type UpdateSequelizeMetaPayload = {
  __typename?: 'UpdateSequelizeMetaPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SequelizeMeta` that was updated by this mutation. */
  sequelizeMeta?: Maybe<SequelizeMeta>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `SequelizeMeta`. May be used by Relay 1. */
  sequelizeMetaEdge?: Maybe<SequelizeMetasEdge>;
};


/** The output of our update `SequelizeMeta` mutation. */
export type UpdateSequelizeMetaPayloadSequelizeMetaEdgeArgs = {
  orderBy?: Maybe<Array<SequelizeMetasOrderBy>>;
};

/** All input for the `updateSequelizeMetaByName` mutation. */
export type UpdateSequelizeMetaByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SequelizeMeta` being updated. */
  sequelizeMetaPatch: SequelizeMetaPatch;
  name: Scalars['String'];
};

/** All input for the `updateTodo` mutation. */
export type UpdateTodoInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Todo` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Todo` being updated. */
  todoPatch: TodoPatch;
};

/** Represents an update to a `Todo`. Fields that are set will be updated. */
export type TodoPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  dueDate?: Maybe<Scalars['Datetime']>;
  completed?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** The output of our update `Todo` mutation. */
export type UpdateTodoPayload = {
  __typename?: 'UpdateTodoPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Todo` that was updated by this mutation. */
  todo?: Maybe<Todo>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Todo`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
};


/** The output of our update `Todo` mutation. */
export type UpdateTodoPayloadTodoEdgeArgs = {
  orderBy?: Maybe<Array<TodosOrderBy>>;
};

/** All input for the `updateTodoById` mutation. */
export type UpdateTodoByIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Todo` being updated. */
  todoPatch: TodoPatch;
  id: Scalars['Int'];
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  id?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  id: Scalars['Int'];
};

/** All input for the `deleteSequelizeMeta` mutation. */
export type DeleteSequelizeMetaInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SequelizeMeta` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `SequelizeMeta` mutation. */
export type DeleteSequelizeMetaPayload = {
  __typename?: 'DeleteSequelizeMetaPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SequelizeMeta` that was deleted by this mutation. */
  sequelizeMeta?: Maybe<SequelizeMeta>;
  deletedSequelizeMetaId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `SequelizeMeta`. May be used by Relay 1. */
  sequelizeMetaEdge?: Maybe<SequelizeMetasEdge>;
};


/** The output of our delete `SequelizeMeta` mutation. */
export type DeleteSequelizeMetaPayloadSequelizeMetaEdgeArgs = {
  orderBy?: Maybe<Array<SequelizeMetasOrderBy>>;
};

/** All input for the `deleteSequelizeMetaByName` mutation. */
export type DeleteSequelizeMetaByNameInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deleteTodo` mutation. */
export type DeleteTodoInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Todo` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Todo` mutation. */
export type DeleteTodoPayload = {
  __typename?: 'DeleteTodoPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Todo` that was deleted by this mutation. */
  todo?: Maybe<Todo>;
  deletedTodoId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Todo`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Todo`. May be used by Relay 1. */
  todoEdge?: Maybe<TodosEdge>;
};


/** The output of our delete `Todo` mutation. */
export type DeleteTodoPayloadTodoEdgeArgs = {
  orderBy?: Maybe<Array<TodosOrderBy>>;
};

/** All input for the `deleteTodoById` mutation. */
export type DeleteTodoByIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'CreateUserPayload' }
    & { user?: Maybe<(
      { __typename: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'username'>
    )> }
  )> }
);

export type TodoUpdateByIdMutationVariables = Exact<{
  input: UpdateTodoByIdInput;
}>;


export type TodoUpdateByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateTodoById?: Maybe<(
    { __typename?: 'UpdateTodoPayload' }
    & { todo?: Maybe<(
      { __typename: 'Todo' }
      & Pick<Todo, 'id' | 'nodeId' | 'name' | 'category' | 'dueDate' | 'completed' | 'sortOrder'>
    )> }
  )> }
);

export type TodoDeleteMutationVariables = Exact<{
  input: DeleteTodoInput;
}>;


export type TodoDeleteMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo?: Maybe<(
    { __typename?: 'DeleteTodoPayload' }
    & { todo?: Maybe<(
      { __typename: 'Todo' }
      & Pick<Todo, 'id' | 'nodeId'>
    )> }
  )> }
);

export type TodoCreateMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type TodoCreateMutation = (
  { __typename?: 'Mutation' }
  & { createTodo?: Maybe<(
    { __typename?: 'CreateTodoPayload' }
    & { todo?: Maybe<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id' | 'nodeId' | 'name' | 'category' | 'dueDate' | 'completed' | 'sortOrder' | 'userId' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);

export type UserFragmentFragment = (
  { __typename: 'User' }
  & Pick<User, 'id' | 'nodeId' | 'firstName' | 'lastName' | 'username'>
);

export type TodoFragmentFragment = (
  { __typename: 'Todo' }
  & Pick<Todo, 'id' | 'nodeId' | 'name' | 'category' | 'dueDate' | 'completed' | 'sortOrder' | 'userId' | 'createdAt' | 'updatedAt'>
);

export type TodosConnectionFragmentFragment = (
  { __typename: 'TodosConnection' }
  & Pick<TodosConnection, 'totalCount'>
  & { pageInfo: (
    { __typename: 'PageInfo' }
    & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
  ), edges: Array<(
    { __typename: 'TodosEdge' }
    & Pick<TodosEdge, 'cursor'>
    & { node?: Maybe<(
      { __typename?: 'Todo' }
      & TodoFragmentFragment
    )> }
  )>, nodes: Array<Maybe<(
    { __typename?: 'Todo' }
    & TodoFragmentFragment
  )>> }
);

export type CurrentUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & { todosByUserId: (
      { __typename?: 'TodosConnection' }
      & TodosConnectionFragmentFragment
    ) }
    & UserFragmentFragment
  )> }
);

export type LoginQueryVariables = Exact<{
  condition?: Maybe<UserCondition>;
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { allUsers?: Maybe<(
    { __typename?: 'UsersConnection' }
    & { nodes: Array<Maybe<(
      { __typename: 'User' }
      & Pick<User, 'id' | 'nodeId' | 'passwordHash'>
    )>> }
  )> }
);

export type SearchUsersQueryVariables = Exact<{
  condition?: Maybe<UserCondition>;
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers?: Maybe<(
    { __typename?: 'UsersConnection' }
    & { edges: Array<(
      { __typename?: 'UsersEdge' }
      & { node?: Maybe<(
        { __typename: 'User' }
        & Pick<User, 'id' | 'nodeId' | 'firstName' | 'lastName' | 'username'>
      )> }
    )> }
  )> }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  __typename
  id
  nodeId
  firstName
  lastName
  username
}
    `;
export const TodoFragmentFragmentDoc = gql`
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
export const TodosConnectionFragmentFragmentDoc = gql`
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
    ${TodoFragmentFragmentDoc}`;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      __typename
      id
      firstName
      lastName
      username
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const TodoUpdateByIdDocument = gql`
    mutation TodoUpdateById($input: UpdateTodoByIdInput!) {
  updateTodoById(input: $input) {
    todo {
      __typename
      id
      nodeId
      name
      category
      dueDate
      completed
      sortOrder
    }
  }
}
    `;
export type TodoUpdateByIdMutationFn = ApolloReactCommon.MutationFunction<TodoUpdateByIdMutation, TodoUpdateByIdMutationVariables>;

/**
 * __useTodoUpdateByIdMutation__
 *
 * To run a mutation, you first call `useTodoUpdateByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTodoUpdateByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [todoUpdateByIdMutation, { data, loading, error }] = useTodoUpdateByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTodoUpdateByIdMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TodoUpdateByIdMutation, TodoUpdateByIdMutationVariables>) {
        return ApolloReactHooks.useMutation<TodoUpdateByIdMutation, TodoUpdateByIdMutationVariables>(TodoUpdateByIdDocument, baseOptions);
      }
export type TodoUpdateByIdMutationHookResult = ReturnType<typeof useTodoUpdateByIdMutation>;
export type TodoUpdateByIdMutationResult = ApolloReactCommon.MutationResult<TodoUpdateByIdMutation>;
export type TodoUpdateByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<TodoUpdateByIdMutation, TodoUpdateByIdMutationVariables>;
export const TodoDeleteDocument = gql`
    mutation TodoDelete($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    todo {
      __typename
      id
      nodeId
    }
  }
}
    `;
export type TodoDeleteMutationFn = ApolloReactCommon.MutationFunction<TodoDeleteMutation, TodoDeleteMutationVariables>;

/**
 * __useTodoDeleteMutation__
 *
 * To run a mutation, you first call `useTodoDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTodoDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [todoDeleteMutation, { data, loading, error }] = useTodoDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTodoDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TodoDeleteMutation, TodoDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<TodoDeleteMutation, TodoDeleteMutationVariables>(TodoDeleteDocument, baseOptions);
      }
export type TodoDeleteMutationHookResult = ReturnType<typeof useTodoDeleteMutation>;
export type TodoDeleteMutationResult = ApolloReactCommon.MutationResult<TodoDeleteMutation>;
export type TodoDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<TodoDeleteMutation, TodoDeleteMutationVariables>;
export const TodoCreateDocument = gql`
    mutation TodoCreate($input: CreateTodoInput!) {
  createTodo(input: $input) {
    todo {
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
  }
}
    `;
export type TodoCreateMutationFn = ApolloReactCommon.MutationFunction<TodoCreateMutation, TodoCreateMutationVariables>;

/**
 * __useTodoCreateMutation__
 *
 * To run a mutation, you first call `useTodoCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTodoCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [todoCreateMutation, { data, loading, error }] = useTodoCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTodoCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TodoCreateMutation, TodoCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<TodoCreateMutation, TodoCreateMutationVariables>(TodoCreateDocument, baseOptions);
      }
export type TodoCreateMutationHookResult = ReturnType<typeof useTodoCreateMutation>;
export type TodoCreateMutationResult = ApolloReactCommon.MutationResult<TodoCreateMutation>;
export type TodoCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<TodoCreateMutation, TodoCreateMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser($id: Int!) {
  userById(id: $id) {
    ...UserFragment
    todosByUserId {
      ...TodosConnectionFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${TodosConnectionFragmentFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginDocument = gql`
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

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      condition: // value for 'condition'
 *   },
 * });
 */
export function useLoginQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        return ApolloReactHooks.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
      }
export function useLoginLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = ApolloReactCommon.QueryResult<LoginQuery, LoginQueryVariables>;
export const SearchUsersDocument = gql`
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

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      condition: // value for 'condition'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
      }
export function useSearchUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = ApolloReactCommon.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;