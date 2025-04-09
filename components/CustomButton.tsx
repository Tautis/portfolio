export enum ButtonColor {
  White = "white",
  Blue = "blue",
  Green = "green",
  Red = "red",
  Black = "black",
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type Props = {
  text: string;
  bgColor?: ButtonColor;
  size?: ButtonSize;
};

function CustomButton({
  text,
  bgColor = ButtonColor.White,
  size = ButtonSize.Medium,
}: Props) {
  const colorClasses = {
    [ButtonColor.White]: "bg-white text-black",
    [ButtonColor.Blue]: "bg-blue-500 text-white",
    [ButtonColor.Green]: "bg-green-500 text-white",
    [ButtonColor.Red]: "bg-red-500 text-white",
    [ButtonColor.Black]: "bg-[#111] text-white",
  };

  const sizeClasses = {
    [ButtonSize.Small]: "text-sm py-2 px-4",
    [ButtonSize.Medium]: "text-base py-3 px-6",
    [ButtonSize.Large]: "text-lg py-4 px-8",
  };
  return (
    <button
      className={`relative rounded-3xl overflow-hidden group transition-all duration-300 ${colorClasses[bgColor]} ${sizeClasses[size]}`}
    >
      <div className="absolute top-3.5 left-4 w-5 h-5 bg-blue-300 rounded-full transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:delay-100 group-hover:left-0 group-hover:top-0"></div>
      <span className="relative z-10 px-8 group-hover:px-10 transition-all duration-300 font-bold">
        {text}
      </span>
    </button>
  );
}

export default CustomButton;
