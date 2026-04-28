import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const SkeletonLoader = ({ src, alt, className = "" }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Browsers won't fire onLoad for already-cached images — catch that here
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={`${className} relative`}
      style={(!loaded && !hasError) ? { backgroundColor: "oklch(89% 0.038 62)" } : {}}
    >
      {/* Shimmer overlay — removed from DOM once image is ready */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(94% 0.011 58 / 0.8) 50%, transparent 100%)",
            }}
          />
        </div>
      )}

      {hasError ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "oklch(89% 0.038 62)" }}
        >
          <span className="font-sans text-xs" style={{ color: "oklch(48% 0.02 50)" }}>
            No image
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          // Single load — skeleton sits on top until this fires
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default SkeletonLoader;
