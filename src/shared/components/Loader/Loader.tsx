import clsx from 'clsx';

type LoaderProps = {
  text: string;
  className?: string;
};

export function Loader({ text, className }: LoaderProps) {
  return (
    <div className="flex">
      {[...text].map((char, idx) => (
        <span
          key={`${char}_${idx}`}
          className={clsx('animate-bounce text-7xl font-bold', className)}
          style={{
            animationDelay: `${idx * 0.1}s`,
            animationFillMode: 'both',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
