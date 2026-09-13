import { useState } from 'react';

const ANIMATION_MS = 420;

/**
 * Drives the "bin eats the row" delete animation (see .animate-eaten / .animate-bin-chomp
 * in src/index.css): the row shrinks + slides toward the trash button while it wiggles,
 * then the real delete runs once the animation finishes.
 */
export function useEatenDelete<T extends string>() {
  const [deletingId, setDeletingId] = useState<T | null>(null);

  const trigger = (id: T, onDelete: () => void | Promise<void>) => {
    if (deletingId) return;
    setDeletingId(id);
    setTimeout(() => {
      void onDelete();
      setDeletingId(null);
    }, ANIMATION_MS);
  };

  const rowClass = (id: T) => (deletingId === id ? 'animate-eaten' : '');
  const binClass = (id: T) => (deletingId === id ? 'animate-bin-chomp' : '');

  return { deletingId, trigger, rowClass, binClass };
}
