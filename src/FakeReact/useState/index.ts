import { useRef, useSyncExternalStore } from 'react';
import makeStore from './makeStore';

const useState = <T>(initialValue?: T) => {
  const {
    current: { subscribe, getSnapshot },
  } = useRef(makeStore(initialValue));
  return useSyncExternalStore(subscribe, getSnapshot);
};

export default useState;
