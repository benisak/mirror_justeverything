import Image from 'next/image';

const Subscription = () => {
  return (
    <div className="w-full bg-[#F7F7F7] flex justify-center md:p-4">
      {/* Outer container to control the width */}
      <div className="w-full max-w-7xl p-8 rounded-lg relative flex flex-col items-start md:flex-row justify-between md:ml-[180px]">
        
        {/* Image Section with SVG Background */}
        <div className="hidden md:flex items-end ml-[35px] relative">
          {/* SVG Background */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="#fee2e2"
            className="absolute bottom-[-30px] left-[50%] transform -translate-x-1/2"
          >
            <circle cx="89" cy="89" r="89" fill="#E8F6FA" />
          </svg>

          {/* Image */}
          <Image
            src="/img/subJE.png"
            alt="Delicious food"
            width={176}
            height={228}
            className="object-contain mb-[-48px] md:mb-0 lg:mb-[-48px] relative z-10" 
          />
        </div>

        {/* Subscription Form */}
        <div className="w-full md:w-[75%] text-left mt-[8px]">
        <h2
        className="font-openSans font-bold text-black leading-[120%] mb-4 text-[20px] md:text-[30px] md:leading-[36px]"
        style={{ color: "var(--Black-500, #1F1F1F)" }}
      >
        Stay Curious. Stay Updated.
      </h2>

      <p
        className="mb-6 text-[16px] font-inter font-normal leading-[24px] text-black md:max-w-[370px]"
        style={{ color: "var(--Black-400, #4B4B4B)" }}
      >
        Get the latest stories, insights, and surprises straight to your inbox, just everything you love.
      </p>


          <div className="flex flex-row gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-[#7D7D7D] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00A3C9] w-[85%] md:w-[400px]"
            />
            <button
              type="submit"
              className="bg-[#00A3C9] border border-[#00A3C9] text-white px-4 py-2 rounded-md w-[15%] min-w-[108px] md:w-[120px]
                        hover:bg-white hover:text-[#00A3C9] hover:border-[#00A3C9] transition-colors duration-300 ease-in-out"
            >
              Suscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
