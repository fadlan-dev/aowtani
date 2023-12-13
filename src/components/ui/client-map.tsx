'use client';
import { FunctionComponent, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { getDestinations } from '@/libs/services/getDestinations';
import { IconSearch } from '@tabler/icons-react';
import CustomMarker from './custom-marker';
import { Autocomplete, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import Image from 'next/image';
import { IDestination, IPartner } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getPartners } from '@/libs/services/getPartners';
import Link from 'next/link';

interface ClientMapProps {}

const zoom = 13;
const position: LatLngExpression = [6.9038367, 101.3002721];
type VariantType = 'Destination' | 'Hotel' | 'Restaurant' | 'Mosques';

const ClientMap: FunctionComponent<ClientMapProps> = () => {
  const [variant, setVariant] = useState<VariantType>('Destination');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: destinations } = useQuery({
    queryKey: ['destination'],
    queryFn: () =>
      getDestinations({
        per_page: 3,
        search: '',
      }),
  });

  const { data: hotels } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => getPartners({ type: 'Hotel', per_page: 3, search: '' }),
  });

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getPartners({ type: 'Restaurant', per_page: 3, search: '' }),
  });

  const { data: mosques } = useQuery({
    queryKey: ['mosques'],
    queryFn: () =>
      getDestinations({
        destination_type_id: '12',
        per_page: 3,
        search: '',
      }),
  });

  const Markers: (IDestination | IPartner)[] = useMemo(() => {
    switch (variant) {
      case 'Destination':
        return destinations?.data || [];
      case 'Hotel':
        return hotels?.data || [];
      case 'Restaurant':
        return restaurants?.data || [];
      case 'Mosques':
        return mosques?.data || [];

      default:
        return [] as (IDestination | IPartner)[];
    }
  }, [variant, destinations, hotels, restaurants, mosques]);

  const filterMarkers = (
    markers: (IDestination | IPartner)[],
    query: string
  ): (IDestination | IPartner)[] => {
    return markers.filter((marker) =>
      marker.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredMarkers = useMemo(
    () => filterMarkers(Markers, searchQuery),
    [Markers, searchQuery]
  );

  const AutocompleteData = useMemo(() => {
    const mapped = Markers.map((item) => item.name);
    return mapped;
  }, [Markers]);

  return (
    <div className='relative'>
      <div className='absolute top-4 z-10 flex items-center justify-center gap-2 inset-x-0 ml-14 mr-4 md:mr-14'>
        <div className='flex gap-2'>
          <Autocomplete
            icon={<IconSearch size={16} />}
            placeholder='ค้นหาสถานที่ท่องเที่ยว'
            data={AutocompleteData}
            onChange={(value) => setSearchQuery(value)}
          />
          <Select
            className='w-36'
            value={variant}
            onChange={(value) => setVariant(value as VariantType)}
            data={[
              { label: 'สถานที่ท่องเที่ยว', value: 'Destination' },
              { label: 'ที่พักผ่อน', value: 'Hotel' },
              { label: 'อาหารจานโปรด', value: 'Restaurant' },
              { label: 'มัสยิด', value: 'Mosques' },
            ]}
          />
        </div>
      </div>
      <MapContainer
        style={{ zIndex: 1 }}
        className='w-screen h-[calc(100vh-80px)]'
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {(filteredMarkers || [])?.map((marker) =>
          marker.lat && marker.long ? (
            <Marker
              key={marker.id}
              position={[Number(marker.lat), Number(marker.long)]}
              icon={CustomMarker({
                id: `${marker.id}`,
                image:
                  'images' in marker ? marker.images[0] : marker.banners[0],
              })}
              eventHandlers={{
                click: () =>
                  modals.open({
                    centered: true,
                    title: marker.name,
                    children: (
                      <div className='flex items-center gap-2 flex-col'>
                        <div className='w-full aspect-video relative'>
                          <Image
                            fill
                            className='object-cover aspect-video'
                            src={`${process.env.NEXT_IMAGE_HOST}${
                              'images' in marker
                                ? marker.images[0].asset
                                : marker.banners[0].asset
                            }`}
                            alt={marker.name}
                          />
                        </div>
                        <div className='flex items-center justify-center flex-col'>
                          <p>{marker.address}</p>
                          <Link
                            onClick={() => modals.closeAll()}
                            href={`/${
                              variant === 'Mosques'
                                ? 'destination'
                                : variant.toLocaleLowerCase()
                            }/${marker.id}`}
                            className='text-sm text-primary'
                          >
                            ดูรายละเอียด
                          </Link>
                        </div>
                      </div>
                    ),
                  }),
              }}
            />
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default ClientMap;
