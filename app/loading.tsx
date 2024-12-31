import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image src="/loader.gif" width={150} height={150} alt="Loading..." />
    </div>
  );
}
