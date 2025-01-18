const MerchItemsSkeleton = ({ itemCount = 4 }: { itemCount: number }) => {
  if (!Number.isInteger(itemCount) || itemCount <= 0) {
    throw new Error('Item count must be a positive integer (> 0)');
  }

  return (
    <div className="mt-11 flex flex-wrap justify-center gap-14">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="flex-1 min-w-full sm:min-w-80 max-w-96 flex flex-col items-start space-y-4"
        >
          {/* Image Placeholder */}
          <div className="w-full h-96 bg-gray-800 animate-pulse rounded-sm"></div>

          {/* Text Placeholder */}
          <div className="w-3/4 h-6 bg-gray-700 animate-pulse rounded"></div>
          <div className="w-1/2 h-8 bg-gray-700 animate-pulse rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default MerchItemsSkeleton;
