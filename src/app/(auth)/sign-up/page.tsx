import SignUpForm from '@/components/forms/SignUpForm';

type Props = {};

export const metadata = {
  title: 'Register',
};

const page = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignUpForm />
    </div>
  );
};

export default page;
