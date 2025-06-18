import React, { memo } from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { TaskStats as TaskStatsType } from '../../types';

interface TaskStatsProps {
  stats: TaskStatsType;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  percentage?: number;
}> = memo(({ icon, label, value, color, percentage }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <div className="flex items-center">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {percentage !== undefined && (
            <span className="ml-2 text-sm text-gray-500">
              ({percentage}%)
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

const TaskStats: React.FC<TaskStatsProps> = memo(({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      <StatCard
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
        label="Total Tasks"
        value={stats.total}
        color="bg-blue-50"
      />
      
      <StatCard
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
        label="Completed"
        value={stats.completed}
        color="bg-green-50"
        percentage={completionRate}
      />
      
      <StatCard
        icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        label="Overdue"
        value={stats.overdue}
        color="bg-red-50"
      />
      
      <StatCard
        icon={<Clock className="w-5 h-5 text-orange-600" />}
        label="Due Today"
        value={stats.today}
        color="bg-orange-50"
      />
      
      <StatCard
        icon={<Calendar className="w-5 h-5 text-purple-600" />}
        label="This Week"
        value={stats.thisWeek}
        color="bg-purple-50"
      />
    </div>
  );
});

TaskStats.displayName = 'TaskStats';

export default TaskStats;