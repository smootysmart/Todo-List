import axios from "axios";
import { Todo } from "../types/Todo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const createTodo = async (todo: Todo): Promise<void> => {
  await axios.post(`${API_BASE_URL}`, todo);
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${todo.id}`, todo);
};

export const updateTodoCompleted = async (todo: Todo): Promise<void> => {
  console.log(todo);
  
  await axios.put(`${API_BASE_URL}/${todo.id}`, todo.completed);
}

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
