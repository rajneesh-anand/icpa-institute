import CloseIcon from "@assets/icons/close-icon";
import cn from "classnames";

const CloseButton = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        "fixed z-10 inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 transition duration-200 text-base text-opacity-50 focus:outline-none  hover:text-opacity-100 top-0.5 md:top-2 lg:top-7 xl:top-10 end-0.5 md:right-2 lg:right-7 xl:right-10 bg-fill lg:bg-transparent rounded-full",
        className
      )}
    >
      <CloseIcon className="text-xl lg:text-2xl" />
    </button>
  );
};

export default CloseButton;
