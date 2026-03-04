import { useState } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch =<T, A =  void>(callback: (arg: A) => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState("");

    const fetchFn = async (arg: A): Promise<T | undefined> => {
        try {
      setIsLoading(true);
      setError("");
      await delayFn();

      const response = await callback(arg);
      return response;

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Unknow error")
      }
    } finally {
      setIsLoading(false);
    }
    }

    return [fetchFn, isLoading, error] as const;
}

// T — тип данных, которые вернёт сервер
// A — тип аргумента
// A = void — если аргумента нет, он необязателен