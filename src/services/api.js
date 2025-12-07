const API_URL = import.meta.env.VITE_API_URL || 'https://todo-app-backend-oj87.onrender.com/api';

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    throw error;
  }
};

// Crear una tarea
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};

// Actualizar una tarea
export const updateTask = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};