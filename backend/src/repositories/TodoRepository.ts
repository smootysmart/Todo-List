import db from '../database/Database';
import { Todo } from '../entities/Todo';

export class TodoRepository {
  async getAllTodos(): Promise<Todo[]> {
    return await db.manyOrNone<Todo>('SELECT * FROM todos');
  }

  async getTodoById(id: number): Promise<Todo | null> {
    return await db.oneOrNone<Todo>('SELECT * FROM todos WHERE id = $1', [id]);
  }

  async createTodo(title: string): Promise<Todo> {
    return await db.one<Todo>(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, false]
    );
  }

  async updateTodo(
    id: number,
    title: string,
    completed: boolean
  ): Promise<Todo | null> {
    return await db.oneOrNone<Todo>(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
  }

  async updateTodoCompleted(
    id: number,
    completed: boolean
  ): Promise<Todo | null> {
    return await db.oneOrNone<Todo>(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
  }

  async deleteTodo(id: number): Promise<boolean> {
    const result = await db.result('DELETE FROM todos WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
