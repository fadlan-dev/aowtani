import Reviews from '@/components/Reviews';
import { getDestination } from '@/libs/services/getDestination';
import { getPackage } from '@/libs/services/getPackage';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
  const destination = await getDestination(params.id);
  const pkg = await getPackage(params.id);
  const name = searchParams?.t === 'destination' ? destination.name : pkg.name;
  return (
    <div className='mt-20 mb-24'>
      <div className='container'>
        <div className='bg-white p-4 border border-solid border-slate-300 rounded'>
          <h1>{name}</h1>
          {searchParams?.t === 'destination' ? (
            <p>{destination.description}</p>
          ) : (
            <p>{pkg.desciption}</p>
          )}
        </div>
        <Reviews className='mt-6' />
      </div>
    </div>
  );
};

export default Page;
