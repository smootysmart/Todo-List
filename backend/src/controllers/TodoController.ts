import { TodoService } from "../services/TodoService";
import type {
  CreateTodoDto,
  TodoIdParamsDto,
  UpdateTodoCompletedDto,
  UpdateTodoDto,
} from "../dtos";

type TodoResponse = {
  json: (body: unknown) => TodoResponse;
  status: (code: number) => TodoResponse;
  send: () => TodoResponse;
};

const todoService = new TodoService();

export class TodoController {
  async getAllTodos(
    _req: Record<string, never>,
    res: TodoResponse,
  ): Promise<void> {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  }

  async getTodoById(req: TodoIdParamsDto, res: TodoResponse): Promise<void> {
    const todoId = await todoService.getTodoById(Number(req.params.id));
    res.json(todoId);
  }

  async createTodo(req: CreateTodoDto, res: TodoResponse): Promise<void> {
    const { title } = req.body;
    const todo = await todoService.createTodo(title);
    res.status(201).json(todo);
  }

  async updateTodo(req: UpdateTodoDto, res: TodoResponse): Promise<void> {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await todoService.updateTodo(Number(id), title, completed);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.json(todo);
  }

  async updateTodoCompleted(
    req: UpdateTodoCompletedDto,
    res: TodoResponse,
  ): Promise<void> {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await todoService.updateTodoCompleted(Number(id), completed);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  }

  async deleteTodo(req: TodoIdParamsDto, res: TodoResponse): Promise<void> {
    const { id } = req.params;
    const success = await todoService.deleteTodo(Number(id));

    if (!success) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(204).send();
  }
}
