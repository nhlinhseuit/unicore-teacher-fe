"use client";

import IconButton from "@/components/shared/Button/IconButton";
import NoResult from "@/components/shared/Status/NoResult";
import ApproveTopicTable from "@/components/shared/Table/TableRegisterTopic/ApproveTopicTable";
import { ApproveTopicOptions, RegisterTopicTableType } from "@/constants";
import {
  mockDataAllAppproveTopic,
  mockDataAppprovedTopic,
  mockDataNotAppproveTopic,
  mockDataProcessingTopic,
  mockDataRefuseTopic,
} from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";

import { useEffect, useState } from "react";

const ApproveTopic = () => {
  const [selectedApproveTopicOption, setSelectedApproveTopicOption] =
    useState(3);
  const getDataTable = () => {
    switch (selectedApproveTopicOption) {
      case 1:
        return mockDataAllAppproveTopic;
      case 2:
        return mockDataNotAppproveTopic;
      case 3:
        return mockDataProcessingTopic;
      case 4:
        return mockDataAppprovedTopic;
      case 5:
        return mockDataRefuseTopic;
      default:
        return mockDataAllAppproveTopic;
    }
  };

  const [renderDataTable, setRenderDataTable] = useState(getDataTable());

  useEffect(() => {
    setRenderDataTable(getDataTable());
  }, [selectedApproveTopicOption]);

  const onSaveTable = (itemsSelected: string[]) => {
    const updatedTable = renderDataTable.filter(
      (item) => !itemsSelected.includes(item.data["Mã nhóm"])
    );
    setRenderDataTable(updatedTable);
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
                    ? ApproveTopicOptions[selectedApproveTopicOption - 1].value
                    : "Chọn bộ lọc"
                }`}
                onClick={() => {}}
                iconRight={"/assets/icons/chevron-down.svg"}
                bgColor="bg-white"
                textColor="text-black"
                border
              />
            </div>
          )}
        >
          <div className="scroll-container scroll-container-dropdown-content">
            {ApproveTopicOptions.map((course: any, index) => (
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

      {renderDataTable.filter((item) => !item.isDeleted).length > 0 ? (
        <ApproveTopicTable
          type={RegisterTopicTableType.approveTopic}
          dataTable={renderDataTable}
          isNotShowButton={selectedApproveTopicOption === 1}
          isOnlyShowResponseTopicButton={
            selectedApproveTopicOption === 4 || selectedApproveTopicOption === 5
          }
          onSaveTable={(itemsSelected: string[]) => {
            onSaveTable(itemsSelected);
          }}
        />
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Chưa có đề tài nào được đề xuất."
        />
      )}
    </>
  );
};

export default ApproveTopic;
