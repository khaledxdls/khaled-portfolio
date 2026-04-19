import { motion } from "framer-motion";
import Image from "next/image";

type CertificationCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  pdfUrl?: string;
};

function CertificationCard({
  title,
  description,
  tags,
  imageUrl,
  pdfUrl,
}: CertificationCardProps) {
  const media = pdfUrl ? (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View certificate: ${title}`}
      className="relative block overflow-hidden rounded-lg mb-4 bg-neutral-100 aspect-[5/3] group"
    >
      <object
        data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        type="application/pdf"
        aria-label={title}
        className="w-full h-full pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
          View certificate (PDF)
        </div>
      </object>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-neutral-900 text-sm font-semibold px-4 py-2 rounded-md shadow">
          View certificate →
        </span>
      </div>
    </a>
  ) : imageUrl ? (
    <div className="overflow-hidden rounded-lg mb-4">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full"
        width={500}
        height={300}
      />
    </div>
  ) : null;

  return (
    <div className="flex justify-center items-center h-screen ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-gray-100 rounded-xl shadow-xl p-6 max-w-sm w-full"
      >
        {media}

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold mb-2"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-sm leading-relaxed mb-4"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CertificationCard;
