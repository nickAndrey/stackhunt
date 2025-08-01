import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import { Loader } from '../components/Loader';

type LoaderProps<T> = {
  children: (data: T) => ReactNode;
};

export function createPageLoader<T>(
  queryKeyPrefix: string,
  fetchFn: (id?: string) => Promise<T | undefined>
) {
  return function EntityPageLoader({ children }: LoaderProps<T>) {
    const { id } = useParams();

    const { data, status, error } = useQuery<T | undefined>({
      queryKey: [id ? `${queryKeyPrefix}_${id}` : queryKeyPrefix],
      queryFn: () => fetchFn(id),
      staleTime: 1000,
    });

    if (status === 'pending') return <Loader text="•••" />;

    if (status === 'error') return <h2>{error.message}</h2>;

    if (!data) return <h2>Not Found</h2>;

    return children(data);
  };
}
