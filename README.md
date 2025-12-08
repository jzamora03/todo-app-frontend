<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Aplicación moderna de gestión de tareas con interfaz drag & drop**

</div>

---

## 📸 Vista Previa

Una aplicación de tareas intuitiva con tablero Kanban, estadísticas en tiempo real y diseño responsive.

### Características Principales

- **Interfaz Drag & Drop Mejorada** - Arrastra tareas entre columnas con detección inteligente
- **Context API** - Manejo de estado global profesional
- **Estadísticas Detalladas** - Modal con métricas de productividad
- **Búsqueda y Filtros** - Buscar y ordenar tareas en tiempo real
- **Edición Inline** - Edita tareas directamente sin modales
- **100% Responsive** - Funciona en todos los dispositivos
- **UI Minimalista** - Diseño moderno con paleta gris/negro
- **Notificaciones Toast** - Feedback visual instantáneo con react-hot-toast

---

## 🛠️ Tecnologías utilizadas

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hot-toast": "^2.4.1",
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "lucide-react": "^0.index",
  "vite": "^5.4.11"
}
```
## 🚀 Instalación y configuración

### Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** o **yarn**

### 1. Clonar el repositorio

```bash
git clone https://github.com/jzamora03/todo-app-frontend
cd todo-app-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar servicios

En el archivo `api.js` en src/services de la raíz del proyecto:

```
const API_URL = http://localhost:5000/api
```

**Para producción:**
```
const API_URL = import.meta.env.VITE_API_URL || 'https://todo-app-backend-oj87.onrender.com/api';
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:
```
http://localhost:PUERTO
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/                    # Archivos estáticos
├── src/
│   ├── components/           # Componentes React
│   │   ├── BoardColumn.jsx          # Columna del tablero Kanban
│   │   ├── DraggableTaskItem.jsx    # Tarea arrastrable (useDraggable)
│   │   ├── Filters.jsx              # Búsqueda y filtros
│   │   ├── KanbanBoard.jsx          # Tablero principal con DnD
│   │   ├── Statistics.jsx           # Botón de estadísticas
│   │   ├── StatisticsModal.jsx      # Modal de estadísticas detalladas
│   │   ├── TaskForm.jsx             # Botón crear tarea
│   │   ├── TaskFormModal.jsx        # Modal crear tarea
│   │   ├── TaskItem.jsx             # Item de tarea (legacy)
│   │   └── TaskList.jsx             # Lista de tareas (legacy)
│   │
│   ├── context/              # Context API
│   │   └── TaskContext.jsx          # Estado global de tareas
│   │
│   ├── services/             # Servicios y API
│   │   └── api.js                   # Llamadas al backend
│   │
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada + TaskProvider
│   └── index.css            # Estilos globales
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎮 Guía de Uso

### Crear una Nueva Tarea

1. Click en el botón **"Nueva Tarea"**
2. Se abre un modal
3. Ingresa el **título** (obligatorio)
4. Opcionalmente agrega una **descripción**
5. Click en **"Crear Tarea"**

### Ver Estadísticas Detalladas

1. Click en el botón **"PROGRESO GENERAL"** (muestra el %)
2. Se abre un modal con:
   - Progreso general con barra visual
   - Total de tareas
   - Tareas pendientes y completadas
   - Tareas completadas hoy
   - Productividad última semana
   - Productividad último mes
   - Promedio diario

### Mover Tareas (Drag & Drop)

1. Haz click en el ícono **≡** (grip) de cualquier tarea
2. Arrastra la tarea a la columna deseada:
   - **Pendientes** (izquierda, color naranja)
   - **Completadas** (derecha, color verde)
3. Suelta para cambiar el estado automáticamente

### Editar una Tarea

1. Pasa el mouse sobre una tarea
2. Aparecen los botones de acción
3. Click en el ícono de **lápiz** (Edit)
4. Modifica título o descripción
5. Click en **"Guardar"** o **"Cancelar"**

### Eliminar una Tarea

1. Pasa el mouse sobre una tarea
2. Click en el ícono de **basura** (Delete)
3. Aparece un toast de confirmación
4. Click en **"Eliminar"** para confirmar o **"Cancelar"**

### Buscar y Filtrar Tareas

