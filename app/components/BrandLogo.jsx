import Link from "next/link";
import Image from "next/image";

export default function BrandLogo({ size = 50 }) {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/logo.png"
          alt="Veltrix Logo"
          width={size}
          height={size}
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-[#b44cff] via-[#7127e2] to-[#34ace4] bg-clip-text text-transparent tracking-wide">
          Veltrix
        </span>
      </div>
    </Link>
  );
}
