import React, { memo } from 'react';
import { CheckSquare, Plus, Settings } from 'lucide-react';

interface HeaderProps {
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = memo(({ onAddTask }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">TaskManager Pro</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onAddTask}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;