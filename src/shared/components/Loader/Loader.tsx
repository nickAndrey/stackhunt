type LoaderProps = {
  text: string;
};

function Loader({ text }: LoaderProps) {
  //•••
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white">
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

export default Loader;
