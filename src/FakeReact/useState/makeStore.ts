import fakeUseState from './fakeUseState';

type Subscriber = () => void;

const makeStore = <T>(initialValue?: T) => {
  const subscribers: Set<Subscriber> = new Set();
  let cachedState: T;
  let cachedSnapshot: ReturnType<typeof fakeUseState<T>>;

  const subscribe = (subscriber: Subscriber) => {
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  };

  const notify = () => subscribers.forEach((subscriber) => subscriber());

  const getSnapshot = () => {
    const [state, setState] = fakeUseState(initialValue);

    if (!Object.is(cachedState, state)) {
      const setStateWithNotification = (nextState: T) => {
        setState(nextState);
        notify();
      };

      cachedState = state;
      cachedSnapshot = [state, setStateWithNotification];
    }

    return cachedSnapshot;
  };

  return { subscribe, getSnapshot } as const;
};

export default makeStore;

// type Subscriber = () => void;

// const subscribers = new Set<Subscriber>();

// let cachedState: unknown;
// let cachedSnapshot: readonly [unknown, (nextState: unknown) => void];

// const fakeUseState = <T>(initialValue?: T) => {
//   const subscribe = (subscriber: Subscriber) => {
//     subscribers.add(subscriber);
//     return () => subscribers.delete(subscriber);
//   };

//   const notify = () => subscribers.forEach((subscriber) => subscriber());

//   state = state ?? initialValue;
//   const setState = (nextState: T) => {
//     state = nextState;
//     notify();
//   };

//   if (!Object.is(state, cachedState)) {
//     cachedState = state;
//     cachedSnapshot = [state, setState] as typeof cachedSnapshot;
//   }

//   return cachedSnapshot as readonly [T, (nextState: T) => void];
// };

// export default fakeUseState;
