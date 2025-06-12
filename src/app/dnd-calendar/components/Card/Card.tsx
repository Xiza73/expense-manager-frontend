export interface CardProps {
  name: string;
};

export const Card: React.FC<CardProps> = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};
