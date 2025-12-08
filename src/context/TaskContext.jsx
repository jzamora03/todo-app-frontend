import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
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

  const value = {
    tasks,
    filteredTasks,
    loading,
    error,
    filters,
    setFilters,
    loadTasks,
    createTask: handleCreateTask,
    toggleTask: handleToggleTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
