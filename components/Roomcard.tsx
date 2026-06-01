import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function RoomCard({ title, description, href }: Props) {
  return (
    <Link
      href={href}
      className="block border border-[#4c3b28] bg-[rgba(34,27,21,0.35)] backdrop-blur-sm p-8 hover:border-[#b38b59] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(179,139,89,0.15)] transition-all duration-300"
    >
      <h2 className="text-3xl mb-3">{title}</h2>

      <p className="text-[#9b927f]">{description}</p>
    </Link>
  );
}
