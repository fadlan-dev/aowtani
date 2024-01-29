import { FunctionComponent } from "react";

import { Modal, Button, Image } from "@mantine/core";
import { Item } from "react-use-cart";
import { DeleteIcon } from "./Icons";
import { useCart } from "react-use-cart";

interface CartProps {
  opened: boolean;
  close: () => void;
}

const Cart: FunctionComponent<CartProps> = ({ opened, close }) => {
  const { items, isEmpty, updateItemQuantity, cartTotal } = useCart();

  return (
    <Modal opened={opened} onClose={close} title="ตะกร้าสินค้า">
      {isEmpty && <div className="text-center">ไม่มีสินค้าในตะกร้า</div>}
      <ul className="space-y-4">
        {items.map((item: Item) => (
          <li className="flex justify-between" key={item.id}>
            <div className="flex items-center gap-3">
              <Image
                radius="md"
                width={50}
                height={50}
                src={`${process.env.NEXT_IMAGE_HOST}${item.image.asset}`}
                fit="cover"
              />
              <div>
                <div>{item.name}</div>
                <div className="font-bold">฿{item.price}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  item.quantity &&
                  updateItemQuantity(item.id, item.quantity + 1)
                }
                className="bg-[#4F78E6] border-none rounded-md text-white pb-1 w-[25px] h-[25px]"
              >
                +
              </button>
              <div className="font-bold">{item.quantity}</div>
              <button
                onClick={() =>
                  item.quantity &&
                  updateItemQuantity(item.id, item.quantity - 1)
                }
                className="bg-red-500 border-none rounded-md text-white pb-1 w-[25px] h-[25px]"
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center font-bold pt-24">
        <div>ราคารวม</div>
        <div>฿{cartTotal} บาท</div>
      </div>
      <Button variant="gradient" fullWidth>
        ไปที่หน้าชำระเงิน
      </Button>
    </Modal>
  );
};

export default Cart;
