'use client';
import { cn } from '@/libs/utils';
import { Button } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface SuccessItemProps {
  to: string;
  className?: string;
}

const SuccessItem: FunctionComponent<SuccessItemProps> = ({
  to,
  className,
}) => {
  return (
    <section className={cn(className)}>
      <IconCircleCheckFilled size={56} className='text-[#52C41A]' />
      <h1>การสั่งซื้อของคุณเสร็จสิน</h1>
      <h3 className='mt-1 font-normal text-zinc-500'>
        โปรดรอแอดมินติดต่อกลับในช่องทางการติดต่อที่ระบุไว้ข้างต้น
      </h3>
      <Button component='a' variant='outline' href={to}>
        กลับไปหน้าของฝาก
      </Button>
    </section>
  );
};

export default SuccessItem;
