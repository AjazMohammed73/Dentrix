import React, { useState } from 'react';
import {
  Settings2,
  Plus,
  Clock,
  DollarSign,
  Search,
  CheckCircle,
  Tag,
  Stethoscope,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ServiceCategory, DentalService } from '../types';
import { formatINR } from '../utils/format';
import { AccessDeniedView } from './AccessDeniedView';

interface ServicesViewProps {
  onOpenAddService: () => void;
  onNavigateHome?: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenAddService, onNavigateHome }) => {
  const { services, toggleServiceActive } = useData();
  const { currentTenant, currentUser } = useAuth();

  const canManageServices =
    currentUser.permissions.canManageServices ||
    currentUser.role === 'DOCTOR_ADMIN' ||
    currentUser.role === 'SUPER_ADMIN';

  if (!canManageServices) {
    return (
      <AccessDeniedView
        attemptedRoute="services"
        requiredRoleOrPermission="Services Catalog Management (canManageServices) or Doctor Admin"
        onNavigateHome={onNavigateHome || (() => {})}
      />
    );
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Preventive',
    'Restorative',
    'Endodontics',
    'Periodontics',
    'Oral Surgery',
    'Orthodontics',
  ];

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(query) ||
      s.code.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
            <Settings2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dental Services & Fee Schedule</h1>
            <p className="text-xs text-slate-500">
              Configure ADA CDT procedure codes, clinical duration, and base fees for {currentTenant?.name}.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddService}
          className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all"
        >
          <Plus size={16} />
          <span>Add Dental Procedure</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white border border-border text-slate-600 hover:bg-surface-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search CDT code or procedure..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-2xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 shadow-sm"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="py-3.5 px-5">CDT Code</th>
                <th className="py-3.5 px-5">Procedure Name & Details</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Standard Duration</th>
                <th className="py-3.5 px-5">Base Fee</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Toggle Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-surface-50/60">
                  <td className="py-4 px-5">
                    <span className="font-mono font-black text-sm text-primary-700 bg-primary-50 px-2.5 py-1 rounded-xl border border-primary-200">
                      {service.code}
                    </span>
                  </td>

                  <td className="py-4 px-5 max-w-sm">
                    <span className="font-bold text-sm text-slate-900 block">
                      {service.name}
                    </span>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {service.description}
                    </p>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-semibold px-2.5 py-0.5 rounded-full bg-surface-100 text-slate-700 border border-slate-200">
                      {service.category}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-1 font-semibold text-slate-700">
                      <Clock size={13} className="text-slate-400" />
                      <span>{service.durationMinutes} minutes</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-black text-sm text-slate-900">
                      {formatINR(service.basePrice)}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <Badge variant={service.isActive ? 'success' : 'neutral'} dot>
                      {service.isActive ? 'Active' : 'Archived'}
                    </Badge>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleServiceActive(service.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                        service.isActive
                          ? 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {service.isActive ? 'Deactivate' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
