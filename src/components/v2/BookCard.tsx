import { useState } from "react";
import Modal from "./modal";
import Card from "./Card";
import SkeletonLoader from "./SkeletonLoader";
import { BsStarFill } from "react-icons/bs";

type Props = {
  title: string;
  image: string;
  author: string;
  desc: string;
  month: string;
  year: string;
  rating: number;
};

const BookCard = ({
  title,
  image,
  author,
  desc,
  month,
  year,
  rating,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Modal title={title} close={setOpen}>
          <div className="md:grid md:gap-8 md:grid-cols-6">
            <div className="md:col-span-2">
              <div className="flex opacity-10 absolute -z-10 h-full w-full -translate-x-4 -translate-y-8 md:translate-x-0 md:translate-y-0 md:relative md:opacity-100">
                <SkeletonLoader src={image} alt={title} className="rounded-2xl w-full h-auto" />
              </div>
            </div>
            <div className="col-start-3 flex-col col-span-6 gap-4 p-10">
              {rating > 1 && (
                <div className="absolute right-4 top-4 w-12 h-12 md:right-6 md:top-6 md:w-20 md:h-20 flex items-center justify-center">
                  <BsStarFill className="text-yellow-500 md:text-6xl text-opacity-90 z-0 absolute h-12 w-12 md:w-20 md:h-20 drop-shadow-lg" />
                  <p className="font-bold text-sm md:text-lg z-10 text-yellow-900 drop-shadow-sm">{rating}</p>
                </div>
              )}

              <h1 className="text-2xl md:text-3xl md:w-11/12">{title}</h1>
              <p className="md:pb-8 pt-5 md:text-xl text-purple-600 md:w-11/12">
                {author}
              </p>

              <p className="md:pt-10 pt-5 md:text-xl w-full whitespace-pre-line">{desc}</p>
              <p className="md:pt-10 pt-5 md:text-xl text-purple-600">
                {month + " " + year}
              </p>
            </div>
          </div>
        </Modal>
      ) : (
        <Card>
          <button 
            onClick={() => setOpen(!open)} 
            className="h-full w-full group relative overflow-hidden rounded-2xl"
          >
            <div
              className={`${
                open
                  ? "invisible absolute h-0"
                  : `absolute z-10 bg-purple-300 rounded-br-xl pr-2 pl-1 md:text-xl rounded-tl-md text-[.75rem] col-span-4`
              }`}
            >
              {month} {year}
            </div>
            <SkeletonLoader
              src={image}
              alt={title}
              className="rounded-2xl object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-2xl"></div>
          </button>
        </Card>
      )}
    </>
  );
};

export default BookCard;
