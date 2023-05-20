'use client';
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        theme={{
          fontFamily: '__Anuphan_cac2bf',
          colors: {
            brand: [
              // '#e6f7ff',
              // '#bae7ff',
              // '#91d5ff',
              // '#69c0ff',
              // '#40a9ff',
              // '#1890ff',
              // '#096dd9',
              // '#0050b3',
              // '#003a8c',
              // '#002766',
              '#e6fffb',
              '#b5f5ec',
              '#87e8de',
              '#5cdbd3',
              '#36cfc9',
              '#13c2c2',
              '#08979c',
              '#006d75',
              '#00474f',
              '#002329',
            ],
          },
          primaryColor: 'brand',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
