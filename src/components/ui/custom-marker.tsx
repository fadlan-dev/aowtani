import { IImage } from '@/types';
import { IconHome } from '@tabler/icons-react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import Image from 'next/image';

type Props = {
  id: string;
  image: IImage;
};

const CustomMarker = ({ image, ...props }: Props) => {
  const Marker = () => (
    <div className='flex items-cente w-8  aspect-square justify-center bg-white rounded-full p-px shadow'>
      <div className='aspect-square rounded-full bg-slate-400 overflow-hidden'>
        <Image
          width={32}
          height={32}
          className='w-full h-full object-cover'
          alt='marker'
          src={`${process.env.NEXT_IMAGE_HOST}${image.asset}`}
        />
        <IconHome {...props} />
      </div>
    </div>
  );
  return new L.DivIcon({
    className: 'custom icon',
    html: renderToStaticMarkup(<Marker />),
  });
};

export default CustomMarker;
