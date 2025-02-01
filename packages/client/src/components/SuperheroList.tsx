import { Award, Star, RefreshCw, Loader2 } from 'lucide-react';
import type { Superhero } from '../types/superhero';

interface SuperheroListProps {
  superheroes: Superhero[];
  onRefresh: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function SuperheroList({ superheroes, onRefresh, isLoading, error }: SuperheroListProps) {
  // At the start of the component
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">Humble Superheroes</h2>
        </div>
        <button
          onClick={() => {
            onRefresh();
          }}
          disabled={isLoading}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:text-gray-400"
          title="Refresh list"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : (
          <>
            {superheroes.map((hero, index) => (
              <div
                key={index}
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{hero.name}</h3>
                    <p className="text-sm text-gray-600">{hero.superpower}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {hero.humilityScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {superheroes.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No superheroes added yet. Please add some superheroes to see them here.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}