import React, { memo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { FilterOptions, Category } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

interface TaskFiltersProps {
  filters: FilterOptions;
  categories: Category[];
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = memo(({ filters, categories, onFiltersChange }) => {
  const debouncedSearch = useDebounce(filters.search, 300);

  React.useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFiltersChange({ search: debouncedSearch });
    }
  }, [debouncedSearch, filters.search, onFiltersChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => onFiltersChange({ search: e.target.value })}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-48">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="w-full lg:w-32">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.priority}
            onChange={(e) => onFiltersChange({ priority: e.target.value })}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-32">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.completed === null ? '' : filters.completed.toString()}
            onChange={(e) => onFiltersChange({ 
              completed: e.target.value === '' ? null : e.target.value === 'true'
            })}
          >
            <option value="">All Status</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
          >
            <option value="createdAt">Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
          
          <button
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onClick={() => onFiltersChange({ 
              sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
            })}
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

TaskFilters.displayName = 'TaskFilters';

export default TaskFilters;