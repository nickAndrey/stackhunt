type LoaderProps = {
  text: string;
};

export function Loader({ text }: LoaderProps) {
  return (
    <div className="flex">
      {[...text].map((char, idx) => (
        <span
          key={`${char}_${idx}`}
          className="animate-bounce text-7xl font-bold text-gray-800"
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
