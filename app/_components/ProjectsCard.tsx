import Image from "next/image";

function ProjectsCard({
  src,
  title,
  description,

  stack,
  index,
}: {
  src: string;
  title: string;
  description: string;
  link?: string;
  stack: string;
  index: number;
}) {
  return (
    <div
      className={`flex flex-col   rounded-lg p-10 overflow-hidden  ${
        index % 2 === 0
          ? "md:flex-row bg-neutral-900 text-neutral-100 "
          : "md:flex-row-reverse bg-neutral-100 text-neutral-900"
      }`}
    >
      <div className="flex-1 p-4 md:p-6 max-h-[400px] overflow-hidden">
        <Image
          className="rounded-lg"
          src={src}
          alt={title}
          placeholder="blur"
          blurDataURL="data:image/png;base64"
          quality={80}
          loading="lazy"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-sm font-semibold text-gray-400 mb-4">
            TECH: {stack}
          </p>
          <p className=" text-sm mb-6">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
          >
            GitHub →
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white underline transition"
          >
            Show more +
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectsCard;
