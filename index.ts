export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

export interface FilterOptions {
  search: string;
  category: string;
  priority: string;
  completed: boolean | null;
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface TaskStats {
  total: number;
  completed: number;
  overdue: number;
  today: number;
  thisWeek: number;
}