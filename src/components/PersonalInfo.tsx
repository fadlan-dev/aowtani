import { ErrorModal } from '@/hooks/error-modal';
import { SuccessModal } from '@/hooks/success-modal';
import { IUpdateCustomerRequest } from '@/types';
import {
  ActionIcon,
  Avatar,
  Button,
  FileButton,
  Select,
  Skeleton,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconPhotoEdit } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  className?: string;
};

const PersonalInfo = ({ className }: Props) => {
  const { data: session, update } = useSession();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [nameTitle, setNameTitle] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');

  const toggleUpdate = useCallback(() => {
    setIsUpdate((prev) => !prev);
  }, []);

  useEffect(() => {
    setNameTitle(session?.user.name_title);
    setFirstName(session?.user.first_name);
    setLastName(session?.user.last_name);
    setPhone(session?.user.phone);
    setAddress(session?.user.address);
    setPostCode(session?.user.post_code);
  }, [session?.user]);

  const { mutate: uploadProfile, isLoading } = useMutation({
    mutationFn: async (file: File) => {
      var formdata = new FormData();
      formdata.append('asset', file);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/attachments.json`,
        formdata
      );
      return data;
    },
    onError: (err: AxiosError) => {
      const content = err.response?.statusText || err.message;
      ErrorModal({ title: 'Update profile', content: content });
    },
    onSuccess: (res) => {
      const updatedSession = {
        ...session?.user,
        profile: res,
      };
      if (session) {
        updateCustomer({
          id: session?.user.id,
          payload: updatedSession as IUpdateCustomerRequest,
        });
      }
    },
  });

  const { mutate: updateCustomer, isLoading: customerLoading } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateCustomerRequest;
    }) => {
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_API_HOST}/customers/${id}.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        data: { customer: payload },
      };
      const { data } = await axios.request(config);
      return data;
    },
    onError: (err: AxiosError) => {
      const content = err.response?.statusText || err.message;
      ErrorModal({ title: 'Update customer', content: content });
    },
    onSuccess: (res) => {
      if (isUpdate) {
        toggleUpdate();
      }
      SuccessModal({
        title: 'Update customer',
        content: 'Successfully',
      });
      update(res);
    },
  });

  const submitUpdate = useCallback(() => {
    const updatedSession = {
      ...session?.user,
      name_title: nameTitle,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      address: address,
      post_code: postCode,
    };
    updateCustomer({ id: session?.user.id, payload: updatedSession });
  }, [
    session,
    nameTitle,
    firstName,
    lastName,
    phone,
    address,
    postCode,
    updateCustomer,
  ]);

  return (
    <form className={`block max-w-full sm:max-w-xs ${className}`}>
      <div className='w-[84px] h-[84px] relative m-auto rounded-full'>
        {isLoading || customerLoading ? (
          <Skeleton height={84} circle mb='xl' />
        ) : (
          <Avatar
            m='auto'
            size='xl'
            radius={100}
            src={`${process.env.NEXT_IMAGE_HOST}${session?.user.profile?.asset}`}
          />
        )}
        <div className=' absolute bottom-0 right-0'>
          <FileButton
            onChange={(e) => uploadProfile(e as File)}
            accept='image/png,image/jpeg'
          >
            {(props) => (
              <ActionIcon {...props} size='sm' variant='gradient' radius='lg'>
                <IconPhotoEdit size={14} />
              </ActionIcon>
            )}
          </FileButton>
        </div>
      </div>
      <TextInput
        readOnly={!isUpdate}
        label='ชื่อ'
        placeholder='ชื่อ'
        mt='md'
        value={nameTitle}
        onChange={(e) => setNameTitle(e.currentTarget.value)}
      />
      <TextInput
        readOnly={!isUpdate}
        label='ชื่อ'
        placeholder='ชื่อ'
        mt='md'
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      <TextInput
        readOnly={!isUpdate}
        label='สกุล'
        placeholder='สกุล'
        mt='md'
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      <TextInput
        readOnly={!isUpdate}
        label='อีเมล์'
        placeholder='อีเมล์'
        mt='md'
        defaultValue={session?.user.username || ''}
      />
      <TextInput
        readOnly={!isUpdate}
        label='เบอร์โทรศัพท์'
        placeholder='เบอร์โทรศัพท์'
        mt='md'
        value={phone}
        onChange={(e) => setPhone(e.currentTarget.value)}
      />
      <Textarea
        readOnly={!isUpdate}
        label='ที่อยู่'
        placeholder='ที่อยู่'
        minRows={4}
        mt='md'
        value={address}
        onChange={(e) => setAddress(e.currentTarget.value)}
      />
      <TextInput
        readOnly={!isUpdate}
        label='รหัสไปรษณีย์'
        placeholder='รหัสไปรษณีย์'
        mt='md'
        value={postCode}
        onChange={(e) => setPostCode(e.currentTarget.value)}
      />
      <Button
        mt='md'
        fullWidth
        loading={customerLoading}
        className='text-center'
        variant={isUpdate ? 'filled' : 'outline'}
        onClick={isUpdate ? submitUpdate : toggleUpdate}
      >
        {isUpdate ? 'บันทึกข้อมูล' : 'แก้ใข'}
      </Button>
    </form>
  );
};

export default PersonalInfo;
