'use client';
import { useGetDestinations } from '@/hooks/useGetDestinations';
import { cn } from '@/libs/utils';
import { IOrganization } from '@/types';
import { Text, Loader } from '@mantine/core';
import DestinationList from './DestinationList';

type Props = {
  className?: string;
  organization: IOrganization;
};

const NearbyAttractions = ({ className, organization }: Props) => {
  const {
    data: destinations,
    isLoading,
    isFetched,
    isError,
    error,
  } = useGetDestinations({
    organization_id: organization.id,
  });

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div className={cn(className)}>
      <Text size='lg' weight={600}>
        สถานที่ท่องเที่ยวใกล้เคียง
      </Text>
      {isLoading && !isFetched ? (
        <center>
          <Loader />
        </center>
      ) : (
        <DestinationList
          className='px-0'
          data={destinations?.data || []}
          total={0}
        />
      )}
    </div>
  );
};

export default NearbyAttractions;
