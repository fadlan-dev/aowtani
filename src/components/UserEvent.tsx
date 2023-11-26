'use client';
import { IUserEvent } from '@/types';
import { Avatar } from '@mantine/core';
import { FunctionComponent } from 'react';
import Empty from './Empty';

interface UserEventProps {
  user?: IUserEvent;
}

const UserEvent: FunctionComponent<UserEventProps> = ({ user }) => {
  if (!user) {
    return <Empty />;
  }
  return (
    <div className='flex items-center bg-white p-2 gap-2'>
      <Avatar color='primary' radius='xl' />
      <p>{user.fullname}</p>
    </div>
  );
};

export default UserEvent;
