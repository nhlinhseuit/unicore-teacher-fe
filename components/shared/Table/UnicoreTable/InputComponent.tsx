import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";

interface InputParams {
  placeholder: string | number;
  value: string | number;
}

const InputComponent = (params: InputParams) => {
  const [inputWidth, setInputWidth] = useState("auto");
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(`${spanWidth + 25}px`); // Thêm 20px cho padding và khoảng cách
    }
  }, [params.value]); // Cập nhật mỗi khi giá trị value thay đổi

  return (
    <div className="relative inline-block">
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre"
        style={{
          fontSize: "1rem", // Đặt font size tương tự như trong input
          fontFamily: "inherit", // Đặt font giống input
        }}
      >
        {params.value || params.placeholder}
      </span>
      <Input
        type="text"
        placeholder={typeof params.placeholder === "string" ? params.placeholder : "number"}
        value={params.value}
        onChange={() => {}}
        style={{ width: inputWidth }} // Điều chỉnh chiều rộng của input
        className="
          paragraph-regular no-focus placeholder  
          background-light800_darkgradient
          shadow-none outline-none border-none truncate"
      />
    </div>
  );
};

export default InputComponent;
