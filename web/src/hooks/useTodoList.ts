import {
  Todo,
  User,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  CreateTodoInput,
  useTodoCreateMutation,
  useTodoUpdateByIdMutation,
  useTodoDeleteMutation,
} from "../generated/graphql";
import { currentUserQuery } from "../utils/graphql";
import gql from "graphql-tag";

export const updateTodoMutation = gql`
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
export const deleteTodoMutation = gql`
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
export const createTodoMutation = gql`
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
export const formatDateForMutation = (date: Date = new Date()) => {
  return date.toISOString().replace(/T/, " ");
};
export const sortAscBySortOrder = (todos: Todo[]) => {
  return todos.sort((a, b) => a.sortOrder - b.sortOrder);
};

export const nonNullable = <TValue>(
  value: (TValue & { __typename?: string }) | null | undefined
): value is TValue => {
  return value !== null && value !== undefined && !!value["__typename"];
};
export const useTodoList = (todos: Todo[], currentUser: User) => {
  const incomplete = sortAscBySortOrder(
    todos.filter((td) => {
      return !td.completed;
    })
  );
  const completed = sortAscBySortOrder(
    todos.filter((td) => {
      return td.completed;
    })
  );
  const categories = todos
    .map((todo) => todo.category)
    .filter((cat) => typeof cat === "string")
    .filter(
      (value, index, array): value is string => array.indexOf(value) === index
    );
  const [todoCreate] = useTodoCreateMutation();
  const [todoUpdate] = useTodoUpdateByIdMutation();
  const [todoDelete] = useTodoDeleteMutation({
    update: (cache, result) => {
      try {
        const data = cache.readQuery<
          CurrentUserQuery,
          CurrentUserQueryVariables
        >({
          query: currentUserQuery,
          variables: { id: currentUser.id },
        });
        if (data?.userById) {
          const newData: CurrentUserQuery | undefined = {
            ...data,
            userById: {
              ...data.userById,
              todosByUserId: {
                ...data.userById.todosByUserId,
                nodes: [
                  ...data.userById.todosByUserId.nodes.filter((node) =>
                    node
                      ? node.id !== result?.data?.deleteTodo?.todo?.id
                      : false
                  ),
                ],
              },
            },
          };
          cache.writeQuery<CurrentUserQuery, CurrentUserQueryVariables>({
            query: currentUserQuery,
            data: newData,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const markComplete = (todo: Todo) => {
    todoUpdate({
      variables: { input: { id: todo.id, todoPatch: { completed: true } } },
    });
  };
  const markIncomplete = (todo: Todo) => {
    todoUpdate({
      variables: { input: { id: todo.id, todoPatch: { completed: false } } },
    });
  };
  const sortUp = (todo: Todo, todoIndex: number) => {
    if (todo.sortOrder !== 0) {
      todoUpdate({
        variables: {
          input: {
            id: todo.completed
              ? completed[todoIndex - 1].id
              : incomplete[todoIndex - 1].id,
            todoPatch: { sortOrder: todo.sortOrder },
          },
        },
      });
      todoUpdate({
        variables: {
          input: { id: todo.id, todoPatch: { sortOrder: todo.sortOrder - 1 } },
        },
      });
    }
  };
  const sortDown = (todo: Todo, todoIndex: number) => {
    if (
      todoIndex !==
      (todo.completed ? completed.length - 1 : incomplete.length - 1)
    ) {
      todoUpdate({
        variables: {
          input: {
            id: todo.completed
              ? completed[todoIndex + 1].id
              : incomplete[todoIndex + 1].id,
            todoPatch: { sortOrder: todo.sortOrder },
          },
        },
      });
      todoUpdate({
        variables: {
          input: { id: todo.id, todoPatch: { sortOrder: todo.sortOrder + 1 } },
        },
      });
    }
  };
  const deleteTodo = (todo: Todo) => {
    todoDelete({ variables: { input: { nodeId: todo.nodeId } } });
  };
  const createTodo = (input: CreateTodoInput) => {
    todoCreate({
      variables: { input },
      update: (cache, result) => {
        try {
          const data = cache.readQuery<
            CurrentUserQuery,
            CurrentUserQueryVariables
          >({
            query: currentUserQuery,
            variables: { id: currentUser.id },
          });
          if (data?.userById && result?.data?.createTodo?.todo) {
            const newTodo: Todo = { ...result.data.createTodo.todo };
            const newData: CurrentUserQuery | undefined = {
              ...data,
              __typename: "Query",
              userById: {
                ...data.userById,
                __typename: "User",
                todosByUserId: {
                  ...data.userById.todosByUserId,
                  __typename: "TodosConnection",
                  nodes: [
                    ...data.userById.todosByUserId.nodes,
                    { ...newTodo, __typename: "Todo" },
                  ],
                },
              },
            };
            cache.writeQuery<CurrentUserQuery, CurrentUserQueryVariables>({
              query: currentUserQuery,
              data: newData,
            });
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  return {
    completed,
    incomplete,
    categories,
    markComplete,
    markIncomplete,
    sortUp,
    sortDown,
    deleteTodo,
    createTodo,
  };
};
