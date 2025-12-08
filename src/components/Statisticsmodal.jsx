import { X, TrendingUp, CheckCircle2, Clock, Target, Calendar, Percent } from 'lucide-react';

function StatisticsModal({ isOpen, onClose, tasks }) {
  if (!isOpen) return null;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tareas completadas hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const completedToday = tasks.filter(t => {
    if (!t.completed) return false;
    const taskDate = new Date(t.createdAt);
    return taskDate >= today;
  }).length;

  // Tareas de esta semana
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  const completedThisWeek = tasks.filter(t => {
    if (!t.completed) return false;
    const taskDate = new Date(t.createdAt);
    return taskDate >= weekAgo;
  }).length;

  // Tareas de este mes
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  monthAgo.setHours(0, 0, 0, 0);
  const completedThisMonth = tasks.filter(t => {
    if (!t.completed) return false;
    const taskDate = new Date(t.createdAt);
    return taskDate >= monthAgo;
  }).length;

  const stats = [
    {
      icon: Target,
      label: 'Total general',
      value: totalTasks,
      color: 'text-slate-700',
      bgColor: 'bg-slate-100',
      description: 'Todas las tareas en el sistema',
    },
    {
      icon: Clock,
      label: 'Total pendientes',
      value: pendingTasks,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      description: 'Tareas por completar',
      percentage: totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0,
    },
    {
      icon: CheckCircle2,
      label: 'Tareas completadas',
      value: completedTasks,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      description: 'Tareas finalizadas',
      percentage: completionRate,
    },
    {
      icon: TrendingUp,
      label: 'Completadas hoy',
      value: completedToday,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      description: 'Tareas completadas en el día',
    },
  ];

  const timeStats = [
    {
      label: 'Última semana',
      value: completedThisWeek,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Último mes',
      value: completedThisMonth,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Estadísticas detalladas</h2>
            <p className="text-sm text-slate-500 mt-1">Análisis completo de tus tareas</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progreso general */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-700">Progreso general</h3>
              </div>
              <span className="text-3xl font-bold text-slate-900">{completionRate}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-slate-900 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                style={{ width: `${completionRate}%` }}
              >
                {completionRate > 10 && (
                  <span className="text-[10px] font-bold text-white">{completionRate}%</span>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3">
              {completedTasks} de {totalTasks} tareas completadas
            </p>
          </div>

          {/* Estadísticas Principales */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Resumen General
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-lg p-4 border border-slate-200`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-sm font-medium text-slate-700">{stat.label}</span>
                    </div>
                    {stat.percentage !== undefined && (
                      <span className={`text-xs font-bold ${stat.color} bg-white px-2 py-1 rounded`}>
                        {stat.percentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Estadísticas Temporales */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Productividad reciente
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {timeStats.map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-lg p-4 border border-slate-200`}>
                  <p className="text-xs font-medium text-slate-600 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-600 mt-1">tareas completadas</p>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas Adicionales */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Datos Interesantes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Tasa de finalización</span>
                <span className="font-semibold text-slate-900">{completionRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Tareas restantes</span>
                <span className="font-semibold text-slate-900">{pendingTasks}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Promedio diario (última semana)</span>
                <span className="font-semibold text-slate-900">
                  {(completedThisWeek / 7).toFixed(1)} tareas/día
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatisticsModal;