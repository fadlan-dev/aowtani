import SuccessItem from '@/components/SuccessItem';
type Props = {};

const page = (props: Props) => {
  return (
    <div className='pt-36 text-center px-4'>
      <SuccessItem to='/product' />
    </div>
  );
};

export default page;
