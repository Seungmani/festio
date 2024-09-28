import { useCallback } from 'react';

const useHandleInputChange = (setState: React.Dispatch<React.SetStateAction<string>>) => {
  return useCallback((value: string) => {
    setState((prevValue) => (prevValue === value ? prevValue : value));
  }, [setState]);
};

export default useHandleInputChange;
