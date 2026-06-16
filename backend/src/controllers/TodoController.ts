import { TodoService } from "../services/TodoService";

type TodoRequest = {
  params: {
    id: string;
  };
};

type CreateTodoRequest = {
  body: {
    title: string;
  };
};

type UpdateTodoRequest = {
  params: {
    id: string;
  };
  body: {
    title: string;
    completed: boolean;
  };
};

type UpdateTodoCompletedRequest = {
  params: {
    id: string;
  };
  body: {
    completed: boolean;
  };
};

type TodoResponse = {
  json: (body: unknown) => TodoResponse;
  status: (code: number) => TodoResponse;
  send: () => TodoResponse;
};

const todoService = new TodoService();

export class TodoController {
  async getAllTodos(req: TodoRequest, res: TodoResponse): Promise<void> {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  }

  async getTodoById(req: TodoRequest, res: TodoResponse): Promise<void> {
    const todoId = await todoService.getTodoById(Number(req.params.id));
    res.json(todoId);
  }

  async createTodo(req: CreateTodoRequest, res: TodoResponse): Promise<void> {
    const { title } = req.body;
    const todo = await todoService.createTodo(title);
    res.status(201).json(todo);
  }

  async updateTodo(req: UpdateTodoRequest, res: TodoResponse): Promise<void> {
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
    req: UpdateTodoCompletedRequest,
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

  async deleteTodo(req: TodoRequest, res: TodoResponse): Promise<void> {
    const { id } = req.params;
    const success = await todoService.deleteTodo(Number(id));

    if (!success) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(204).send();
  }
}
