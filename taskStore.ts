import { create } from 'zustand';
import { Task, Category, FilterOptions, TaskStats } from '../types';
import { generateMockTasks, generateMockCategories } from '../utils/mockData';

interface TaskState {
  tasks: Task[];
  categories: Category[];
  filters: FilterOptions;
  selectedTask: Task | null;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSelectedTask: (task: Task | null) => void;
  
  // Computed
  getFilteredTasks: () => Task[];
  getTaskStats: () => TaskStats;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: generateMockTasks(1000), // Large dataset for performance testing
  categories: generateMockCategories(),
  filters: {
    search: '',
    category: '',
    priority: '',
    completed: null,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  selectedTask: null,

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
    }));
  },

  toggleTask: (id) => {
    const { updateTask } = get();
    const task = get().tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  setSelectedTask: (task) => {
    set({ selectedTask: task });
  },

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    let filtered = tasks;

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (filters.category) {
      filtered = filtered.filter((task) => task.category === filters.category);
    }

    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }

    if (filters.completed !== null) {
      filtered = filtered.filter((task) => task.completed === filters.completed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title) * multiplier;
        case 'priority':
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) * multiplier;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return (a.dueDate.getTime() - b.dueDate.getTime()) * multiplier;
        default:
          return (a.createdAt.getTime() - b.createdAt.getTime()) * multiplier;
      }
    });

    return filtered;
  },

  getTaskStats: () => {
    const { tasks } = get();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      overdue: tasks.filter(
        (task) => task.dueDate && task.dueDate < now && !task.completed
      ).length,
      today: tasks.filter(
        (task) => task.dueDate && task.dueDate >= today && task.dueDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
      ).length,
      thisWeek: tasks.filter(
        (task) => task.dueDate && task.dueDate >= today && task.dueDate < weekFromNow
      ).length,
    };
  },
}));