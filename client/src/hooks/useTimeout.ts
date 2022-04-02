import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (callback: Function, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return clear;
  }, [delay, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { set, reset, clear };
};
