import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskFormModal from './TaskFormModal';
import { useTasks } from '../context/TaskContext';

function TaskForm() {
  const { createTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Solo el botón */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-2xl shadow-lg shadow-gray-500/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-lg font-bold">Nueva tarea</p>
            <p className="text-sm text-gray-300">Click para crear una tarea</p>
          </div>
        </div>
      </button>

      {/* Modal */}
      <TaskFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onTaskCreated={createTask}
      />
    </>
  );
}

export default TaskForm;