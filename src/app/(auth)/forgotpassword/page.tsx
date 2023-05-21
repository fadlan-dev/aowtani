import ForgotpasswordForm from '@/components/forms/ForgotpassForm';

type Props = {};

export const metadata = {
  title: 'Forgot Password',
};

const page = ({}: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <ForgotpasswordForm />
    </div>
  );
};

export default page;
