import SignInForm from '@/components/forms/SignInForm';

type Props = {};

export const metadata = {
  title: 'Sign In',
};

const page = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignInForm p={24} />
    </div>
  );
};

export default page;
