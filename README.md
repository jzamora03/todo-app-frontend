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

- **Interfaz Drag & Drop** - Arrastra tareas entre columnas
- **Estadísticas Detalladas** - Modal con métricas de productividad
- **Búsqueda y Filtros** - Buscar y ordenar tareas
- **Edición Inline** - Edita tareas directamente
- **100% Responsive** - Funciona en todos los dispositivos
- **UI Moderna** - Gradientes, animaciones y efectos
- **Notificaciones Toast** - Feedback visual instantáneo

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
│   │   ├── DraggableTaskItem.jsx    # Tarea arrastrable
│   │   ├── Filters.jsx              # Búsqueda y filtros
│   │   ├── KanbanBoard.jsx          # Tablero principal
│   │   ├── Statistics.jsx           # Botón de estadísticas
│   │   ├── StatisticsModal.jsx      # Modal de estadísticas
│   │   ├── TaskForm.jsx             # Botón crear tarea
│   │   ├── TaskFormModal.jsx        # Modal crear tarea
│   │   ├── TaskItem.jsx             # Item de tarea
│   │   └── TaskList.jsx             # Lista de tareas
│   │
│   ├── services/             # Servicios y API
│   │   └── api.js                   # Llamadas al backend
│   │
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
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

### App.jsx
Componente principal que maneja:
- Estado global de tareas
- Carga inicial de datos
- Operaciones CRUD
- Filtros y ordenamiento

### KanbanBoard.jsx
Tablero Kanban con drag & drop:
- Gestiona el arrastre de tareas
- Divide tareas en pendientes/completadas
- Overlay visual al arrastrar

### Statistics.jsx
Botón que muestra el progreso:
- Calcula porcentaje de completación
- Abre modal de estadísticas detalladas

### TaskForm.jsx
Botón para crear tareas:
- Abre modal de creación
- Diseño minimalista

### Filters.jsx
Sistema de búsqueda y filtros:
- Búsqueda en tiempo real
- Ordenamiento múltiple
- Limpieza de filtros

---

## 🔧 React Hooks Utilizados

Este proyecto demuestra el uso profesional de React Hooks:

| Hook | Componente | Uso |
|------|-----------|-----|
| `useState` | App.jsx | Gestión de tareas, loading, error, filtros |
| `useEffect` | App.jsx | Carga inicial de tareas desde API |
| `useMemo` | App.jsx | Optimización de filtrado y ordenamiento |
| `useState` | TaskForm.jsx | Control del modal de creación |
| `useState` | Statistics.jsx | Control del modal de estadísticas |
| `useState` | TaskFormModal.jsx | Formulario de nueva tarea |
| `useState` | Filters.jsx | Estado de búsqueda y filtros |
| `useState` | DraggableTaskItem.jsx | Modo edición de tareas |
| `useSortable` | DraggableTaskItem.jsx | Funcionalidad drag & drop |
| `useDroppable` | BoardColumn.jsx | Zona de drop para tareas |

**Total:** 3 hooks diferentes (useState, useEffect, useMemo) + hooks de DnD Kit

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

## 📝 Características técnicas

### Arquitectura de Componentes

- **Componentes Separados:** Arquitectura modular
- **Props Drilling:** Paso de props de padres a hijos
- **Estado Local:** useState en cada componente
- **Memoización:** useMemo para optimización















