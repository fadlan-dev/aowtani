"use client";
import { IProduct } from "@/types";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  useMantineTheme,
  Text,
  Modal,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/navigation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from '@mantine/notifications';

import { useCart } from "react-use-cart";
import { IconCheck } from "@tabler/icons-react";

interface ProductHeroProps {
  product: IProduct;
  className?: string;
}

const ProductHero: FunctionComponent<ProductHeroProps> = ({ product }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const matches = useMediaQuery("(max-width: 768px)");
  const { addItem, setCartMetadata, metadata, emptyCart } = useCart();
  const [quantity, setQuantity] = useState<number | any>(1);
  const [opened, { open, close }] = useDisclosure(false);

  const addToCart = () => {

    let item = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
    };

    if (metadata?.shop) {
      if (metadata?.shop.id === product.shop.id) {
        addItem(item, quantity);
        notifications.show({
          title: 'อัปเดทสินค้าในรถเข็นเรียบร้อย',
          message: false,
          color:'green',
          icon: <IconCheck/>
        })
      } else {
        open();
      }
    } else {
      notifications.show({
        title: 'เพิ่มสินค้าใหม่ไปยังรถเข็นเรียบร้อย',
        message: false,
        color:'green',
        icon: <IconCheck/>
      })
      setCartMetadata({ shop: product.shop });
      addItem(item, quantity);
    }
  };

  const changeShop = () => {
        let item = {
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.images[0],
        };
        emptyCart();
        setCartMetadata({ shop: product.shop });
        addItem(item, quantity);
        close()
        notifications.show({
          title: 'เพิ่มสินค้าใหม่ไปยังรถเข็นเรียบร้อย',
          message: false,
          color:'green',
          icon: <IconCheck/>
        })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 overflow-hidden relative">
      <div className="relative lg:w-1/2 w-full h-96 ">
        <Carousel
          w="100%"
          h="100%"
          withIndicators
          styles={{
            indicator: {
              "&[data-active]": {
                backgroundColor: theme.colors.brand[6],
              },
            },
          }}
        >
          {product.images.map((img, idx: number) => (
            <Carousel.Slide h="384px" key={idx}>
              <Image
                className="object-contain"
                src={`${process.env.NEXT_IMAGE_HOST}${img.asset}`}
                alt={product.name}
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <Flex direction="column" gap="md" className="flex-1">
        <Flex direction="column">
          <h1>{product.name}</h1>
          <h4 className="m-0">{product.sku}</h4>
        </Flex>
        <Group p="sm" bg="brand.0" align="baseline">
          <Text className="font-bold text-2xl text-primary">
            ฿{product.price}
          </Text>
          {product.price_before_discount && <Text c="dimmed" td="line-through">
            ฿{product.price_before_discount}
          </Text>}
        </Group>
        <Group>
          จำนวน
          <NumberInput
            value={quantity}
            min={1}
            max={product.stock}
            placeholder="ระบุจำนวน"
            onChange={setQuantity}
          />
          มีสินค้าทั้งหมด {product.stock} ชิ้น
        </Group>
        <Group>
          <Button
            fullWidth={matches}
            size="md"
            variant="outline"
            onClick={addToCart}
          >
            เพิ่มไปยังรถเข็น
          </Button>
          <Button
            fullWidth={matches}
            size="md"
            variant="gradient"
            onClick={() => {
              addToCart()
              router.push(`product/checkout`)
            }}
          >
            ซื้อสินค้า
          </Button>
        </Group>
      </Flex>
      <Modal size="xs" opened={opened} onClose={close} title={<b>คุณต้องการเปลี่ยนร้านหรอ?</b>} centered>
      <Text size="sm">
        เราจัดให้ได้ทันทีเลย แต่ต้องลบรายการอาหารที่คุณสั่งไว้ตอนนี้ก่อนน่ะ
      </Text>
      <Flex mt="xl" direction="column" gap={6}>
          <Button variant="gradient" onClick={changeShop}>ตกลง</Button>
          <Button variant="default" onClick={close}>ยกเลิก</Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default ProductHero;
