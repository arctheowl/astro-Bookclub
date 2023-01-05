import { Description } from "../../data/description";
import Date from "../../data/nextMeeting.json"

const Hero = () => {
  return (
    <div
      className={`bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2790&q=80')]
        h-96 md:h-4/6 bg-opacity-10 text-white relative flex justify-center items-center`}
    >
      <div className="bg-black opacity-50 h-full w-full absolute"></div>
      <div className="flex flex-col text-center justify-center items-center absolute gap-2 font-serif">
        <h1 className="text-4xl md:text-6xl text-center font-serif">Welcome to</h1>
        <h1 className="opacitiy-100 text-4xl md:text-6xl text-purple-300 font-serif">
          Fleet Book Club
        </h1>
        <p className="opacitiy-100 text-center md:w-5/12 md:text-lg text-sm p-8 font-sans">
          {Description}
        </p>
        <p className="text-xl md:text-2xl text-center font-serif text-gray-100">
          Our next meeting: {Date}
        </p>

      </div>
    </div>
  );
};

export default Hero;
