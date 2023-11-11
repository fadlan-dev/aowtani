type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return <div className='mt-[60px] lg:mt-20 mb-24'>{params.id}</div>;
};

export default Page;
