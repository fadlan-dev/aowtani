import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';

interface DestinationMapProps {}

const DestinationMap: FunctionComponent<DestinationMapProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRoute = (organization_id: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('organization_id', `${organization_id}`);
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <section className=' max-w-full'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='140'
        viewBox='0 0 217 140'
      >
        <g
          id='Custom_Size_1'
          data-name='Custom Size – 1'
          clip-path='url(#clip-Custom_Size_1)'
        >
          {/* <rect width='217' height='140' fill='#fff' /> */}
          <g id='map-01' transform='translate(-19.505 -0.17)'>
            <path
              id='Path_1'
              data-name='Path 1'
              d='M-.033.17-.16,72.734s46.626-4.909,72.535,23.354,51.818,8.948,51.818,8.948,25.9-12.718,28.259-30.614c0,0,94.542,25.86,119.978,19.263L272.357.175Z'
              fill='#4fa5d3'
            />
            <path
              id='Path_2'
              data-name='Path 2'
              d='M-.16,143.813c10.329-1.688,25.544-2.511,41.483,3.936,13.837,5.6,18.489,12.748,32.395,19.949,9.794,5.065,24.872,10.51,46.631,10.3,21.671-10.792,33.192-31.421,33.192-31.421s56.8,14.879,118.816,18.805l.073,47.925H-.033Z'
              transform='translate(0 -73.137)'
              fill='#1c416f'
            />
            <path
              id='Path_3'
              data-name='Path 3'
              d='M69.648,145.719s-1.679-.083.336,2.267c0,0-1.43.253,2.262,2.515s5.795,4.724,5.795,7.473a33.017,33.017,0,0,1-.671,7.469,27.169,27.169,0,0,0-.589,4.783s1.007,1.09,4.613,1.007,2.6,3.1,2.6,3.1l-2.35,10.081s-1.343,1.09,4.2.589a87.315,87.315,0,0,1,13.847.418s5.707,2.6,5.873,8.14c0,0,.754,2.1,2.6-1.09s3.605-1.679,3.605-1.679-.487-4.2,2.773-3.946c0,0,0,2.014,2.515-.418l.754-1.426s2.919,1.255.336-1.177c0,0,.924-.671,3.274.253,0,0-2.433-3.863-2.185-6.967s-3.776-10.407-3.776-10.407-9.731,4.953-11.677-3.523c0,0,.754-4.379-.589-3.693,0,0,2.686-4.953-3.776-4.379,0,0-4.111,1.513-7.05-1.343,0,0-6.714-8.977-10.218-8.641a8.71,8.71,0,0,0-5.542.92C74.178,147.559,69.648,145.719,69.648,145.719Z'
              transform='translate(-35.506 -74.372)'
              fill='#e29573'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_4'
              data-name='Path 4'
              d='M176.095,175.991s-8.646,5.352-10.325,6.043l-1.26.584s3.776,8.228,3.776,10.407,1.343,7.133,2.185,6.967,1.173.336,2.433-1.679c0,0,1.426.336.589-2.35s1.343-2.185,1.343-2.185l3.858-.584s-.165-2.52,1.26-3.693,3.357-7.722,3.357-7.722S178.275,175.718,176.095,175.991Z'
              transform='translate(-84.55 -90.27)'
              fill='#6daaa2'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_5'
              data-name='Path 5'
              d='M199.3,188.449s.487,1.591,3.44,1.426,5.625,2.433,5.289,4.783-2.515,8.811-.924,8.894c0,0-5.036,2.433-7.722.842a6.763,6.763,0,0,1-4.194-2.6c-1.844-2.35-.589-5.79-.589-5.79s1.26-1.007,2.768-4.617l1.177-3.523Z'
              transform='translate(-99.785 -96.369)'
              fill='#5f7d9e'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_6'
              data-name='Path 6'
              d='M222.336,187.924s4.2,1.6,5.96,4.53a7.658,7.658,0,0,0,4.535-.083,5.449,5.449,0,0,1,4.194.253l3.274-2.014s.487-2.433-1.26-2.686-1.946.487-1.946.487l-4.277,2.35-3.109-1.679a4.478,4.478,0,0,1,1.766-3.605s2.919-5.123,4.7-5.795c0,0,1.513-1.674,4.116-.248a24.172,24.172,0,0,1,4.53,3.27l2.014,2.773s.589,1.426,4.447.754L259,181.784s2.686-2.52,5.289-2.919,2.262,2.919,2.262,2.919l-3.941,7.3s-2.52,2.919-.423,4.282c0,0,.088.418-1.255,1.508a12.518,12.518,0,0,0-5.454,2.267c-2.1,1.781-5.625,4.865-7.3,5.454,0,0-4.866,2.35-7.05,2.6s-7.3,1.173-10.072.837-8.223-.671-8.223-.671-.487-4.7-1.6-4.379c0,0-1.591-1.43-.336-5.625A34.929,34.929,0,0,0,222.336,187.924Z'
              transform='translate(-113.256 -91.734)'
              fill='#3ca1c4'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_7'
              data-name='Path 7'
              d='M264.157,171.663l-1.557,2.579a31.14,31.14,0,0,1,5.1,4.5s2.16,3.056,3.537,3a5.225,5.225,0,0,0,3.406-1.557c.345-.584,3.479-2.224,3.479-2.224l3.717-1.975s1.319-1.323-2.039-.6c0,0-3.075,1.333-4.408,1.143a.818.818,0,0,1-.453-.18,13.987,13.987,0,0,0-3.839-2.822,11.269,11.269,0,0,0-5.274-.973S264.819,171.307,264.157,171.663Z'
              transform='translate(-134.914 -88.02)'
              fill='#3ca1c4'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <path
              id='Path_8'
              data-name='Path 8'
              d='M270.5,148.709a5.82,5.82,0,0,1-5.157,2.827h-.487a8.369,8.369,0,0,0,.243,4.379,3.119,3.119,0,0,0,.9,2.875c1.319,1.323,2.039,1.382,2.039,1.382s5.756.487,7.439,3.406c0,0,1.435,1.2,4.257-.9a50.6,50.6,0,0,0,6.958-1.022s3.892,2.1,3.839.842a3.638,3.638,0,0,0-3.177-3.406,23.03,23.03,0,0,1-4.5-.418,6.55,6.55,0,0,1-2.7-4.681s-1.2-1.98-2.817-2.039c0,0-1.562-2.817-3.3-3.537A4.476,4.476,0,0,0,270.5,148.709Z'
              transform='translate(-135.979 -75.985)'
              fill='#3ca1c4'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_9'
              data-name='Path 9'
              d='M291.822,149.568a3.232,3.232,0,0,0,.842,3.056c1.328,1.08,5.041,1.022,5.041,1.022s5.7,3.177,5.4,6.179a10.909,10.909,0,0,1-2.8,5.576s-3.659,3.781-3.659,7.5c0,0,3.537,3.479,6.958,4.019s4.437-1.737,4.437-1.737.973-4.442-.418-5.162c0,0,1.859-5.274,6.958-4.437a17.288,17.288,0,0,1,9.176,4.257,9.3,9.3,0,0,0,8.816,2.282l6.826,5.284s-.973,10.918,6.656,1.859c0,0,1.742-.778,5.839,4.2s6.656,2.52,6.656,2.52l1.98-2.282a8.869,8.869,0,0,0,2.34,1.46c1.08.36,3.119-.9,3.119-.9a8.141,8.141,0,0,1,6.238,2.759s2.642.243.487-3.956c0,0-.842-.36,1.737-1.562s2.88-2.637,2.88-2.637a10.614,10.614,0,0,0-1.022-5.4c-1.382-3.24,1.742-12.894,1.742-12.894l-3.717-1.5a4.7,4.7,0,0,1-4.559-.72,6.327,6.327,0,0,0-5.041-1.017s-1.26,1.679-4.141.36-7.3-.487-7.3-.487-37.605-8.758-40.967-8.4L285.93,140.83l-1.46,1.859,1.98,2.16S290.265,146.625,291.822,149.568Z'
              transform='translate(-146.143 -72.222)'
              fill='#ebcb8e'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <path
              id='Path_10'
              data-name='Path 10'
              d='M150.261,85.131s7.858,6.6,10.018,6.359,6.539,2.282,6.539,2.282l-1.46,1.859a37.051,37.051,0,0,0-6.418,2.433c-2.52,1.382-6.481,1.2-6.481,1.2s-2.039-.54-1.319-4.617c0,0,1.922-4.982-.54-6.9s-5.863-.861-5.863-.861l-3.717,1.377s-1.562.9-2.1-2.515l-1.192-7.916a6.609,6.609,0,0,0-8.159-4.977l-3.717,3.06s-2.52,3.406-4.262,0-3.177-4.437-7.254-4.437c0,0-2.642,2.155-3.362-2.7s-6.958-6.058-6.958-6.058a12.066,12.066,0,0,0-5.459-.18c-2.462.662-1.8-3.406-1.8-3.406a12.542,12.542,0,0,1,1.377-5.041s-3.406-2.4-6.359-.058a13.439,13.439,0,0,0-4.019,5.352s-.657,1.62-2.759-1.2a4.451,4.451,0,0,0-4.866.54s-1.46-2.1-4.2,1.319c0,0-5.459.3-6.6,2.88,0,0-4.141-2.764-9.541,2.7,0,0-1.017,1.46-2.817-.18,0,0-1.62-1.08-4.2,2.4,0,0-1.08-3.776,1.679-5.936s12.115-6.3,12.115-6.3a41.07,41.07,0,0,1,6.3-.9,4.7,4.7,0,0,1,3.78-.842s3.236-.18,4.8-1.62a11.677,11.677,0,0,1,4.019-2.16s5.517-1.859,10.218-.058a33.285,33.285,0,0,1,11.517,4.681s14.11,5.4,19.014,9.9c0,0,9.244,6.116,10.977,8.938Z'
              transform='translate(-27.075 -25.198)'
              fill='#577a41'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='0.5'
            />
            <rect
              id='Rectangle_1'
              data-name='Rectangle 1'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(21.959 14.932)'
              className=' z-50'
            />
            <g
              id='Group_1'
              data-name='Group 1'
              transform='translate(21.959 14.932)'
              clip-path='url(#clip-path)'
              onClick={() => handleRoute(3)}
            >
              <image
                id='Rectangle_2'
                data-name='Rectangle 2'
                width='24.989'
                height='16.971'
                transform='translate(-3.479 -0.535)'
              />
            </g>
            <rect
              id='Rectangle_4'
              data-name='Rectangle 4'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(21.959 14.932)'
              fill='none'
              stroke='#577a41'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_5'
              data-name='Rectangle 5'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(76.024 9.57)'
            />
            <g
              id='Group_2'
              data-name='Group 2'
              transform='translate(76.024 9.57)'
              clip-path='url(#clip-path)'
              onClick={() => handleRoute(3)}
            >
              <image
                id='Rectangle_6'
                data-name='Rectangle 6'
                width='27.587'
                height='15.545'
                transform='translate(-7.473 0.005)'
              />
            </g>
            <rect
              id='Rectangle_8'
              data-name='Rectangle 8'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(76.024 9.57)'
              fill='none'
              stroke='#577a41'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_9'
              data-name='Rectangle 9'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(101.237 24.172)'
            />
            <g
              id='Group_3'
              data-name='Group 3'
              transform='translate(101.237 24.172)'
              clip-path='url(#clip-path)'
              onClick={() => handleRoute(3)}
            >
              <image
                id='Rectangle_10'
                data-name='Rectangle 10'
                width='23.354'
                height='17.516'
                transform='translate(-1.392 -0.671)'
              />
            </g>
            <rect
              id='Rectangle_12'
              data-name='Rectangle 12'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(101.237 24.172)'
              fill='none'
              stroke='#577a41'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_1'
              data-name='Ellipse 1'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(29.787 33.586)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_2'
              data-name='Ellipse 2'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(79.921 28.784)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_3'
              data-name='Ellipse 3'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(91.71 47.108)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_4'
              data-name='Ellipse 4'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(138.998 67.46)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_13'
              data-name='Rectangle 13'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(131.987 49.321)'
            />
            <g
              id='Group_4'
              data-name='Group 4'
              transform='translate(131.987 49.321)'
              clip-path='url(#clip-path-4)'
            >
              <image
                id='Rectangle_14'
                data-name='Rectangle 14'
                width='22.138'
                height='14.952'
                transform='translate(-1.129 -0.161)'
              />
            </g>
            <rect
              id='Rectangle_16'
              data-name='Rectangle 16'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(131.987 49.321)'
              fill='none'
              stroke='#ebcb8e'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='แหลมตาชี'
              transform='translate(24.198 12.726)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                แหลมตาชี
              </tspan>
            </text>
            <text
              id='หาดตะโละมีแล'
              transform='translate(75.811 7.989)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                หาดตะโละมีแล
              </tspan>
            </text>
            <text
              id='มัสยิดดาโต๊ะ'
              transform='translate(102.024 21.719)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                มัสยิดดาโต๊ะ
              </tspan>
            </text>
            <text
              id='ถิ่นเรือกอและ'
              transform='translate(132.471 47.407)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                ถิ่นเรือกอและ
              </tspan>
            </text>
            <circle
              id='Ellipse_5'
              data-name='Ellipse 5'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(167.831 75.76)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_17'
              data-name='Rectangle 17'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(160.815 57.617)'
            />
            <g
              id='Group_5'
              data-name='Group 5'
              transform='translate(160.815 57.617)'
              clip-path='url(#clip-path-4)'
            >
              <image
                id='Rectangle_18'
                data-name='Rectangle 18'
                width='23.354'
                height='17.516'
                transform='translate(0.058 -2.228)'
              />
            </g>
            <rect
              id='Rectangle_20'
              data-name='Rectangle 20'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(160.815 57.617)'
              fill='none'
              stroke='#ebcb8e'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='หาดตะโละกาโปร์'
              transform='translate(158.331 55.148)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                หาดตะโละกาโปร์
              </tspan>
            </text>
            <circle
              id='Ellipse_6'
              data-name='Ellipse 6'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(182.077 98.935)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_21'
              data-name='Rectangle 21'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(171.534 102.847)'
            />
            <g
              id='Group_6'
              data-name='Group 6'
              transform='translate(171.534 102.847)'
              clip-path='url(#clip-path-4)'
            >
              <image
                id='Rectangle_22'
                data-name='Rectangle 22'
                width='21.559'
                height='16.173'
                transform='translate(-1.985 -0.477)'
              />
            </g>
            <rect
              id='Rectangle_24'
              data-name='Rectangle 24'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(171.534 102.847)'
              fill='none'
              stroke='#ebcb8e'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='บูนาดารา'
              transform='translate(173.821 122.89)'
              fill='#fff'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                บูนาดารา
              </tspan>
            </text>
            <circle
              id='Ellipse_7'
              data-name='Ellipse 7'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(136.702 107.858)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_25'
              data-name='Rectangle 25'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(138.502 110.719)'
            />
            <g
              id='Group_7'
              data-name='Group 7'
              transform='translate(138.502 110.719)'
              clip-path='url(#clip-path-7)'
            >
              <image
                id='Rectangle_26'
                data-name='Rectangle 26'
                width='20.708'
                height='13.779'
                transform='translate(-4.291 0.898)'
              />
            </g>
            <rect
              id='Rectangle_28'
              data-name='Rectangle 28'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(138.502 110.719)'
              fill='none'
              stroke='#3ca1c4'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='ชุมชนท่องเที่ยวบางปู'
              transform='translate(133.789 130.208)'
              fill='#fff'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                ชุมชนท่องเที่ยวบางปู
              </tspan>
            </text>
            <circle
              id='Ellipse_8'
              data-name='Ellipse 8'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(98.97 105.571)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_9'
              data-name='Ellipse 9'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(77.318 98.565)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_10'
              data-name='Ellipse 10'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(71.572 92.605)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_11'
              data-name='Ellipse 11'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(66.001 80.096)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_29'
              data-name='Rectangle 29'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(89.803 111.045)'
            />
            <g
              id='Group_8'
              data-name='Group 8'
              transform='translate(89.803 111.045)'
              clip-path='url(#clip-path-7)'
            >
              <image
                id='Rectangle_30'
                data-name='Rectangle 30'
                width='26.274'
                height='17.487'
                transform='translate(-6.393 -0.263)'
              />
            </g>
            <rect
              id='Rectangle_32'
              data-name='Rectangle 32'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(89.803 111.045)'
              fill='none'
              stroke='#3ca1c4'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='บาราโหมบาซาร์'
              transform='translate(88.59 130.2)'
              fill='#fff'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                บาราโหมบาซาร์
              </tspan>
            </text>
            <rect
              id='Rectangle_33'
              data-name='Rectangle 33'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(49.702 114.081)'
            />
            <g
              id='Group_9'
              data-name='Group 9'
              transform='translate(49.702 114.081)'
              clip-path='url(#clip-path-9)'
              onClick={() => handleRoute(2)}
            >
              <image
                id='Rectangle_34'
                data-name='Rectangle 34'
                width='23.841'
                height='15.905'
                transform='translate(-3.635 0.199)'
              />
            </g>
            <rect
              id='Rectangle_36'
              data-name='Rectangle 36'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(49.702 114.081)'
              fill='none'
              stroke='#e29573'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='สะพานไม้บานา'
              transform='translate(48.989 134.2)'
              fill='#fff'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                สะพานไม้บานา
              </tspan>
            </text>
            <path
              id='Path_11'
              data-name='Path 11'
              d='M59.649,240.782v-.788H59.26a.594.594,0,0,0-.331.078.282.282,0,0,0-.117.248.263.263,0,0,0,.083.209.316.316,0,0,0,.214.068h.131l.122-.039.039.209-.151.034a.639.639,0,0,1-.165,0,.7.7,0,0,1-.209-.029.486.486,0,0,1-.165-.088.443.443,0,0,1-.107-.156.536.536,0,0,1,.136-.613.871.871,0,0,1,.55-.146h.38v-.039a.618.618,0,0,0,0-.165.287.287,0,0,0-.068-.131.3.3,0,0,0-.126-.083.486.486,0,0,0-.185-.029.93.93,0,0,0-.321.049,1.178,1.178,0,0,0-.248.122l-.078-.175a.442.442,0,0,1,.117-.078,1.153,1.153,0,0,1,.156-.068,1.447,1.447,0,0,0,.185-.044h.19a.8.8,0,0,1,.331.063l.122-.151h.287l-.229.277a.54.54,0,0,1,.107.185.773.773,0,0,1,.034.243v1.046Z'
              transform='translate(-30.149 -122.648)'
              fill='#fff'
            />
            <path
              id='Path_12'
              data-name='Path 12'
              d='M62.884,240.12a.389.389,0,0,0,.311-.112.423.423,0,0,0,.1-.3V238.12h.253v1.586a.623.623,0,0,1-.17.487.686.686,0,0,1-.487.161.7.7,0,0,1-.487-.161.623.623,0,0,1-.165-.487V238.67h.248v1.036a.428.428,0,0,0,.1.3.389.389,0,0,0,.3.112Z'
              transform='translate(-32.036 -122.175)'
              fill='#fff'
            />
            <path
              id='Path_13'
              data-name='Path 13'
              d='M66.316,240.875V239.82c0-.263-.117-.394-.345-.394a.681.681,0,0,0-.263.049.974.974,0,0,0-.209.122l-.068-.19.107-.073.141-.063a.768.768,0,0,1,.151-.044.908.908,0,0,1,.165,0,.545.545,0,0,1,.428.161.662.662,0,0,1,.146.457v1.046Z'
              transform='translate(-33.677 -122.741)'
              fill='#fff'
            />
            <path
              id='Path_14'
              data-name='Path 14'
              d='M69.653,240.864v-1.031a.413.413,0,0,0-.107-.316.438.438,0,0,0-.311-.1.565.565,0,0,0-.292.073.341.341,0,0,0-.175.185l.219.2a.306.306,0,0,0-.117.1.3.3,0,0,0-.039.156v.73h-.248v-.7a.355.355,0,0,1,.039-.161.272.272,0,0,1,.117-.117l-.238-.2a.511.511,0,0,1,.088-.18.745.745,0,0,1,.165-.161.764.764,0,0,1,.219-.107.783.783,0,0,1,.263-.039.876.876,0,0,1,.292.044.642.642,0,0,1,.209.131.608.608,0,0,1,.127.2.715.715,0,0,1,.044.258v1.031Z'
              transform='translate(-35.253 -122.73)'
              fill='#fff'
            />
            <path
              id='Path_15'
              data-name='Path 15'
              d='M70.821,238.284a.287.287,0,0,1-.112,0,.209.209,0,0,1-.092-.063.243.243,0,0,1-.063-.092.3.3,0,0,1,0-.117.287.287,0,0,1,0-.112.243.243,0,0,1,.063-.092.258.258,0,0,1,.092-.063.268.268,0,0,1,.224,0,.258.258,0,0,1,.092.063.243.243,0,0,1,.063.092.287.287,0,0,1,0,.112.292.292,0,0,1,0,.117.243.243,0,0,1-.063.092.209.209,0,0,1-.092.063.287.287,0,0,1-.112,0Zm0-.165a.127.127,0,0,0,.092-.039.136.136,0,0,0,0-.18.122.122,0,0,0-.092-.034.117.117,0,0,0-.088.034.122.122,0,0,0-.034.092.117.117,0,0,0,.034.088A.122.122,0,0,0,70.821,238.119Z'
              transform='translate(-36.305 -121.97)'
              fill='#fff'
            />
            <path
              id='Path_16'
              data-name='Path 16'
              d='M72.76,240.883v-1.056q0-.394-.35-.394a.682.682,0,0,0-.263.049.91.91,0,0,0-.219.126l-.068-.19a.678.678,0,0,1,.107-.073.884.884,0,0,1,.136-.063.818.818,0,0,1,.156-.044h.161a.56.56,0,0,1,.433.161.686.686,0,0,1,.141.457V240.9Z'
              transform='translate(-36.979 -122.749)'
              fill='#fff'
            />
            <path
              id='Path_17'
              data-name='Path 17'
              d='M75.789,240.12a.389.389,0,0,0,.311-.112.428.428,0,0,0,.1-.3V238.12h.248v1.586a.608.608,0,0,1-.17.487.832.832,0,0,1-.973,0,.608.608,0,0,1-.17-.487V238.67h.248v1.036a.428.428,0,0,0,.1.3A.389.389,0,0,0,75.789,240.12Z'
              transform='translate(-38.659 -122.175)'
              fill='#fff'
            />
            <path
              id='Path_18'
              data-name='Path 18'
              d='M78.867,240.829l-.487-1.64h.258l.433,1.421H79.1a.379.379,0,0,0,.18-.044.413.413,0,0,0,.156-.122.705.705,0,0,0,.107-.2.92.92,0,0,0,.039-.272,1.153,1.153,0,0,0-.029-.277.627.627,0,0,0-.073-.18.287.287,0,0,0-.117-.1.268.268,0,0,0-.136-.034h-.1a.335.335,0,0,0-.083,0l-.039-.2a.273.273,0,0,1,.112-.034.53.53,0,0,1,.545.2.763.763,0,0,1,.122.253,1.241,1.241,0,0,1,.044.345,1.027,1.027,0,0,1-.054.355.9.9,0,0,1-.156.268.72.72,0,0,1-.234.17.749.749,0,0,1-.292.063Z'
              transform='translate(-40.326 -122.695)'
              fill='#fff'
            />
            <rect
              id='Rectangle_37'
              data-name='Rectangle 37'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(84.018 68.754)'
            />
            <g
              id='Group_10'
              data-name='Group 10'
              transform='translate(84.237 68.754)'
              clip-path='url(#clip-path-9)'
              onClick={() => handleRoute(2)}
            >
              <rect
                id='Rectangle_38'
                data-name='Rectangle 38'
                width='20.752'
                height='14.808'
                transform='translate(-2.589 0.383)'
                fill='url(#pattern)'
              />
            </g>
            <rect
              id='Rectangle_40'
              data-name='Rectangle 40'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(84.018 68.754)'
              fill='none'
              stroke='#e29573'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='มัสยิดกรือเซะ'
              transform='translate(84.237 65.049)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                มัสยิดกรือเซะ
              </tspan>
            </text>
            <rect
              id='Rectangle_41'
              data-name='Rectangle 41'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(64.05 62.75)'
            />
            <g
              id='Group_11'
              data-name='Group 11'
              transform='translate(64.05 62.75)'
              clip-path='url(#clip-path-9)'
              onClick={() => handleRoute(2)}
            >
              <image
                id='Rectangle_42'
                data-name='Rectangle 42'
                width='15.764'
                height='15.764'
                transform='translate(-0.127 -0.151)'
              />
            </g>
            <rect
              id='Rectangle_44'
              data-name='Rectangle 44'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(64.05 62.75)'
              fill='none'
              stroke='#e29573'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='ลานนกกระยาง'
              transform='translate(63.782 58.559)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                ลานนกกระยาง
              </tspan>
            </text>
            <circle
              id='Ellipse_12'
              data-name='Ellipse 12'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(51.692 73.016)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <circle
              id='Ellipse_13'
              data-name='Ellipse 13'
              cx='0.973'
              cy='0.973'
              r='0.973'
              transform='translate(57.049 82.611)'
              fill='#fff'
              stroke='#000'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_45'
              data-name='Rectangle 45'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(44.286 54.148)'
            />
            <g
              id='Group_12'
              data-name='Group 12'
              transform='translate(44.286 54.148)'
              clip-path='url(#clip-path-9)'
              onClick={() => handleRoute(2)}
            >
              <image
                id='Rectangle_46'
                data-name='Rectangle 46'
                width='23.841'
                height='15.789'
                transform='translate(-3.25 0.375)'
              />
            </g>
            <rect
              id='Rectangle_48'
              data-name='Rectangle 48'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(44.286 54.148)'
              fill='none'
              stroke='#e29573'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <rect
              id='Rectangle_49'
              data-name='Rectangle 49'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(27.111 98.969)'
            />
            <g
              id='Group_13'
              data-name='Group 13'
              transform='translate(27.111 98.969)'
              clip-path='url(#clip-path-9)'
              onClick={() => handleRoute(2)}
            >
              <image
                id='Rectangle_50'
                data-name='Rectangle 50'
                width='15.57'
                height='15.57'
                transform='translate(-0.073 0.258)'
              />
            </g>
            <rect
              id='Rectangle_52'
              data-name='Rectangle 52'
              width='15.574'
              height='15.574'
              rx='4.75'
              transform='translate(27.111 98.969)'
              fill='none'
              stroke='#e29573'
              stroke-miterlimit='10'
              stroke-width='1'
            />
            <text
              id='นาเกลือโบราณ'
              transform='translate(44.014 49.961)'
              font-size='3'
              font-family='SukhumvitSet-Medium, Sukhumvit Set'
              font-weight='500'
            >
              <tspan x='0' y='0'>
                นาเกลือโบราณ
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </section>
  );
};

export default DestinationMap;
