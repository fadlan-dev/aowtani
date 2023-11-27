import {
  ActionIcon,
  Button,
  FileButton,
  Flex,
  Group,
  Loader,
  Paper,
  Rating,
  Text,
  Textarea,
} from '@mantine/core';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { IconPlus, IconX } from '@tabler/icons-react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { IImage, IReviewRequest } from '@/types';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { ErrorModal } from '@/hooks/error-modal';

interface ReviewFormProps {
  loading: boolean;
  defaultValues: IReviewRequest | null;
  onSubmit: (values: { star: number; text: string; images: IImage[] }) => void;
}

const imageSchema = z
  .object({
    id: z.number(),
    asset: z.string(),
  })
  .optional();

const schema = z.object({
  text: z.string().min(1, { message: 'Please input your review' }).max(100, {
    message: 'Please limit your review to a maximum of 100 characters',
  }),
  star: z.number().min(1, { message: 'Please select your star' }),
  images: z.array(imageSchema).optional(),
});

const ReviewForm: FunctionComponent<ReviewFormProps> = ({
  loading,
  defaultValues,
  onSubmit,
}) => {
  const form = useForm({
    initialValues: {
      text: defaultValues?.text || '',
      star: defaultValues?.star || '',
      images: defaultValues?.images || [],
    },
    validate: zodResolver(schema),
  });

  const { mutate: uploadImage, isLoading } = useMutation({
    mutationFn: async (file: File) => {
      var formdata = new FormData();
      formdata.append('asset', file);
      const { data } = await axios.post(
        `${process.env.NEXT_IMAGE_HOST}/attachments.json`,
        formdata
      );
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Upload', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      let updateImages =
        form.values.images.length === 0 ? [res] : [...form.values.images, res];
      form.setFieldValue('images', updateImages as any);
    },
  });

  const handleFileChange = (file: File) => file && uploadImage(file);

  const handleDeleteImages = (id: number | string) => {
    let updated = form.values.images.filter((image: IImage) => image.id !== id);
    form.setFieldValue('images', updated);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values as { star: number; text: string; images: IImage[] });
      })}
    >
      <Flex direction='column'>
        <Text size='sm'>คะแนน</Text>
        <Rating {...form.getInputProps('star')} />
        {form.errors['star'] && (
          <Text color='red' size='xs'>
            {form.errors['star']}
          </Text>
        )}
      </Flex>
      <Textarea
        withAsterisk
        label='แสดงความคิดเห็น'
        mt='md'
        autosize
        minRows={2}
        {...form.getInputProps('text')}
      />
      <Flex direction='column' mt='md'>
        <Text size='sm'>อัพโหลดรูป {form.errors['images']}</Text>
        <div>
          <Flex gap='md' wrap='wrap'>
            {form.values.images.map((image: IImage) => (
              <div className='relative group' key={image.id}>
                <ActionIcon
                  color='red'
                  variant='filled'
                  radius='xl'
                  size='xs'
                  className='absolute top-1 right-1 hidden group-hover:flex'
                  onClick={() => handleDeleteImages(image.id)}
                >
                  <IconX />
                </ActionIcon>

                <Image
                  width={320}
                  height={112}
                  src={`${process.env.NEXT_IMAGE_HOST}${image.asset}`}
                  alt={`${image.id}`}
                  className='border-zinc-200 w-auto'
                />
              </div>
            ))}
            <FileButton
              onChange={handleFileChange}
              accept='image/png,image/jpeg'
            >
              {(props) => (
                <Paper
                  {...props}
                  withBorder
                  className='flex flex-col items-center justify-center gap-2 w-28 aspect-square'
                >
                  {isLoading ? <Loader /> : <IconPlus size={16} />}
                  <Text size='sm'>{isLoading ? 'Uploading' : 'Upload'}</Text>
                </Paper>
              )}
            </FileButton>
          </Flex>
        </div>
      </Flex>
      <Group position='right' mt='md'>
        <Button type='submit' loading={loading}>
          {defaultValues?.customer_id ? 'บันทึก' : 'ตกลง'}
        </Button>
      </Group>
    </form>
  );
};

export default ReviewForm;
