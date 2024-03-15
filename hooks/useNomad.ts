interface UseNomadReturn {
  on: (event: Event) => void;
}

interface UseNomadOptions {}

const useNomad = <T>(
  idOrHandle: string,
  options?: UseNomadOptions
): UseNomadReturn & T => {
  const funcReturn: T = {} as T;

  return {
    on: (event: Event) => {},
    ...funcReturn,
  };
};
