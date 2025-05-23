export interface Task {
  id: string;
  title: string;
  description: string;
  created: string;
  due?: string;
  complete: boolean;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  due?: string;
}
