import Link from 'next/link';

const BackButton = ({ redirectPath }: { redirectPath: string }) => {
  return (
    <Link
      href={redirectPath}
      className={`w-12 h-12 flex items-center text-gray-500 group`}
      aria-label="Go back"
    >
      <span
        className={`
          inline-block 
          w-6 h-6 
          border-t-2 border-l-2 border-gray-500 
          transform -rotate-45
          group-hover:border-gray-300 
          group-active:border-gray-100 
          transition-colors duration-150
        `}
      ></span>
    </Link>
  );
};

export default BackButton;
