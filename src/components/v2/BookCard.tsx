import { useState } from "react";
import Modal from "./modal";
import SkeletonLoader from "./SkeletonLoader";

type Props = {
  title: string;
  image: string;
  author: string;
  desc: string;
  month: string;
  year: string;
  rating: number;
};

const BookCard = ({ title, image, author, desc, month, year, rating }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
        style={{ aspectRatio: "2 / 3" }}
        aria-label={`View details for ${title}`}
      >
        <div className="absolute inset-0">
          <SkeletonLoader
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        {/* Hover veil */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        {/* Month / year badge — top-left */}
        <div
          className="absolute top-2 left-2 font-sans font-medium rounded px-2 py-1"
          style={{
            background: "oklch(40% 0.1 30 / 0.88)",
            color: "oklch(95% 0.008 62)",
            fontSize: "0.75rem",
            letterSpacing: "0.03em",
          }}
        >
          {month} {year}
        </div>
      </button>

      {open && (
        <Modal
          title={title}
          image={image}
          author={author}
          desc={desc}
          month={month}
          year={year}
          rating={rating}
          close={setOpen}
        />
      )}
    </>
  );
};

export default BookCard;
