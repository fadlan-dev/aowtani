import Reviews from '@/components/Reviews';
import { getDestination } from '@/libs/services/getDestination';
import { getPackage } from '@/libs/services/getPackage';
import { IDestination, IPackage } from '@/types';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type Variant = 'destination' | 'package';

const Page = async ({ params, searchParams }: Props) => {
  const variant = searchParams.variant as Variant;
  const reviewTO =
    variant === 'destination'
      ? ((await getDestination(params.id)) as IDestination)
      : ((await getPackage(params.id)) as IPackage);

  return (
    <div className='mt-20 mb-24'>
      <div className='container'>
        <div className='bg-white p-4 border border-solid border-slate-300 rounded'>
          <h1>{reviewTO.name}</h1>
          <p>
            {variant === 'destination'
              ? (reviewTO as IDestination).description
              : (reviewTO as IPackage).desciption}
          </p>
        </div>
        {variant && <Reviews variant={variant} className='mt-6' />}
      </div>
    </div>
  );
};

export default Page;
