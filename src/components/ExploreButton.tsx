import { cn } from '@/libs/utils';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

interface ExploreButtonProps {
  to: string;
  className?: string;
}

const ExploreButton: FunctionComponent<ExploreButtonProps> = ({
  to,
  className,
}) => {
  const router = useRouter();
  return (
    <div className={cn(className, 'text-center')}>
      <Button variant='subtle' onClick={() => router.push(to)}>
        ดูเพิ่มเติม
      </Button>
    </div>
  );
};

export default ExploreButton;
