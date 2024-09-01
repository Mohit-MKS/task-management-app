interface ITask {
  id?: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TStatus
}

type TStatus = 'pending' | 'in-progress' | 'completed'

interface ITaskState {
  tasks: ITask[];
}


export { ITask, ITaskState, TStatus }
