export default function PageHeader({
  title,
  highlight,
  subtitle,
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-violet-50/80 to-white">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-fuchsia-500 to-red-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h1>
        <span className="mx-auto mt-4 block h-[3px] w-16 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
