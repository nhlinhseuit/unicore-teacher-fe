"use client";

import IconButton from "@/components/shared/Button/IconButton";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import {
  mockDataAllAppproveTopic,
  mockDataAppprovedTopic,
  mockDataNotAppproveTopic,
  mockDataProcessingAppproveTopic,
} from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { mockApproveTopicOptions } from "@/mocks";

import TableSearch from "@/components/shared/Search/TableSearch";
import { useState } from "react";

const ApproveTopic = () => {
  const [selectedApproveTopicOption, setSelectedApproveTopicOption] =
    useState(3);

  const getDataTable = () => {
    switch (selectedApproveTopicOption) {
      case 1:
        return mockDataAllAppproveTopic;
      case 2:
        return mockDataAppprovedTopic;
      case 3:
        return mockDataProcessingAppproveTopic;
      case 4:
        return mockDataNotAppproveTopic;
      default:
        return mockDataAllAppproveTopic;
    }
  };

  return (
    <>
      <div className="mb-6 flex justify-start ml-10 w-1/2 items-center gap-4">
        <p className="inline-flex justify-start text-sm whitespace-nowrap">
          Bộ lọc
        </p>
        <Dropdown
          className="z-30 rounded-lg"
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <div>
              <IconButton
                text={`${
                  selectedApproveTopicOption !== -1
                    ? mockApproveTopicOptions[selectedApproveTopicOption - 1]
                        .value
                    : "Chọn lớp"
                }`}
                onClick={() => {}}
                iconRight={"/assets/icons/chevron-down.svg"}
                bgColor="bg-white"
                textColor="text-black"
                otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
              />
            </div>
          )}
        >
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="p-2"
          />
          <div className="scroll-container scroll-container-dropdown-content">
            {mockApproveTopicOptions.map((course: any, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedApproveTopicOption === course.id) {
                    setSelectedApproveTopicOption(-1);
                  } else {
                    setSelectedApproveTopicOption(course.id);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedApproveTopicOption === course.id ? (
                    <Image
                      src="/assets/icons/check.svg"
                      alt="search"
                      width={21}
                      height={21}
                      className="cursor-pointer mr-2"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>

      <RegisterTopicTable
        type={RegisterTopicTableType.approveTopic}
        isEditTable={false}
        isMultipleDelete={false}
        dataTable={getDataTable()}
      />
    </>
  );
};

export default ApproveTopic;
