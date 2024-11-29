import { Router } from "express";
import { TodoController } from "../controllers/TodoController";

const router = Router();
const todoController = new TodoController();

router.get("/tasks", todoController.getAllTodos);
router.get("/tasks/:id", todoController.getTodoById);
router.post("/tasks", todoController.createTodo);
router.patch("/tasks/:id", todoController.updateTodo);
router.put("/tasks/:id", todoController.updateTodoCompleted);
router.delete("/tasks/:id", todoController.deleteTodo);

export default router;
