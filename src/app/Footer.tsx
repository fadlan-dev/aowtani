'use client';
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  rem,
  Button,
} from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const Index = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div className='text-center'>
          <Image
            height={32}
            width={98}
            src='/logo.svg'
            alt='aowtani'
            className='h-5 w-auto'
          />
          <div id='google_translate_element' />
        </div>

        <Group spacing={0} className={classes.inner} position='right'>
          <Group spacing='sm'>
            <Link target='_blank' href='https://partners.admin.aowtani.com'>
              <Button variant='subtle'>สมัครเป็นผู้ประกอบการ</Button>
            </Link>
            <Link
              target='_blank'
              href='https://localguide.admin.aowtani.com/login'
            >
              <Button variant='subtle'>สมัครเป็นไกด์ท้องถิ่น</Button>
            </Link>
          </Group>
          <Group noWrap>
            <Group spacing={0} noWrap>
              <ActionIcon size='lg'>
                <IconBrandTwitter size='1.05rem' stroke={1.5} />
              </ActionIcon>
              <ActionIcon size='lg'>
                <IconBrandYoutube size='1.05rem' stroke={1.5} />
              </ActionIcon>
              <ActionIcon size='lg'>
                <IconBrandInstagram size='1.05rem' stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </Container>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: '#fff',
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    backgroundColor: 'white',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));
export default Index;
