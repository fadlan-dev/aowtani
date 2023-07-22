'use client';
import { cn } from '@/libs/utils';
import { Badge, Group } from '@mantine/core';
import { FunctionComponent } from 'react';

interface PackageTypeProps {
  types: string[];
  className?: string;
}

const PackageType: FunctionComponent<PackageTypeProps> = ({
  types,
  className,
}) => {
  return (
    <Group spacing={4} className={cn(className, 'flex gap-1')}>
      {types.map((type: string) => (
        <Badge key={type}>{type}</Badge>
      ))}
    </Group>
  );
};

export default PackageType;
