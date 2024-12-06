import StackIcon from "tech-stack-icons";
import { motion } from "framer-motion";
import GooglecloudOriginal from "devicons-react/icons/GooglecloudOriginal";
import ExpressOriginal from "devicons-react/icons/ExpressOriginal";
import SequelizeOriginal from "devicons-react/icons/SequelizeOriginal";
import VercelLine from "devicons-react/icons/VercelLine";
const iconMap = {
  express: ExpressOriginal,
  sequelize: SequelizeOriginal,
  gcp: GooglecloudOriginal,
  vercel: VercelLine,
};
function SkillsCard({
  name,
  title,
}: {
  name: keyof typeof iconMap | string;
  title: string;
}) {
  const Icon =
    (iconMap as any)[name] ||
    ((props: any) => <StackIcon name={name} {...props} />);
  const isDevIcon = name in iconMap;
  const isexpressorvercel = name === "express" || name === "vercel";
  return (
    <motion.div
      className="relative grayscale-0 md:grayscale hover:grayscale-0 flex flex-col justify-center items-center p-4 sm:p-8 md:border-2 md:border-neutral-100 rounded-md w-[125px] h-[125px] sm:w-[150px] sm:h-[150px] overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      {/* Background dots */}

      <motion.div
        className="flex flex-row md:flex-col justify-center w-fit items-center  "
        variants={{
          initial: { y: 0 },
          hover: { y: -10 },
        }}
        transition={{ duration: 0.5 }}
      >
        {isDevIcon ? (
          isexpressorvercel ? (
            <Icon size={50} color="white" />
          ) : (
            <Icon size={50} />
          )
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
            <StackIcon name={name} className="w-full h-full" />
          </div>
        )}
        <motion.p
          className="text-neutral-100 text-xs sm:text-sm ml-2 md:ml-0 md:mt-2 text-center md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.p>
      </motion.div>

      <motion.p
        className="hidden md:block text-neutral-100 text-xs sm:text-sm mt-2 text-center"
        variants={{
          initial: { y: 0, opacity: 0 },
          hover: { y: 10, opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.p>
    </motion.div>
  );
}

export default SkillsCard;
