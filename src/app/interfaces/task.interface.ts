export type TodoTask = {
    id : string,
    ownerId: string,
    title: string,
    description: string,
    categories: string[],
    done: boolean,
  };
