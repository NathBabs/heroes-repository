import React, { useState } from 'react';
import {
  CircleNotch,
  ShieldCheckered
} from "@phosphor-icons/react";

interface SuperheroFormProps {
  onSubmit: (superhero: { name: string; superpower: string; humilityScore: number; }) => void;
  isLoading?: boolean;
}

const MAX_NAME_LENGTH = 50;
const MAX_SUPERPOWER_LENGTH = 100;

export function SuperheroForm({ onSubmit, isLoading }: SuperheroFormProps) {
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, superpower, humilityScore });
    setName('');
    setSuperpower('');
    setHumilityScore(5); // set humilityScore to 5 after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheckered weight='fill' className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Add New Superhero</h2>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Superhero Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            maxLength={MAX_NAME_LENGTH}
          />
          <span className="absolute right-2 top-2 text-xs text-gray-400">
            {name.length}/{MAX_NAME_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="superpower" className="block text-sm font-medium text-gray-700 mb-1">
          Superpower
        </label>
        <div className="relative">
          <input
            type="text"
            id="superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value.slice(0, MAX_SUPERPOWER_LENGTH))}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            maxLength={MAX_SUPERPOWER_LENGTH}
          />
          <span className="absolute right-2 top-2 text-xs text-gray-400">
            {superpower.length}/{MAX_SUPERPOWER_LENGTH}
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="humilityScore" className="block text-sm font-medium text-gray-700 mb-1">
          Humility Score (1-10)
        </label>
        <input
          type="range"
          id="humilityScore"
          min="1"
          max="10"
          value={humilityScore}
          onChange={(e) => setHumilityScore(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-center mt-1 text-gray-600">{humilityScore}</div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <CircleNotch className="w-4 h-4 animate-spin" />
            Adding Superhero...
          </>
        ) : (
          'Add Superhero'
        )}
      </button>
    </form>
  );
}