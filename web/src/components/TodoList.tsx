/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState } from "react";
import { Todo } from "../generated/graphql";
import { IconButton } from "theme-ui";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TodoTile } from "./TodoTile";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

const reorderTodoList = (
  list: Todo[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, itemIndex) => {
    return { ...item, sortOrder: itemIndex };
  });
};

type TodoListProps = {
  todos: Todo[];
  mutations: {
    markComplete: (todo: Todo) => void;
    markIncomplete: (todo: Todo) => void;
    sortUp: (todo: Todo, todoIndex: number) => void;
    sortDown: (todo: Todo, todoIndex: number) => void;
    deleteTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
  };
  currentCategory: string | undefined;
  sortable?: boolean;
  deleteable?: boolean;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  mutations,
  currentCategory,
  sortable = false,
  deleteable = false,
}) => {
  const { sortUp, sortDown, updateTodo } = mutations;
  const [showSortingControls, setShowSortingControls] = useState(false);

  const toggleSortingControls = () => {
    setShowSortingControls(!showSortingControls);
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorderTodoList(
      todos,
      result.source.index,
      result.destination.index
    );
    const itemsNeedingUpdate = items.filter((todo, todoIndex) => {
      return todo.sortOrder !== todos[todoIndex].sortOrder;
    });
    itemsNeedingUpdate.forEach((item) => updateTodo(item));
  };
  const getListStyle = (isDraggingOver: boolean) => ({
    // width: 250
  });
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
  });
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="TodoListDropZone">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            sx={{ display: "flex", flex: 1, justifyContent: "center" }}
          >
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
                <Draggable
                  key={`todoTile${todo.nodeId}`}
                  draggableId={todo.id.toString()}
                  index={todoIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      sx={{ display: "flex" }}
                    >
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
                        deleteable={deleteable}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </ul>
          </div>
        )}
      </Droppable>
      {sortable ? (
        <div sx={{ cursor: "pointer" }} onClick={toggleSortingControls}>
          {showSortingControls ? "hide sorting" : "show sorting"}
        </div>
      ) : null}
    </DragDropContext>
  );
};
