import { motion } from "framer-motion";
import Image from "next/image";

type CertificationCardProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
};

function CertificationCard({
  title,
  description,
  tags,
  imageUrl,
}: CertificationCardProps) {
  return (
    <div className="flex justify-center items-center h-screen ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-gray-100 rounded-xl shadow-xl p-6 max-w-sm w-full"
      >
        {/* Image */}
        <div className="overflow-hidden rounded-lg mb-4">
          <Image
            src={imageUrl} // Replace with your image
            alt="Web Design"
            className="w-full"
            width={500}
            height={300}
          />
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-semibold mb-2"
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-sm leading-relaxed mb-4"
        >
          {description}
        </motion.p>

        {/* Tags */}
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
