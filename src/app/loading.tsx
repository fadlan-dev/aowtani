import Image from 'next/image';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Image width={112} height={80} src='./logo.svg' alt='loading' />
    </div>
  );
};

export default Loading;
