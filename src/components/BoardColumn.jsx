import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Circle, CheckCircle2, ArrowDown } from 'lucide-react';
import DraggableTaskItem from './DraggableTaskItem';

function BoardColumn({ title, tasks, status, onUpdate, onDelete, isOver, isDragging }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const isPending = status === 'pending';
  const IconComponent = isPending ? Circle : CheckCircle2;
  const iconColor = isPending ? 'text-orange-500' : 'text-green-500';
  const bgColor = isPending ? 'bg-orange-50' : 'bg-green-50';
  const borderColor = isPending ? 'border-orange-200' : 'border-green-200';
  const activeBorderColor = isPending ? 'border-orange-500' : 'border-green-500';
  const activeBgColor = isPending ? 'bg-orange-100' : 'bg-green-100';

  return (
    <div className="flex-1 min-w-0">
      {/* Indicador superior */}
      {isOver && (
        <div className="mb-2 flex items-center justify-center animate-bounce">
          <div className={`${activeBgColor} ${activeBorderColor} border-2 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg`}>
            <ArrowDown className={`w-4 h-4 ${iconColor}`} />
            <span className={`text-sm font-bold ${iconColor}`}>
              Suelta para {isPending ? 'marcar pendiente' : 'completar'}
            </span>
          </div>
        </div>
      )}

      {/* Columna exterior SIN ref */}
      <div className={`${bgColor} border-2 rounded-2xl p-4 transition-all duration-200 ${
        isOver 
          ? `${activeBorderColor} shadow-2xl scale-[1.02] ring-4 ${isPending ? 'ring-orange-300' : 'ring-green-300'}` 
          : borderColor
      } ${isDragging && !isOver ? 'opacity-50' : ''}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${iconColor} ${isOver ? 'animate-pulse' : ''}`} />
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
          <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            {tasks.length}
          </span>
        </div>

        {/* CONTENEDOR DROPPABLE - Cubre TODO */}
        <div ref={setNodeRef} className="min-h-[400px] relative">
          <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium">
                    {isPending ? 'No hay tareas pendientes' : 'No hay tareas completadas'}
                  </p>
                  <p className="text-xs mt-1">
                    {isPending ? 'Crea una nueva tarea arriba' : 'Arrastra tareas aqui'}
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <DraggableTaskItem
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
}

export default BoardColumn;