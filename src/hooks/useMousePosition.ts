import { useState, useCallback } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(initialPosition: MousePosition = { x: -100, y: -100 }) {
  const [position, setPosition] = useState<MousePosition>(initialPosition);

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  return { position, handleMouseMove, setPosition };
}
