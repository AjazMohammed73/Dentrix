import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconBgColor = 'bg-primary-50',
  iconColor = 'text-primary-600',
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-border/80 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 truncate">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center space-x-1.5 mt-2">
              <span
                className={`text-xs font-bold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-[11px] text-slate-600">vs last period</span>
            </div>
          )}
          {subtitle && !trend && (
            <p className="text-xs text-slate-600 mt-1.5 truncate">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-2xl ${iconBgColor} ${iconColor} flex-shrink-0 shadow-sm`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};
