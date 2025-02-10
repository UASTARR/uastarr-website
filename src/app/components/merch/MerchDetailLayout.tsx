import BackButton from './BackButton';
import PhotoCarousel from './PhotoCarousel';

interface MerchDetailLayoutProps {
  isLoading?: boolean;
  imgrefs?: string[];
  name?: string;
  description?: string;
  price?: string | number;
}

const MerchDetailLayout = ({
  isLoading = false,
  imgrefs = [],
  name = '',
  description = '',
  price = '',
}: MerchDetailLayoutProps) => {
  return (
    <main>
      <div className="h-40"></div>

      <div className="relative z-20 w-full bg-black bg-opacity-70 pt-7 flex flex-col items-center">
        <div className="self-start ml-5 lg:ml-10">
          <BackButton redirectPath="/merch" />
        </div>

        <div className="mt-8 justify-center mb-20 w-full shadow-lg flex flex-col items-center lg:flex-row space-y-10 lg:space-x-20">
          {/* Carousel */}
          <div
            className={`flex flex-1 max-w-128 w-full min-h-[400px] lg:mr-24 ${
              isLoading ? 'animate-pulse bg-gray-800 rounded-sm' : ''
            }`}
          >
            {!isLoading && <PhotoCarousel imgrefs={imgrefs} />}
          </div>

          <div className="flex-1 flex flex-col max-w-xl space-y-6 px-3 w-full">
            {/* Title */}
            <div
              className={`${
                isLoading
                  ? 'w-2/4 h-8 bg-gray-700 animate-pulse rounded'
                  : 'text-4xl font-bold text-white mb-4'
              }`}
            >
              {!isLoading && name}
            </div>

            {/* Description */}
            <div className="space-y-3">
              {isLoading ? (
                <>
                  <div className="w-5/6 h-5 bg-gray-700 animate-pulse rounded" />
                  <div className="w-5/6 h-5 bg-gray-700 animate-pulse rounded" />
                  <div className="w-2/3 h-5 bg-gray-700 animate-pulse rounded" />
                </>
              ) : (
                <p className="text-gray-300 text-lg leading-relaxed mb-10 flex-grow">
                  {description}
                </p>
              )}
            </div>

            <div className="flex gap-5 lg:gap-14 items-center flex-col lg:items-end lg:flex-row">
              {/* Price */}
              <div className="mt-auto space-y-2 self-start">
                <p
                  className={`${
                    isLoading
                      ? 'w-1/5 h-5 bg-gray-700 animate-pulse rounded'
                      : 'text-gray-300 mb-1 font-semibold'
                  }`}
                >
                  {!isLoading && 'Price:'}
                </p>
                <p
                  className={`${
                    isLoading
                      ? 'w-1/5 h-8 bg-gray-600 animate-pulse rounded'
                      : 'text-3xl font-semibold text-lime-600'
                  }`}
                >
                  {!isLoading && `$${price}`}
                </p>
              </div>

              {/* Buy Button */}
              {isLoading ? (
                <div className="w-32 h-12 bg-gray-700 animate-pulse rounded-full" />
              ) : (
                <a
                  href="https://forms.gle/WQsiwyKVoKLkEDnf8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full w-32 h-12 flex items-center justify-center"
                >
                  Buy
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

export default MerchDetailLayout;
