import type { Metadata } from "next";
import { HomeSections } from "./HomeSections";

export const metadata: Metadata = {
  title: {
    absolute: "Scale Limited | Staff Augmentation, BPO & Technology Services",
  },
  description:
    "Scale Limited provides dedicated offshore teams, business process outsourcing and custom software for businesses in Canada, the USA and Australia.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeSections />;
}
