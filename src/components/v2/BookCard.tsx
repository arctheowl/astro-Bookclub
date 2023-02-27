import { useState } from "react";
import Modal from "./modal";
import Card from "./Card";
import { BsStarFill } from "react-icons/bs/index";

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
                <img src={image} alt={title} className="rounded-2xl" />
              </div>
            </div>
            <div className="col-start-3 flex-col col-span-6 gap-4 p-10">
              {rating > 1 && (
                <div className="absolute right-4 top-4 w-12 h-12 md:right-5 md:top-5 md:w-24 md:h-24 flex items-center justify-center">
                  <BsStarFill className="text-yellow-500 md:text-8xl md:text-opacity-80 z-0 absolute h-12 w-12 md:w-24 md:h-24" />
                  <p className="md:font-bold md:text-xl z-10">{rating}</p>
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
          <button onClick={() => setOpen(!open)} className={`h-full w-full`}>
            <div
              className={` ${
                open
                  ? "invisible absolute h-0"
                  : `absolute z-10 bg-purple-300 rounded-br-xl pr-2 pl-1 md:text-xl rounded-tl-md text-[.75rem] col-span-4`
              }`}
            >
              {month} {year}
            </div>
              <img
                src={image}
                alt={title}
                className={`rounded-2xl object-fill h-full w-full`}
              />
  
          </button>
        </Card>
      )}
    </>
  );
};

export default BookCard;
