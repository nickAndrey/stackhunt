import type { Patient } from '@/shared/types/patient';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Page() {
  const { status, data, error } = useQuery({
    queryKey: ['patients'],
    queryFn: async (): Promise<Patient[]> => {
      const res = await axios.get('/src/shared/temp/data/patients.json');
      return res.data.data;
    },
    staleTime: 60 * 60 * 1000, // -> 1h
  });

  if (status === 'pending') return <h2>Loading...</h2>;

  if (status === 'error') return <h2>{error.message}</h2>;

  return <div>{data[0].email}</div>;
}

export default Page;
