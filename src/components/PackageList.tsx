import Empty from './Empty';
import PackageItem from './PackageItem';
import { IPackage } from '@/types';

type Props = {
  data: IPackage[];
};

const PackageList = ({ data }: Props) => {
  if (data?.length === 0) {
    return <Empty className='px-4 mt-10 md:mt-4' />;
  }

  return (
    <div className={'grid grid-cols-list gap-4 px-4 mt-4'}>
      {data.map((pkg: IPackage, idx: number) => (
        <PackageItem pkg={pkg} key={idx} />
      ))}
    </div>
  );
};

export default PackageList;
