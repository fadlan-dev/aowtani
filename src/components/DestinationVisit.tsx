'use client';
import { cn } from '@/libs/utils';
import { IDestinationVisit } from '@/types';
import { IconMapPin } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface DestinationVisitProps {
  destination: IDestinationVisit;
  className?: string;
}

const DestinationVisit: FunctionComponent<DestinationVisitProps> = ({
  destination,
  className,
}) => {
  return (
    <ul className={cn(className)}>
      <li className='flex gap-1 items-center text-primary'>
        <IconMapPin size={14} />
        <span>{destination.name}</span>
      </li>
    </ul>
  );
};

export default DestinationVisit;
