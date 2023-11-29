import { useEffect, useRef } from 'react';

// Custom hook definition
function useEffectOnce(effect: React.EffectCallback) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      effect();
    }
  }, [effect]);
}

export default useEffectOnce;