1. Usa la **barra de búsqueda** para filtrar por título o descripción
2. Selecciona el **orden** en el dropdown:
   - Más recientes primero
   - Más antiguos primero
   - Alfabético (A → Z)
   - Alfabético (Z → A)
3. Click en **"Limpiar filtros"** para resetear

---

## 🎨 Componentes Principales

### TaskContext.jsx (NEW!)
Context API para estado global:
- Gestiona todas las tareas
- Operaciones CRUD centralizadas
- Filtros y ordenamiento con useMemo
- Loading y error states
- Custom hook `useTasks()`

### App.jsx
Componente principal simplificado:
- Consume TaskContext
- Renderiza la UI principal
- Sin lógica de negocio (movida al contexto)

### KanbanBoard.jsx
Tablero Kanban con drag & drop mejorado:
- Usa `closestCenter` para detección inteligente
- Gestiona arrastre con `useDraggable`
- Divide tareas en pendientes/completadas
- Sin reordenamiento interno (solo entre columnas)

### DraggableTaskItem.jsx
Tarjeta de tarea arrastrable:
- Hook `useDraggable` de @dnd-kit
- Edición inline
- Acciones de hover (editar/eliminar)

### Statistics.jsx
Botón de estadísticas:
- Consume tasks del contexto
- Calcula porcentaje de completación
- Abre modal de estadísticas detalladas

### TaskForm.jsx
Botón para crear tareas:
- Consume `createTask` del contexto
- Abre modal de creación
- Diseño minimalista gris/negro

### Filters.jsx
Sistema de búsqueda y filtros:
- Búsqueda en tiempo real
- 4 opciones de ordenamiento
- Limpieza de filtros

---

## 🔧 React Hooks Utilizados

Este proyecto demuestra el uso profesional de React Hooks:

| Hook | Componente | Uso |
|------|-----------|-----|
| `useState` | TaskContext.jsx | Gestión de tareas, loading, error, filtros |
| `useEffect` | TaskContext.jsx | Carga inicial de tareas desde API |
| `useMemo` | TaskContext.jsx | Optimización de filtrado y ordenamiento |
| `useContext` | Múltiples | Consumir el TaskContext |
| `createContext` | TaskContext.jsx | Crear el contexto de tareas |
| `useState` | App.jsx | Solo para UI local (reducido) |
| `useState` | TaskForm.jsx | Control del modal de creación |
| `useState` | Statistics.jsx | Control del modal de estadísticas |
| `useState` | TaskFormModal.jsx | Formulario de nueva tarea |
| `useState` | Filters.jsx | Estado de búsqueda y filtros |
| `useState` | DraggableTaskItem.jsx | Modo edición de tareas |
| `useState` | KanbanBoard.jsx | Estado del drag activo |
| `useDraggable` | DraggableTaskItem.jsx | Funcionalidad drag & drop |
| `useDroppable` | BoardColumn.jsx | Zona de drop para tareas |
| `useSensor` | KanbanBoard.jsx | Sensores para drag & drop |

**Total:** 6 hooks nativos de React + 3 hooks de DnD Kit + 1 custom hook (`useTasks`)

---

## 📦 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview del build de producción
npm run preview

# Ejecutar linter
npm run lint
```

---

## 🐛 Solución de Problemas

### Error: "Network Error" o "Failed to fetch"

**Problema:** El frontend no puede conectarse al backend.

**Solución:**
1. Verifica que el backend esté corriendo
2. Revisa la variable `API_URL` en `API.JS`
3. Verifica CORS en el backend
4. Comprueba la URL en la consola del navegador

### Las tareas no se arrastran

**Problema:** El drag & drop no funciona.

**Solución:**
1. Asegúrate de hacer click en el ícono **≡** (grip)
2. Verifica que instalaste las dependencias:
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```
3. Limpia cache del navegador (Ctrl + Shift + R)

### El modal no se cierra

**Problema:** Modal se queda abierto.

**Solución:**
1. Click en el botón X
2. Click en "Cerrar" en el footer
3. Click fuera del modal (en el backdrop)

### Build falla

**Problema:** `npm run build` da error.

**Solución:**
```bash
# Limpia node_modules
rm -rf node_modules package-lock.json

# Reinstala
npm install

# Build de nuevo
npm run build
```

---


















