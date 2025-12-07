import { Loader2, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete, onUpdate }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600 font-medium">Cargando tareas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ListTodo className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No hay tareas aun</h3>
        <p className="text-gray-500">Crea tu primera tarea para empezar</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Mis Tareas</h2>
              <p className="text-sm text-gray-500">{tasks.length} en total</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600">{pendingTasks.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{completedTasks.length}</span>
            </div>
          </div>
        </div>
      </div>

      {pendingTasks.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Circle className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Pendientes</h3>
          </div>
          {pendingTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Completadas</h3>
          </div>
          {completedTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;