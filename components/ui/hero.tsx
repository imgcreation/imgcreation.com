export const Hero = ({
  heading,
  background,
}: {
  heading: string;
  background: string;
}) => {
  return (
    <div
      className="relative h-[300px] bg-cover bg-center mb-10"
      style={{
        backgroundImage: `url('${background}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-white text-5xl font-serif">{heading}</h1>
      </div>
    </div>
  );
};
