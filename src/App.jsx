import { CheckSquare, AlertCircle, Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import Statistics from './components/Statistics';
import Filters from './components/Filters';
import { useTasks } from './context/TaskContext';

function App() {
  const { tasks, filteredTasks, loading, error, filters, setFilters, loadTasks } = useTasks();

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
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-3 shadow-lg shadow-gray-500/20">
            <CheckSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
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
          <TaskForm />
        </div>

        {/* Statistics*/}
        {!loading && tasks.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Statistics />
            </div>

            {/* Filters */}
            <div className="lg:w-96">
              <Filters onFilterChange={setFilters} />
            </div>
          </div>
        )}
        {!loading && tasks.length === 0 && (
          <Statistics />
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
              <KanbanBoard />
            )}
          </>
        )}


      </div>
    </div>
  );
}

export default App;
