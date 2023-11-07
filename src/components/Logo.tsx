import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
      className="text-2xl text-transparent font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text"
    >
      RemindMe
    </Link>
  );
}

export default Logo;
