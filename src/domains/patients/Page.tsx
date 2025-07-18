import { Card } from '@/design-system/components/ui/card';
import { useLoaderData } from 'react-router';
import { PatientInfoCard } from './components/PatientInfoCard';

function Page() {
  const { data } = useLoaderData();

  console.log({ data });

  return (
    <div className="grid grid-cols-[repeat(12,1fr)] gap-3 px-4">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <PatientInfoCard patient={data[0]} />
      </div>
      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <Card>2</Card>
      </div>
      <div className="col-span-12 lg:col-span-2 xl:col-span-2">
        <Card>3</Card>
      </div>
    </div>
  );
}

export default Page;
