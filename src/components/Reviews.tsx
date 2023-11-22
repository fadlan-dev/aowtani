'use client';
import { Button, Modal, Text, Loader } from '@mantine/core';
import { FunctionComponent, Suspense, useCallback, useState } from 'react';
import ReviewItem from './ReviewItem';
import { cn } from '@/libs/utils';
import { useParams } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { IReview, IReviewRequest } from '@/types';
import ReviewForm from './forms/ReviewForm';
import { ErrorModal } from '@/hooks/error-modal';

interface ReviewsProps {
  variant: 'destination_visits' | 'packages' | 'business_partners' | 'products';
  className?: string;
}

const itemsPerPage = 3;

const Reviews: FunctionComponent<ReviewsProps> = ({ className, variant }) => {
  const params = useParams();
  const { data: session } = useSession();

  const [opened, { open, close }] = useDisclosure(false);
  const [updateReviewVal, setUpdateReviewVal] = useState<IReview | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);

  const {
    isFetching,
    data: reviews,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_API_HOST}/${variant}/${params.id}/reviews.json`
      );
      setTotal(Math.ceil(data.length / itemsPerPage) || 0);
      return data;
    },
    queryKey: ['reviews-query'],
  });

  const { mutate: createReview, isLoading } = useMutation({
    mutationFn: async (payload: IReviewRequest) => {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_API_HOST}/${variant}/${params.id}/reviews.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        data: { review: payload },
      };
      const { data } = await axios.request(config);
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Review', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      close();
      refetch();
    },
  });

  const { mutate: updateReview, isLoading: isUpdating } = useMutation({
    mutationFn: async (payload: IReviewRequest) => {
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_API_HOST}/${variant}/${params.id}/reviews/${updateReviewVal?.id}.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        data: { review: payload },
      };
      const { data } = await axios.request(config);
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Review', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      setUpdateReviewVal(null);
      close();
      refetch();
    },
  });

  const { mutate: destroyReview, isLoading: isDestroying } = useMutation({
    mutationFn: async (id: string | number) => {
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_API_HOST}/${variant}/${params.id}/reviews/${id}.json`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      };
      const { data } = await axios.request(config);
      return data;
    },
    onError: (err: AxiosError) => {
      ErrorModal({ title: 'Review', content: err.response?.statusText });
    },
    onSuccess: (res) => {
      refetch();
    },
  });

  const paginatedData = useCallback(() => {
    return reviews.slice(0, currentPage * itemsPerPage);
  }, [reviews, currentPage]);

  const showMore = useCallback(() => {
    if (currentPage < total) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  if (isFetching && !isFetched) {
    return (
      <center className='mt-10'>
        <Loader variant='dots' />
      </center>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        centered
        onClose={() => {
          close();
          setUpdateReviewVal(null);
        }}
        title={`${updateReviewVal ? 'แก้ใข' : 'แสดง'}ความคิดเห็น`}
      >
        <Suspense fallback={<Loader variant='dots' />}>
          <ReviewForm
            loading={isLoading || isUpdating}
            onSubmit={(values) =>
              updateReviewVal
                ? updateReview({ ...values, customer_id: session?.user.id })
                : createReview({ ...values, customer_id: session?.user.id })
            }
            defaultValues={
              updateReviewVal
                ? {
                    star: updateReviewVal?.star || 0,
                    text: updateReviewVal?.text || '',
                    images: updateReviewVal?.images || [],
                    customer_id: updateReviewVal?.customer?.id || 0,
                  }
                : null
            }
          />
        </Suspense>
      </Modal>
      <div className={cn(className, 'flex flex-col gap-2')}>
        {session && (
          <div className='text-end'>
            <Button variant='subtle' onClick={open}>
              แสดงความคิดเห็น
            </Button>
          </div>
        )}
        {reviews.length > 0 ? (
          <>
            {paginatedData().map((review: IReview) => (
              <ReviewItem
                key={review.id}
                data={review}
                onUpdate={(review) => {
                  if (review) {
                    setUpdateReviewVal(review as IReview);
                    open();
                  }
                }}
                onDelete={(e) => destroyReview(e)}
              />
            ))}
            {currentPage < total && (
              <div className='text-center'>
                <Button variant='subtle' size='sm' onClick={showMore}>
                  อ่านต่อ
                </Button>
              </div>
            )}
          </>
        ) : (
          <center className='py-4 pb-6'>
            <Text c='dimmed'>No reviews yet</Text>
          </center>
        )}
      </div>
    </>
  );
};

export default Reviews;
