export interface ITodo {
  id: string
  title: string
  updatedAt: string
  createdAt: string
}

export interface ICreateTodo extends Omit<ITodo, 'id' | 'updatedAt' | 'createdAt'> {}

export interface IUpdateTodo extends Omit<ITodo, 'updatedAt' | 'createdAt'> {}
