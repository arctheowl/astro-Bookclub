type Props = {
  children: any;
};

const Card = ({ children }: Props) => {
  return (
    <div className="col-span-1 border-gray-600 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-300/50">
      {children}
    </div>
  );
};

export default Card;
