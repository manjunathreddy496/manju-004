import React, { memo } from 'react';
import { Calendar, Tag, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { format, isToday, isPast } from 'date-fns';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onToggle: () => void;
}

const priorityColors = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

const TaskCard: React.FC<TaskCardProps> = memo(({ task, onClick, onToggle }) => {
  const isOverdue = task.dueDate && isPast(task.dueDate) && !task.completed;
  const isDueToday = task.dueDate && isToday(task.dueDate);

  return (
    <div 
      className={`p-4 m-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer ${
        isOverdue ? 'border-red-300 bg-red-50' : ''
      }`}
      onClick={onClick}
      data-component="task-card"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>

          <p className={`text-sm text-gray-600 mb-2 line-clamp-2 ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : isDueToday ? 'text-orange-600' : ''}`}>
                <Calendar className="w-3 h-3" />
                {format(task.dueDate, 'MMM dd')}
                {isOverdue && <AlertCircle className="w-3 h-3" />}
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {task.category}
            </div>
          </div>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{task.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;