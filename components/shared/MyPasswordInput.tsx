import Image from "next/image";
import React, { useState } from "react";

interface MyPasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | null; // Hàm kiểm tra lỗi
}

const MyPasswordInput: React.FC<MyPasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="relative w-full">
        {/* Label */}
        <div className="bg-white absolute mb-1 translate-y-[-50%] ml-2 px-2">
          <label className="small-medium">{label}</label>
        </div>

        {/* Input */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
            if (error) setError(null); // Xóa lỗi khi người dùng nhập lại
          }}
          onBlur={handleBlur} // Kiểm tra lỗi khi mất focus
          className={`
            base-regular
            border
            rounded-md
            py-3
            px-4
            pr-10
            focus:outline-none
            focus:ring-1
            focus:ring-primary-500
            focus:border-primary-500
            w-full
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          `}
        />

        {/* Icon toggle password visibility */}
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Image
              src="/assets/icons/eye-black.svg"
              width={20}
              height={20}
              alt="Show"
            />
          ) : (
            <Image
              src="/assets/icons/eye-black-off.svg"
              width={20}
              height={20}
              alt="Hide"
            />
          )}
        </div>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MyPasswordInput;
