'use client';
import EntrepreneursList from '@/components/EntrepreneursList';
import { Spoiler } from '@mantine/core';

type Props = {
  params: { id: string };
};

const page = ({ params }: Props) => {
  const { id } = params;
  return (
    <div className='mt-[60px] mb-24'>
      <div className='container'>
        <div className='h-96'>
          <img
            className='w-full h-full object-cover'
            src={
              'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80'
            }
          />
        </div>
        <div className='flex gap-4 mt-4'>
          <div className=' flex-1'>
            <h1>Title</h1>
            <p className='text-primary'>
              Sit incididunt eu do laboris cupidatat quis voluptate ad esse eu
              deserunt est.
            </p>
            <Spoiler maxHeight={120} showLabel='อ่านต่อ' hideLabel='Hide'>
              <p className='mt-4'>
                Sint duis sit officia irure voluptate ipsum. Dolor id sit
                officia duis nulla esse officia officia consectetur laboris
                occaecat officia. Commodo aute dolor cillum eiusmod minim
                cupidatat minim ea. Pariatur ullamco deserunt commodo aliqua.
                Pariatur duis mollit incididunt commodo. Laboris duis dolore
                ullamco tempor labore non in. Duis laborum esse sit consectetur.
                Nulla voluptate nulla sunt deserunt id sint quis nostrud irure
                adipisicing commodo irure irure. Enim sunt laboris exercitation
                deserunt ad laborum consectetur amet labore dolore deserunt
                nulla ad. Ex ad veniam duis eu et minim eu. Minim nisi tempor ex
                consectetur dolore non aute incididunt irure. Magna anim nostrud
                ut aute excepteur excepteur fugiat Lorem mollit amet laboris
                ipsum eiusmod deserunt. Deserunt Lorem velit laboris ullamco
                enim eiusmod adipisicing ipsum ullamco sint sunt velit laborum
                est. Culpa anim anim nisi ullamco dolore est velit anim et anim
                commodo Lorem. Excepteur ullamco mollit fugiat eu sunt. Ex
                incididunt aliqua sint aute ad ex aute labore. Aliquip eiusmod
                dolor aliquip ipsum sit cillum officia deserunt enim. Quis non
                elit elit in proident. Commodo incididunt laboris excepteur ex
                aute deserunt. Laboris non dolor eu est incididunt deserunt esse
                sit voluptate. Aute do nostrud amet commodo fugiat.
              </p>
            </Spoiler>
          </div>
          <div className='w-80 flex flex-col gap-4'>
            <p>สังกัดหน่วยงาน</p>
            <div className=' aspect-square bg-zinc-200'></div>
          </div>
        </div>
        <EntrepreneursList title='ผู้ประกอบการ' className='mt-6' showMore />
      </div>
    </div>
  );
};

export default page;
