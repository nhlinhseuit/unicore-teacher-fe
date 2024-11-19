"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ReportInfo from "./ReportInfo";
import NavigateButton from "@/components/shared/Button/NavigateButton";
import ReportSchedule from "./ReportSchedule";

const CreateReport = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const pathName = usePathname();

  const steps = [
    { id: 1, title: "Bước 1", desc: "Thêm lịch báo cáo" },
    { id: 2, title: "Bước 2", desc: "Thông tin báo cáo đồ án" },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };
  const goToPrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <>
      <div className="flex gap-4 items-center relative">
        <BackToPrev
          text={"Quay lại danh sách thông báo"}
          onClickPrev={handleClick}
          otherClasses={"mt-6"}
        />

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Icon Step và Title */}
              <div
                className={`w-8 h-8 ml-4 flex items-center justify-center rounded-full ${
                  currentStep > step.id
                    ? "bg-blue-500 text-blue-500" // Màu nền và màu chữ cho bước hoàn thành
                    : currentStep === step.id
                    ? "bg-blue-500 text-white" // Màu nền cho bước hiện tại
                    : "bg-gray-200 text-gray-500" // Màu nền cho bước chưa hoàn thành
                }`}
              >
                {currentStep > step.id ? (
                  <Image
                    src="/assets/icons/check-white.svg"
                    alt="check icon"
                    width={14}
                    height={14}
                    className="cursor-pointer"
                  />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Tiêu đề và mô tả bên cạnh */}
              <div className="ml-4 flex flex-col pr-4">
                <span className="text-sm font-medium">{step.desc}</span>
                {/* <span className="text-xs text-gray-500">{step.desc}</span> */}
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div
                  className={`h-[3px] ${
                    currentStep > step.id ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  style={{ width: "200px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Step Content */}
        <>
          {currentStep === 1 && (
            <div>
              <ReportSchedule/>
              
              <div className="flex-center mt-12">
                <NavigateButton
                  next
                  step="Bước 2"
                  text="Thông tin báo cáo đồ án"
                  onClick={goToNextStep}
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <ReportInfo />
              <div className="flex-center mt-12">
                <NavigateButton
                  back
                  step="Về bước 1"
                  text="Thêm lịch báo cáo đồ án"
                  onClick={goToPrevStep}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CreateReport;
