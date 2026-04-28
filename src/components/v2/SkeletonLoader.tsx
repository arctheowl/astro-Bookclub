import { useState, useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const SkeletonLoader = ({ src, alt, className = "" }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    img.src = src;
  }, [src]);

  if (hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ backgroundColor: "oklch(89% 0.038 62)" }}
      >
        <span
          className="font-sans text-xs"
          style={{ color: "oklch(48% 0.02 50)" }}
        >
          No image
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`${className} relative overflow-hidden`}
        style={{ backgroundColor: "oklch(89% 0.038 62)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(94% 0.011 58 / 0.8) 50%, transparent 100%)",
            }}
          />
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
};

export default SkeletonLoader;
