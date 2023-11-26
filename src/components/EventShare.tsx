'use client';
import { Avatar } from '@mantine/core';
import { IconBrandFacebook, IconWorldWww } from '@tabler/icons-react';
import { FunctionComponent } from 'react';

interface EventShareProps {}

const EventShare: FunctionComponent<EventShareProps> = () => {
  return (
    <div className='flex items-center p-2 gap-2'>
      <Avatar radius='xl' color='primary' size='sm'>
        <IconBrandFacebook size={18} />
      </Avatar>

      <Avatar radius='xl' color='primary' size='sm'>
        <IconWorldWww size={18} />
      </Avatar>
    </div>
  );
};

export default EventShare;
