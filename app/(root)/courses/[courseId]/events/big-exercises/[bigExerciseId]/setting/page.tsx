"use client";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { Input } from "@/components/ui/input";
import { mockSettingGradeColumnDetailBigExercise } from "@/mocks";
import { useState } from "react";

const Setting = () => {
  const [isToggleShowCourseSetting, setIsToggleShowCourseSetting] =
    useState(true);

  const [mockData, setMockData] = useState(mockSettingGradeColumnDetailBigExercise);

  const handleInputChange = (index: number, newValue: string) => {
    const updatedData = [...mockData];
    updatedData[index].ratio = newValue;
    setMockData(updatedData);
  };

  const handleSave = () => {
    console.log("Dữ liệu đã lưu:", mockData);
  };

  return (
    <div className="flex flex-col gap-20">
      <div>
        <ToggleTitle
          text="Cài đặt hệ số điểm"
          handleClick={() => {
            setIsToggleShowCourseSetting(!isToggleShowCourseSetting);
          }}
          value={isToggleShowCourseSetting}
        />
        {isToggleShowCourseSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-6">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                Thành phần điểm của bài tập lớn
              </label>
              <BorderContainer otherClasses="p-6 mt-4">
                {mockData.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center mb-4">
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                      {item.title}: (%)
                    </label>
                    <div>
                      <Input
                        value={item.ratio}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        placeholder="Nhập điểm..."
                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                      />
                    </div>
                  </div>
                ))}
              </BorderContainer>
            </div>

            <div>
              <IconButton text="Lưu cài đặt hệ số điểm" onClick={handleSave} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Setting;
