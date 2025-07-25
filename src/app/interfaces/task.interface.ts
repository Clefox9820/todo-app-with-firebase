export type TodoTask = {
    id : string,
    ownerId: string,
    title: string,
    description: string,
    categories: number[],
    done: boolean,
  };
