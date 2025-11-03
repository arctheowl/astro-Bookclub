import { useState, useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
};

const SkeletonLoader = ({ src, alt, className = "", children }: Props) => {
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
      <div className={`${className} bg-gray-200 flex items-center justify-center rounded-2xl`}>
        <div className="text-gray-400 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse rounded-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        {children}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default SkeletonLoader;
