import { useCallback, useState } from 'react';

export const useStateValidation = <S>(validationFunc: Function, initialValue: S) => {
  const [state, setState] = useState<S>(initialValue);
  const [isValid, setValid] = useState<S>(() => validationFunc(state));

  const onChange = useCallback<any>(
    (nextState: S) => {
      const value = typeof nextState === 'function' ? nextState(state) : nextState;
      setState(value);
      setValid(validationFunc(value));
    },
    [validationFunc],
  );

  return [state, onChange, isValid];
};
