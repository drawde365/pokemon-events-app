import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";
import { slice } from "eslint-config-next";

interface Props {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
}

export default function EventCard({
  slug,
  image,
  title,
  location,
  date,
  time,
}: Props) {
  return (
    <Link href={`/events/${slug}`} id={"event-card"}>
      <Image
        src={image}
        alt={"Event's Image"}
        width={410}
        height={300}
        className={"poster"}
      />
      <div className={"flex flex-row gap-2"}>
        <Image src={"/icons/pin.svg"} alt={"pin icon"} width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className={"title"}>{title}</p>
      <div className={"datetime"}>
        <div>
          <Image
            src={"/icons/calendar.svg"}
            alt={"calendar icon"}
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div>
          <Image
            src={"/icons/clock.svg"}
            alt={"clock icon"}
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}
