import FoodList from '@/components/FoodList';
import FoodSearch from '@/components/FoodSearch';

type Props = {};

export const metadata = {
  title: 'Food',
};

const Page = (props: Props) => {
  return (
    <div className='mt-24'>
      <div className='container'>
        <h1 className='text-center '>รายการอาหาร</h1>
        <FoodSearch className='mt-6' />
        <FoodList className='mt-6' />
      </div>
    </div>
  );
};

export default Page;
