import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

interface Props {
  value: number;
  step?: number;
  min: number;
  max: number;
  format?: (num: number) => string;
  decreaseCb?: () => void;
  increaseCb?: () => void;
  onChange?: (num: number) => void;
  onRemove?: () => void;
  className?: string;
}

const Ratio = ({
  onChange,
  onRemove,
  decreaseCb,
  increaseCb,
  value,
  format,
  step = 10,
  min,
  max,
  className,
}: Props) => {
  const onPlus = () => {
    const isValid = between(value + step, min, max);
    onChange?.(isValid ? value + step : value);
    increaseCb?.();
  };

  const onMinus = () => {
    const isValid = between(value - step, min, max);
    onChange?.(isValid ? value - step : value);
    decreaseCb?.();
  };

  const shouldShowRemove = value === 1 && onRemove;

  return (
    <div
      className={`flex justify-between items-center flex-nowrap ${className}`}
    >
      <div
        onClick={shouldShowRemove ? onRemove : onMinus}
        className="flex transition-colors cursor-pointer border-[1px] hover:border-black bg-[#efefef] active:bg-[#d1d0d0] border-white justify-center items-center p-[7px] rounded-full"
      >
        {shouldShowRemove ? (
          <FaTrash className="m-[4px]" fontSize={14} />
        ) : (
          <FiMinus fontSize={18} />
        )}
      </div>
      <span className="font-thin">{format ? format(value) : value}</span>
      <div
        onClick={onPlus}
        className="flex transition-colors cursor-pointer border-[1px] hover:border-black bg-[#efefef] active:bg-[#d1d0d0] border-white justify-center items-center p-[7px] rounded-full"
      >
        <FiPlus fontSize={18} />
      </div>
    </div>
  );
};

export default Ratio;

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}
