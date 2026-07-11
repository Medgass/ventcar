export default function Logo({
  className = "h-11 w-14",
  src = "/images/logo.png",
}: {
  className?: string;
  src?: string;
}) {
  return (
    <img
      src={src}
      alt="Logo"
      className={`${className} select-none object-contain [mask-image:radial-gradient(closest-side,black_78%,transparent_100%)]`}
    />
  );
}
