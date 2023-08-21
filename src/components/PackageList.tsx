import { cn } from '@/libs/utils';
import Empty from './Empty';
import PackageItem from './PackageItem';
import { IPackage } from '@/types';

type Props = {
  className?: string;
  data: IPackage[];
};

const PackageList = ({ className, data }: Props) => {
  if (data?.length === 0) {
    return <Empty className='px-4 mt-10 md:mt-4' />;
  }

  return (
    <div className={cn('grid grid-cols-list gap-4', className)}>
      {data.map((pkg: IPackage, idx: number) => (
        <PackageItem pkg={pkg} key={idx} />
      ))}
    </div>
  );
};

export default PackageList;
