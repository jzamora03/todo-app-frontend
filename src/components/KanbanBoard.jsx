import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import BoardColumn from './BoardColumn';
import { useTasks } from '../context/TaskContext';

function KanbanBoard() {
  const { filteredTasks: tasks, updateTask: onUpdate, deleteTask: onDelete, toggleTask: onToggleComplete } = useTasks();
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;
    if (over) {
      setOverId(over.id);
    } else {
      setOverId(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && (over.id === 'pending' || over.id === 'completed')) {
      const taskId = active.id;
      const newStatus = over.id;
      const shouldComplete = newStatus === 'completed';
      const task = tasks.find(t => t._id === taskId);
      
      if (task && task.completed !== shouldComplete) {
        onToggleComplete(taskId, shouldComplete);
      }
    }

    setActiveId(null);
    setOverId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  const activeTask = tasks.find(t => t._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BoardColumn
          title="Pendientes"
          status="pending"
          tasks={pendingTasks}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isOver={overId === 'pending'}
          isDragging={activeId !== null}
        />
        
        <BoardColumn
          title="Completadas"
          status="completed"
          tasks={completedTasks}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isOver={overId === 'completed'}
          isDragging={activeId !== null}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-6 scale-110 opacity-80">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-400 p-4">
              <div className="flex items-start gap-3">
                <div className="text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    {activeTask.title}
                  </h3>
                  {activeTask.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {activeTask.description.substring(0, 50)}...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;