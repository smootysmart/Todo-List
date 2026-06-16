export type UpdateTodoDto = {
  params: {
    id: string;
  };
  body: {
    title: string;
    completed: boolean;
  };
};
