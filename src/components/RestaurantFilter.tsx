'use client';
import { FunctionComponent, useCallback } from 'react';
import { Select } from '@mantine/core';

interface RestaurantFilterProps {
    value: string;
    setValue: (e: any) => void
}

const RestaurantFilter: FunctionComponent<RestaurantFilterProps> = ({value,setValue}) => {
    return  <Select
    w='200px'
    data={['ทั้งหมด','ร้านอาหารมาตรฐาน', 'ร้านอาหารตามสั่งทั่วไป', 'ร้านอาหารแนวบ้านๆ', 'ร้านคาเฟ่','ร้านขนมหวาน']}
    defaultValue="ทั้งหมด"
    value={value}
    onChange={setValue}
  />
}

export default RestaurantFilter