type PreviewImageProps = {
  imgUrl?: string;
  maxWidth?: number;
};

export function PreviewImage({ imgUrl, maxWidth }: PreviewImageProps) {
  if (!imgUrl) return null;

  return (
    <div className={`w-[${maxWidth || 100}px] h-auto overflow-hidden rounded-xl m-auto mb-5`}>
      <img src={imgUrl} title="image preview" className="w-full h-full object-cover" />
    </div>
  );
}
