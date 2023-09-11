let prevState: unknown;

const fakeUseState = <T>(initialValue?: T) => {
  const state = (prevState ?? initialValue) as T;
  const setState = (nextState: T) => {
    prevState = nextState;
  };

  return [state, setState] as const;
};

export default fakeUseState;
