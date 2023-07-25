'use client';
import { cn } from '@/libs/utils';
import { Box, Button, Card, FileInput, Input, Title } from '@mantine/core';
import Image from 'next/image';
import { FunctionComponent, Suspense, useState } from 'react';

interface UploadSlipProps {
  className?: string;
}

const UploadSlip: FunctionComponent<UploadSlipProps> = ({ className }) => {
  const [file, setFile] = useState<File>();
  const [imageDataUrl, setImageDataUrl] = useState<string>();

  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageDataUrl(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className={cn(className)}>
      <Title order={4}>แจ้งการชำระเงิน</Title>
      <FileInput
        mt='sm'
        label='อัพโหลดหลักฐานการชำระเงิน'
        placeholder='Click to Upload'
        onChange={(file) => {
          if (file) {
            setFile(file);
            handleImageChange(file);
          }
        }}
      />
      {imageDataUrl && (
        <Box mt='sm' className='relative aspect-square bg-zinc-100 rounded p-2'>
          <Image className='object-contain' src={imageDataUrl} alt='' fill />
        </Box>
      )}
      <Button
        fullWidth
        mt='md'
        disabled={!file ? true : false}
        variant='gradient'
      >
        ชำระเงิน
      </Button>
    </Card>
  );
};

export default UploadSlip;
