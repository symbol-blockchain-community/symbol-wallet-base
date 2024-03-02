import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

/**
 * This hook is used to run an effect only when the component is updated, and not on the initial render.
 * @param effect The effect to run.
 * @param dependencies The dependencies to watch for changes.
 */
const useUpdateEffect = (effect: EffectCallback, dependencies?: DependencyList) => {
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isMountedRef.current) {
      return effect();
    } else {
      isMountedRef.current = true;
    }
  }, dependencies);
};

export default useUpdateEffect;
