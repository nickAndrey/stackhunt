import { useLoaderData } from 'react-router';

function Page() {
  const { data } = useLoaderData();

  console.log({ data });

  return (
    <div>
      <div className="relative overflow-x-auto"></div>
    </div>
  );
}

export default Page;
