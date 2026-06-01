import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function RoomCard({
  title,
  description,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="block border border-[#3a3025] p-8 hover:border-[#b38b59] transition"
    >
      <h2 className="text-3xl mb-3">
        {title}
      </h2>

      <p className="text-[#9b927f]">
        {description}
      </p>
    </Link>
  );
}