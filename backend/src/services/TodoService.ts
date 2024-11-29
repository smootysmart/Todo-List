import { TodoRepository } from "../repositories/TodoRepository";
import { Todo } from "../entities/Todo";

export class TodoService {
    private todoRepository = new TodoRepository();

    async getAllTodos(): Promise<Todo[]> {
        return await this.todoRepository.getAllTodos();
    }

    async getTodoById(id: number): Promise<Todo | null> {
        return await this.todoRepository.getTodoById(id);
    }

    async createTodo(title: string): Promise<Todo> {
        return await this.todoRepository.createTodo(title);
    }

    async updateTodo(id: number, title: string, completed: boolean): Promise<Todo | null> {
        return await this.todoRepository.updateTodo(id, title, completed);
    }

    async updateTodoCompleted(id: number, completed: boolean): Promise<Todo | null> {
        return await this.todoRepository.updateTodoCompleted(id, completed);
    }

    async deleteTodo(id: number): Promise<boolean> {
        return await this.todoRepository.deleteTodo(id);
    }
}
