import React, { useCallback, memo } from 'react';
import { useVirtualList } from '../../hooks/useVirtualList';
import { Task } from '../../types';
import TaskCard from './TaskCard';

interface VirtualizedTaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onToggleTask: (id: string) => void;
  containerHeight: number;
}

const ITEM_HEIGHT = 120;

const VirtualizedTaskList: React.FC<VirtualizedTaskListProps> = memo(({
  tasks,
  onTaskClick,
  onToggleTask,
  containerHeight
}) => {
  const { visibleItems, totalHeight, setScrollTop } = useVirtualList(tasks, {
    itemHeight: ITEM_HEIGHT,
    containerHeight,
    overscan: 5,
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, [setScrollTop]);

  return (
    <div 
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item: task, index }) => (
          <div
            key={task.id}
            style={{
              position: 'absolute',
              top: index * ITEM_HEIGHT,
              left: 0,
              right: 0,
              height: ITEM_HEIGHT,
            }}
          >
            <TaskCard
              task={task}
              onClick={() => onTaskClick(task)}
              onToggle={() => onToggleTask(task.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

VirtualizedTaskList.displayName = 'VirtualizedTaskList';

export default VirtualizedTaskList;