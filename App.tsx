import React, { useState, useCallback, useMemo } from 'react';
import { useTaskStore } from './store/taskStore';
import Header from './components/layout/Header';
import TaskStats from './components/ui/TaskStats';
import TaskFilters from './components/ui/TaskFilters';
import VirtualizedTaskList from './components/ui/VirtualizedTaskList';
import TaskModal from './components/modals/TaskModal';
import PerformanceMonitor from './components/performance/PerformanceMonitor';

function App() {
  const {
    tasks,
    categories,
    filters,
    selectedTask,
    addTask,
    updateTask,
    toggleTask,
    setFilters,
    setSelectedTask,
    getFilteredTasks,
    getTaskStats,
  } = useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoized computations for performance
  const filteredTasks = useMemo(() => getFilteredTasks(), [
    tasks,
    filters,
    getFilteredTasks,
  ]);

  const taskStats = useMemo(() => getTaskStats(), [tasks, getTaskStats]);

  const categoryNames = useMemo(
    () => categories.map((cat) => cat.name),
    [categories]
  );

  // Optimized callbacks
  const handleAddTask = useCallback(() => {
    setSelectedTask(null);
    setIsModalOpen(true);
  }, [setSelectedTask]);

  const handleTaskClick = useCallback(
    (task: typeof tasks[0]) => {
      setSelectedTask(task);
      setIsModalOpen(true);
    },
    [setSelectedTask]
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }, [setSelectedTask]);

  const handleTaskSave = useCallback(
    (taskData: Parameters<typeof addTask>[0]) => {
      if (selectedTask) {
        updateTask(selectedTask.id, taskData);
      } else {
        addTask(taskData);
      }
    },
    [selectedTask, addTask, updateTask]
  );

  const handleFiltersChange = useCallback(
    (newFilters: Parameters<typeof setFilters>[0]) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={handleAddTask} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskStats stats={taskStats} />
        
        <TaskFilters
          filters={filters}
          categories={categories}
          onFiltersChange={handleFiltersChange}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tasks ({filteredTasks.length})
            </h2>
          </div>
          
          <VirtualizedTaskList
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onToggleTask={toggleTask}
            containerHeight={600}
          />
        </div>
      </main>

      <TaskModal
        task={selectedTask}
        categories={categoryNames}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleTaskSave}
      />

      <PerformanceMonitor />
    </div>
  );
}

export default App;