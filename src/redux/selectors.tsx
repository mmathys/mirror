import { VISIBILITY_FILTERS } from "../constants";

export interface RootState {
  gapi: {
    ready: boolean
  }
}

export const getGapiIsReady = (store: RootState) => store.gapi.ready

export const getTodosState = (store: { todos: any; }) => store.todos;

export const getTodoList = (store: any) =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store: any, id: string | number) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = (store: any) =>
  getTodoList(store).map((id: any) => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store: any, visibilityFilter: any) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter((todo: { completed: any; }) => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter((todo: { completed: any; }) => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
