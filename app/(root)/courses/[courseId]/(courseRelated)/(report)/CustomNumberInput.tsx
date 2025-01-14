
interface Props {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CustomNumberInput = (params: Props) => {
  return (
    <div className="flex items-center border  light-border-2 rounded-lg h-9">
      {/* Nút giảm */}
      <button
        type="button"
        onClick={params.onDecrement}
        className="flex-shrink-0 w-9 border-r-[1px] light-border-2 h-full flex items-center justify-center"
      >
        -
      </button>

      {/* Input hiển thị giá trị */}
      <input
        type="text"
        value={params.value}
        readOnly
        className="w-12 text-center border-none outline-none h-full text-sm"
      />

      {/* Nút tăng */}
      <button
        type="button"
        onClick={params.onIncrement}
        className="flex-shrink-0 w-9 border-l-[1px] light-border-2 h-full flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default CustomNumberInput;
