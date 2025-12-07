import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskFormModal from './TaskFormModal';

function TaskForm({ onTaskCreated }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Solo el botón */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold">Nueva Tarea</p>
            <p className="text-sm text-blue-100">Click para crear una tarea</p>
          </div>
        </div>
      </button>

      {/* Modal */}
      <TaskFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onTaskCreated={onTaskCreated}
      />
    </>
  );
}

export default TaskForm;