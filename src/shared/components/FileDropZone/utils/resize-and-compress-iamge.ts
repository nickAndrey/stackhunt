type Params = {
  file: File;
  maxWidth: number;
  /**
   * between 0 and 1
   */
  quality: number;
};

export async function resizeAndCompressImage({ file, maxWidth, quality }: Params): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        const scale = maxWidth / img.width;
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export as compressed JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Compression failed');
            const compressedFile = new File([blob], file.name, { type: blob.type });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality // between 0 and 1
        );
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
