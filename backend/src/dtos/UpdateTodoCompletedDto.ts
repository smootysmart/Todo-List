export type UpdateTodoCompletedDto = {
  params: {
    id: string;
  };
  body: {
    completed: boolean;
  };
};
