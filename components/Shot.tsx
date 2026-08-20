import Image from "next/image";

type ShotProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  ratio?: "wide" | "photo";
};

export function Shot({ src, alt, priority, className = "", ratio = "wide" }: ShotProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-50 shadow-device ${
        ratio === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export function PhoneShot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="w-full">
      <Shot src={src} alt={alt} ratio="photo" />
      {caption && <figcaption className="mt-3 text-center text-xs text-navy-700">{caption}</figcaption>}
    </figure>
  );
}
