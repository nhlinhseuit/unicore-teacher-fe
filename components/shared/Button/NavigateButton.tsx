import Image from "next/image";
import { Button } from "../../ui/button";

interface NavigateButtonProps {
  step: string;
  text: string;
  onClick?: () => void;
  next?: boolean;
  back?: boolean;
}

const NavigateButton = (params: NavigateButtonProps) => {
  return (
    <Button
      onClick={params.onClick ? params.onClick : undefined}
      type="button"
      className={`
        flex
        gap-2
        items-center
        justify-between
        bg-blue-500
        font-medium
        rounded-lg
        text-sm                                                                     
        px-4
        py-2
        focus:outline-none
        h-auto
        text-center
        hover:bg-blue-500/90
        `}
    >
      {params.back ? (
        <Image
          src={"/assets/icons/chevron-right-white.svg"}
          width={6}
          height={6}
          alt="back"
        />
      ) : null}

      <p
        className={` text-white max-w-[300px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap flex-grow pl-2 pr-2 text-center `}
      >
        {params.step}
      </p>

      {params.next ? (
        <Image
          src={"/assets/icons/chevron-left-white.svg"}
          width={6}
          height={6}
          alt="next"
        />
      ) : null}
    </Button>
  );
};

export default NavigateButton;
