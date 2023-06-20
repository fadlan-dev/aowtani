import NearbyAttractions from '@/components/NearbyAttractions';
import RecommendedPackagesSlide from '@/components/RecommendedPackagesSlide';
import PopularProductsSlide from '@/components/PopularProductsSlide';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

const page = ({ params }: Props) => {
  return (
    <div className='mt-20 mb-24'>
      <div className='container'>
        <div className='h-96'>
          <img
            className='w-full h-full object-cover'
            src={
              'https://images.unsplash.com/photo-1641585038272-6e96aa60181f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2233&q=80'
            }
          />
        </div>
        <div className='flex gap-4 mt-4'>
          <div className='flex-1'>
            <h1>แหลมชาตี</h1>
            <p className='text-primary'>
              ปน.2062 ตำบล แหลมโพธิ์ อำเภอ ยะหริ่ง ปัตตานี 94150
            </p>
            <div className='flex gap-2'>
              <Link className='text-primary' href={'#ทะเล'}>
                #ทะเล
              </Link>
              <Link className='text-primary' href={'#ชายหาด'}>
                #ชายหาด
              </Link>
            </div>
            <p className='mt-4'>
              คงจะมีไม่กี่คนที่เคยไปเที่ยว ปัตตานี หนึ่งในจังหวัดของ ภาคใต้
              วันนี้เราเลยจะพาทุกคนไปดูหนึ่งที่เที่ยวสวยๆ อันซีนของจังหวัดนี้กัน
              เพื่อเป็นการเรียกน้ำย่อยค่ะ นั่นก็คือ แหลมตาชี
              แหลมที่ไม่เคยเหมือนเดิมเลยในทุกๆ ปี แต่จะไม่เหมือนยังไงนั้น
              ลองตามมาดูกันเลยค่า แหลมตาชี หรืออีกชื่อเรียกคือ แหลมโพธิ์
              ตั้งอยู่ที่ ตำบลตะโละกาโปร์ ยาวไปจนถึง ตำบลแหลมโพธิ์ ใน
              อำเภอยะหริ่ง จังหวัดปัตตานี ค่ะ
              ที่นี่จะเป็นบริเวณของสันทรายที่ยื่นออกไปในทะเล ในลักษณะแบบจะงอย
              ทำให้เกิดเป็นอ่าวปัตตานีด้านในของแหลม มีความยาวประมาณ 16 กิโลเมตร
              แต่ปกติแล้วปลายแหลมจะงอกเพิ่มขึ้นทุกปีๆ ปีละประมาณ 20-40 เมตรค่ะ
              และชายฝั่งก็จะมีการเปลี่ยนแปลงอยู่เสมอๆ
              จากคลื่นลมและกระแสน้ำนั่นเอง หาดทรายของที่ แหลมตาชี
              ตลอดแนวจนถึงปลายแหลมนั้น จะมีวิวทิวทัศน์ที่สวยงาม
              ส่วนด้านในที่ติดกับอ่าวนั้น จะเป็นที่ตั้งของชุมชนมากมาย ทั้ง
              บ้านดาโต๊ะ บ้านตะโละสะมิแล บ้านบูดี
              ซึ่งชาวบ้านส่วนใหญ่ก็จะทำอาชีพประมงเป็นหลัก
              และมีการเพาะเลี้ยงสัตว์น้ำอีกด้วย ไม่ว่าจะเป็น ปลาดุก ปลากะพง
              หอยแครง หอยแมลงภู่ เป็นต้น
            </p>
            <div className='aspect-video bg-zinc-200 mt-4' />
            <p className='mt-4'>
              ตำบลบางปู เล่ากันว่าหมู่บ้านแห่งนี้เดิมๆอยู่ริมทะเล
              (อ่าว)ในทะเลมีปลาชุกชุมชาวบ้านประกอบอาชีพประมงน้ำตื้น
              ทุกครอบครัวจะมีเรือและเครื่องมือจับปลาลักษณะเดี๋ยวนี้ก็ยังมีอยู่
              และบางปูได้เปลี่ยนแปลงฐานะจากสุขาภิบาลเป็นเทศบาล
              เทศบาลตำบลบางปูตั้งขึ้นตาม พระราชกฤษฎีกาจัดตั้งเทศบาล เมื่อวันที่
              ๒๕ พฤษภาคม๒๕๔๒ ประกาศในราชกิจจานุเบกษา เล่มที่๑๑๖ ตอนที่ ๙ ก.
              ลงวันที่ ๒๔ กุมภาพันธ์ ๒๕๔๒ ซึ่งตั้งอยู่ในตำบลบางปู อำเภอยะหริ่ง
              จังหวัดปัตตานี มีพื้นที่ประมาณ ๔.๙๐ ตารางกิโลเมตร
              <ul className='list-disc pl-6 mt-4'>
                <li>โทร 0823444555</li>
                <li>Facebook : Travel Local</li>
                <li>Line : @travellocal</li>
              </ul>
            </p>
            <NearbyAttractions className='mt-4' />
          </div>
          <div className='w-80 flex flex-col gap-4'>
            <div className='bg-zinc-200 aspect-square grid place-content-center'>
              Map
            </div>
            <RecommendedPackagesSlide />
            <PopularProductsSlide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
