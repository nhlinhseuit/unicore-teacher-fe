"use client";

import IconButton from "@/components/shared/Button/IconButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import { DetailFilterScore, FilterType } from "@/constants";
import { Dropdown } from "flowbite-react";
import Image from "next/image";

const DetailFilterComponentScore = () => {
  return (
    <div className="flex w-full gap-2">
          {Object.values(DetailFilterScore)
            .filter((item) => isNaN(Number(item)))
            .map((item) => {
              let width = "";
              let text = "";
              let dataDropdown: any = [];
              let searchTermDropdown = "";
              let setSearchTermDropdown = (value: any) => {};
              let handleClickFilter = (item: any) => {};
              let checkIsActive = (item: any): boolean => {
                return false;
              };
              let checkIsShowFilterIcon = (item: any): any => {
                return "";
              };
              const typeFilter = FilterType.DetailFilter;
  
              switch (item) {
                case "Semester":
                  text = "Học kỳ";
                  width = "w-[15%]";
                  dataDropdown = [1, 2, 3];
  
                  break;
                case "Year":
                  text = "Năm học";
                  width = "w-[15%]";
  
                  dataDropdown = [2015, 2016, 2017];
  
                  break;
                case "Subject":
                  text = "Môn học";
                  width = "w-[35%]";
  
                  dataDropdown = [
                    "Lập trình hướng đối tượng",
                    "Nhập môn lập trình",
                    "Nhập môn ứng dụng đi dộng",
                  ];
                  undefined;
                  // };
                  break;
                case "Course":
                  text = "Lớp học";
                  width = "w-[35%]";
  
                  dataDropdown = [
                    "Nhập môn Ứng dụng di động",
                    "Kiểm chứng phần mềm",
                    "Kiến trúc phần mềm",
                  ];
  
                  break;
                default:
                  width = "";
                  break;
              }
  
              return (
                <div key={item} className={`${width}`}>
                  <Dropdown
                    className="z-30 rounded-lg"
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <div>
                        <IconButton
                          otherClasses="w-full"
                          text={text}
                          iconLeft={checkIsShowFilterIcon(item)}
                          iconRight={"/assets/icons/chevron-down.svg"}
                          bgColor="bg-white"
                          textColor="text-black"
                          border
                        />
                      </div>
                    )}
                  >
                    <TableSearch
                      setSearchTerm={setSearchTermDropdown}
                      searchTerm={searchTermDropdown}
                      otherClasses="p-2"
                    />
                    <div className="scroll-container scroll-container-dropdown-content">
                      {dataDropdown.map((item: any, index: number) => {
                        if (typeof item === "string" && item === "") {
                          return <></>;
                        }
                        return (
                          <Dropdown.Item
                            key={`${item}_${index}`}
                            onClick={() => {
                              handleClickFilter(item);
                            }}
                          >
                            <div className="flex justify-between w-full">
                              <p className="w-[80%] text-left line-clamp-1">
                                {item}
                              </p>
                              {checkIsActive(item) && (
                                <Image
                                  src="/assets/icons/check.svg"
                                  alt="search"
                                  width={21}
                                  height={21}
                                  className="mr-2 cursor-pointer"
                                />
                              )}
                            </div>
                          </Dropdown.Item>
                        );
                      })}
                    </div>
                  </Dropdown>
                </div>
              );
            })}
        </div>
  );
};

export default DetailFilterComponentScore;
