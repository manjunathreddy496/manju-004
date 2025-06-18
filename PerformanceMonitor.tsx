import React, { useEffect, useState } from 'react';
import { Activity, Zap, Clock, MemoryStick } from 'lucide-react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  componentsCount: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    bundleSize: 0,
    componentsCount: 0,
  });

  useEffect(() => {
    // Simulate performance monitoring
    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as any).memory;
      
      setMetrics({
        renderTime: navigation.loadEventEnd - navigation.fetchStart,
        memoryUsage: memory ? memory.usedJSHeapSize / 1024 / 1024 : 0,
        bundleSize: 1.2, // Simulated bundle size in MB
        componentsCount: document.querySelectorAll('[data-component]').length,
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg min-w-[200px] z-50">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Performance Monitor
      </h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Load Time
          </span>
          <span className="text-green-400">{metrics.renderTime.toFixed(0)}ms</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MemoryStick className="w-3 h-3" />
            Memory
          </span>
          <span className="text-blue-400">{metrics.memoryUsage.toFixed(1)}MB</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Bundle
          </span>
          <span className="text-yellow-400">{metrics.bundleSize}MB</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Components</span>
          <span className="text-purple-400">{metrics.componentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;