import data from "../../data/BooksData.json";
import BookCard from "./BookCard";

type Props = {};

const BookSection = (props: Props) => {
  return (
    <div className="grid md:grid-cols-5 grid-cols-2 gap-8 md:gap-y-8 p-10 bg-[#e3e2de]">
      {data.map((book) => {
        return (
          <BookCard
            key={book.Name}
            title={book.Name}
            image={book.Image}
            author={book.Author}
            desc={book.Description}
            month={book.Month}
            year={book.Year}
            rating={book.Rating}
          />
        );
      })}
    </div>
  );
};

export default BookSection;
