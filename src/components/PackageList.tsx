import PackageCard from './PackageItem';
import { IPackage } from '@/types';

type Props = {
  pkgs?: IPackage[];
};

const PackageList = ({ pkgs }: Props) => {
  return (
    <div
      className={'gap-4 mt-4'}
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
