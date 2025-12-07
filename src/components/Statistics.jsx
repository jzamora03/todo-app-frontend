import { useState } from 'react';
import { Eye } from 'lucide-react';
import StatisticsModal from './StatisticsModal';

function Statistics({ tasks }) {
  const [showModal, setShowModal] = useState(false);
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <>
      {/* Solo el botón con el porcentaje */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-700">PROGRESO GENERAL</p>
              <p className="text-xs text-gray-500">Click para ver detalles</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {completionRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {completedTasks}/{totalTasks} completadas
            </p>
          </div>
        </div>
      </button>

      {/* Modal de estadísticas detalladas */}
      <StatisticsModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        tasks={tasks}
      />
    </>
  );
}

export default Statistics;