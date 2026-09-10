import React, { useState, useEffect } from 'react';
import { Database, HardDrive, ShieldCheck } from 'lucide-react';
import { getStorageEstimate, StorageMetrics } from '../../utils/storage';

interface StorageMonitorProps {
  onOpenBackup?: () => void;
  onOpenBackupCenter?: () => void;
}

export const StorageMonitor: React.FC<StorageMonitorProps> = ({ onOpenBackup, onOpenBackupCenter }) => {
  const handleOpen = onOpenBackup || onOpenBackupCenter;
  const [metrics, setMetrics] = useState<StorageMetrics | null>(null);

  useEffect(() => {
    let mounted = true;
    getStorageEstimate().then((m) => {
      if (mounted) setMetrics(m);
    });

    const interval = setInterval(() => {
      getStorageEstimate().then((m) => {
        if (mounted) setMetrics(m);
      });
    }, 45000); // refresh every 45s

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!metrics) return null;

  return (
    <div
      onClick={handleOpen}
      className="inline-flex items-center gap-2 px-3 py-1 bg-surface-100 hover:bg-surface-200 border border-border/80 rounded-xl text-[11px] font-medium text-slate-600 transition-colors cursor-pointer group shadow-2xs"
      title="Click to open Clinic Backup & Statutory Export Center"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <Database size={12} className="text-slate-500 group-hover:text-primary-600 transition-colors" />
        <span>
          Storage: <strong className="font-mono text-slate-800">{metrics.usageFormatted}</strong>
        </span>
      </div>
      <span className="text-slate-300">•</span>
      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
        IndexedDB Active
      </span>
    </div>
  );
};
