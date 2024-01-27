import { Map } from "@/components/ui/map";

type Props = {};

export const metadata = {
  title: "Aow Tani",
};

export default function map({}: Props) {
  return (
    <div className="pt-20">
      <Map />
    </div>
  );
}
