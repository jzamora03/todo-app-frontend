import { useState, useEffect, useMemo } from 'react';
import { CheckSquare, AlertCircle, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import Statistics from './components/Statistics';
import Filters from './components/Filters';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);

    const loadingToast = toast.loading('Cargando tareas...', {
      position: 'top-right',
    });

    try {
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
        toast.success(`${response.data.length} tarea(s) cargadas`, {
          id: loadingToast,
          duration: 2000,
        });
      }
    } catch (err) {
      setError('Error al cargar las tareas');
      toast.error('Error al cargar las tareas', {
        id: loadingToast,
        duration: 3000,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar y ordenar tareas
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    if (filters.searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabetical-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, filters]);

  const handleCreateTask = async (taskData) => {
    const loadingToast = toast.loading('Creando tarea...', {
      position: 'top-right',
    });

    try {
      const response = await createTask(taskData);
      if (response.success) {
        setTasks([response.data, ...tasks]);
        toast.success('Tarea creada exitosamente!', {
          id: loadingToast,
          duration: 3000,
          icon: '✅',
        });
      }
    } catch (err) {
      toast.error('Error al crear la tarea', {
        id: loadingToast,
        duration: 3000,
      });
      throw err;
    }
  };

  const handleToggleTask = async (id, completed) => {
    const originalTasks = [...tasks];

    setTasks(tasks.map(task =>
      task._id === id ? { ...task, completed } : task
    ));

    const loadingToast = toast.loading(completed ? 'Completando...' : 'Moviendo...', {
      position: 'top-right',
    });

    try {
      const response = await updateTask(id, { completed });
      if (response.success) {
        setTasks(tasks.map(task =>
          task._id === id ? response.data : task
        ));

        if (completed) {
          toast.success('Tarea completada!', {
            id: loadingToast,
            duration: 2000,
            icon: '🎉',
          });
        } else {
          toast.success('Tarea movida a pendientes', {
            id: loadingToast,
            duration: 2000,
            icon: '📝',
          });
        }
      }
    } catch (err) {
      setTasks(originalTasks);
      toast.error('Error al actualizar', {
        id: loadingToast,
        duration: 3000,
      });
    }
  };

  const handleUpdateTask = async (id, updates) => {
    const loadingToast = toast.loading('Actualizando...', {
      position: 'top-right',
    });

    try {
      const response = await updateTask(id, updates);
      if (response.success) {
        setTasks(tasks.map(task =>
          task._id === id ? response.data : task
        ));
        toast.success('Tarea actualizada!', {
          id: loadingToast,
          duration: 2000,
          icon: '✏️',
        });
      }
    } catch (err) {
      toast.error('Error al actualizar', {
        id: loadingToast,
        duration: 3000,
      });
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find(t => t._id === id);

    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-gray-800">Eliminar tarea?</p>
          <p className="text-sm text-gray-600 mt-1">{taskToDelete?.title}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              const loadingToast = toast.loading('Eliminando...', {
                position: 'top-right',
              });

              try {
                const response = await deleteTask(id);
                if (response.success) {
                  setTasks(tasks.filter(task => task._id !== id));
                  toast.success('Tarea eliminada', {
                    id: loadingToast,
                    duration: 2000,
                    icon: '🗑️',
                  });
                }
              } catch (err) {
                toast.error('Error al eliminar', {
                  id: loadingToast,
                  duration: 3000,
                });
              }
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Toaster
        toastOptions={{
          className: '',
          style: {
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            fontWeight: '500',
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header compacto */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-3 shadow-lg shadow-blue-500/20">
            <CheckSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            To-Do App
          </h1>
          <p className="text-gray-600 text-sm">Crea y gestiona tus tareas facilmente.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={loadTasks}
                className="mt-2 text-sm font-medium underline hover:no-underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        )}

        {/* Task Form - ARRIBA */}
        <div className="max-w-2xl mx-auto mb-4">
          <TaskForm onTaskCreated={handleCreateTask} />
        </div>

        {/* Statistics*/}
        {!loading && tasks.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Statistics tasks={tasks} />
            </div>

            {/* Filters */}
            <div className="lg:w-96">
              <Filters onFilterChange={setFilters} />
            </div>
          </div>
        )}
        {!loading && tasks.length === 0 && (
          <Statistics tasks={tasks} />
        )}

        {/* Mensaje instruccion */}
        <div className="text-center mb-10 text-gray-500">
          <p className="text-base">Arrastra las tareas entre columnas para cambiar su estado</p>
        </div>

        {/* Tablero kanban */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Cargando datos...</p>
          </div>
        ) : (
          <>
            {filteredTasks.length === 0 && filters.searchTerm ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <p className="text-gray-600 text-lg mb-2">No se encontraron tareas</p>
                <p className="text-gray-500 text-sm">
                  Intenta con otro término de búsqueda
                </p>
              </div>
            ) : (
              <KanbanBoard
                tasks={filteredTasks}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleTask}
              />
            )}
          </>
        )}


      </div>
    </div>
  );
}

export default App;