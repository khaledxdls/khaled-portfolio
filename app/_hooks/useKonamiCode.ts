"use client";
import { useEffect, useRef, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onSuccess: () => void) {
  const sequenceRef = useRef<string[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      sequenceRef.current = [
        ...sequenceRef.current.slice(-(KONAMI_CODE.length - 1)),
        e.key,
      ];

      if (
        sequenceRef.current.length === KONAMI_CODE.length &&
        sequenceRef.current.every((key, i) => key === KONAMI_CODE[i])
      ) {
        sequenceRef.current = [];
        onSuccess();
      }
    },
    [onSuccess]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
