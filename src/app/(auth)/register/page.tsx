import RegisterForm from '@/components/forms/RegisterForm';

type Props = {};

export const metadata = {
  title: 'Register',
};

const Register = (props: Props) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <RegisterForm />
    </div>
  );
};

export default Register;
