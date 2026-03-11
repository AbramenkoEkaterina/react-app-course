import { useCallback, useState } from 'react';
import { delayFn } from '../helpers/delayFn';

export const useFetch = <T, A = void>(callback: (arg: A) => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFn = useCallback(
    async (arg: A): Promise<T | undefined> => {
      try {
        setIsLoading(true);
        setError(null);
        await delayFn();

        const response = await callback(arg);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknow error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [callback]
  );

  return [fetchFn, isLoading, error] as const;
};

// T — тип данных, которые вернёт сервер
// A — тип аргумента
// A = void — если аргумента нет, он необязателен
