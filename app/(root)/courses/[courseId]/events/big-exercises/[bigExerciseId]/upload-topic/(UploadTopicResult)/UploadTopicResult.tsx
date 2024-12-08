"use client";

import IconButton from "@/components/shared/Button/IconButton";
import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";
import { mockTopicDataTable } from "@/mocks";
import { useState } from "react";

import AlertCreateNewTopic from './AlertCreateNewTopic';
import ImportListTopic from "./ImportListTopic";

const UploadTopicResult = () => {
    const [isImport, setIsImport] = useState(false);
    const handleSetImport = (value: boolean) => {
      setIsImport(value);
    };
    const [isCreateNew, setIsCreateNew] = useState(false);
    const handleSetCreateNew = (value: boolean) => {
      setIsCreateNew(value);
    };
    
  return <>
  {!isImport ? (
    <>
      <div className="flex justify-end mb-3 gap-2">
        <IconButton
          text="Import danh sách đề tài"
          onClick={() => {
            setIsImport(true);
          }}
          iconLeft={"/assets/icons/upload-white.svg"}
          iconWidth={16}
          iconHeight={16}
        />

        <IconButton
          text="Đăng đề tài mới"
          green
          onClick={() => {
            setIsCreateNew(true);
          }}
          iconLeft={"/assets/icons/add.svg"}
          iconWidth={16}
          iconHeight={16}
        />
      </div>

      <TopicGroupTable
        isEditTable={false}
        isMultipleDelete={false}
        // @ts-ignore
        dataTable={mockTopicDataTable}
      />
    </>
  ) : (
    <ImportListTopic handleSetImport={handleSetImport}/>
  )}

  <AlertCreateNewTopic
    isCreateNew={isCreateNew}
    handleSetCreateNew={handleSetCreateNew}
  />
</>
}

export default UploadTopicResult