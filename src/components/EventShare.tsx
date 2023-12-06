'use client';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconBrandFacebook, IconCheck, IconCopy } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import { FacebookShareButton } from 'next-share';

interface EventShareProps {}

const EventShare: FunctionComponent<EventShareProps> = () => {
  return (
    <div className='flex items-center p-2 gap-2'>
      <FacebookShareButton
        url={`${window.location.href}`}
        quote={'next-share is a social share buttons for your next React apps.'}
      >
        <ActionIcon variant='light' radius='lg' color='primary'>
          <IconBrandFacebook size={16} />
        </ActionIcon>
      </FacebookShareButton>
      <CopyButton value={`${window.location.href}`} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? 'Copied' : 'Copy'}
            withArrow
            position='right'
          >
            <ActionIcon
              variant='light'
              radius='lg'
              color={copied ? 'teal' : 'primary'}
              onClick={copy}
            >
              {copied ? <IconCheck size='1rem' /> : <IconCopy size='1rem' />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </div>
  );
};

export default EventShare;
