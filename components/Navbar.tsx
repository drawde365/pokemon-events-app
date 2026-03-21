import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href={"/"} className={"logo"}>
          <Image
            src={"/icons/logo.png"}
            alt={"logo"}
            width={"24"}
            height={"24"}
          ></Image>
          <p>PokemonEvents</p>
        </Link>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Events</Link>
          </li>
          <li>
            <Link href={"/"}>Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
