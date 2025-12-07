import { Search, X } from 'lucide-react';
import { useState } from 'react';

function Filters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange({ searchTerm, sortBy: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    onFilterChange({ searchTerm: '', sortBy: 'newest' });
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 px-4 py-3 h-full flex flex-col gap-3">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar por título..."
          className="w-full pl-9 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition placeholder:text-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ordenar */}
      <div>
        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">
          Ordenar por
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition appearance-none cursor-pointer text-gray-700"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="alphabetical">A → Z</option>
            <option value="alphabetical-desc">Z → A</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Limpiar filtros */}
      {(searchTerm || sortBy !== 'newest') && (
        <button
          onClick={clearFilters}
          className="text-xs text-gray-600 hover:text-gray-900 transition font-medium text-center py-1"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

export default Filters;