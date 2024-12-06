import Image from "next/image";

function PortfolioCard({
  src,
  title,
  description,
  stack,
  link,
  live,
}: {
  src: string;
  title: string;
  description: string;
  link?: string;
  live?: string;
  stack: string;
  index: number;
}) {
  return (
    <div
      className={`flex flex-col  bg-neutral-900 text-neutral-100   rounded-lg   `}
    >
      <div className="flex-1 p-4 md:p-6 max-h-[400px] overflow-hidden">
        <Image
          className="rounded-lg"
          src={src}
          alt={title}
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex-1 flex-wrap flex-grow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-sm font-semibold text-gray-400 mb-4">
            TECH: {stack}
          </p>
          <p className=" text-sm mb-6">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          {link && (
            <a
              href={link}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              GitHub →
            </a>
          )}
          {live && (
            <a
              href={live}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              Live →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;
