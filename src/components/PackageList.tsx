import Empty from './Empty';
import PackageCard from './PackageItem';
import { IPackage } from '@/types';

type Props = {
  pkgs?: IPackage[];
};

const PackageList = ({ pkgs }: Props) => {
  if (pkgs?.length === 0) {
    return <Empty className='px-4 mt-10 md:mt-4' />;
  }

  return (
    <div
      className={'gap-4 px-4 mt-4'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px, 1fr))',
      }}
    >
      {(pkgs || []).map((pkg: IPackage, idx: number) => (
        <PackageCard pkg={pkg} key={idx} />
      ))}
    </div>
  );
};

export default PackageList;
