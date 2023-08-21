import SignUpForm from '@/components/forms/SignUpForm';

type Props = {};

export const metadata = {
  title: 'Register',
};

const page = (props: Props) => {
  return (
    <div className='flex items-center justify-center py-20'>
      <SignUpForm />
    </div>
  );
};

export default page;
