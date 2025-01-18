"use client";

import IconButton from "@/components/shared/Button/IconButton";
import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";
import { useEffect, useState } from "react";

import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";
import { convertToDataTableTopicsViKeys } from "@/lib/convertToDataTableTopic";
import { fetchDetailProject } from "@/services/projectServices";
import { TopicDataItem } from "@/types/entity/Topic";
import AlertCreateNewTopic from "./AlertCreateNewTopic";
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

  const [dataTable, setDataTable] = useState<TopicDataItem[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockParamsProjectId = "67813766b925f9491c58988b";

  useEffect(() => {
    fetchDetailProject(mockParamsProjectId)
      .then((data: any) => {
        if (data) setDataTable(convertToDataTableTopicsViKeys(data?.topics));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
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

          {/* //! SỬ DỤNG TopicGroupTable ĐỂ KHÔNG CHỈNH SỬA */}
          {isLoading ? (
            <LoadingComponent />
          ) : dataTable &&
            dataTable.filter((item) => !item.isDeleted).length > 0 ? (
            <TopicGroupTable
              isEditTable={false}
              isMultipleDelete={false}
              // @ts-ignore
              dataTable={dataTable}
            />
          ) : (
            <NoResult
              title="Không có dữ liệu!"
              description="🚀 Import file danh sách để thấy được dữ liệu."
            />
          )}
        </>
      ) : (
        <ImportListTopic handleSetImport={handleSetImport} />
      )}

      <AlertCreateNewTopic
        isCreateNew={isCreateNew}
        handleSetCreateNew={handleSetCreateNew}
      />
    </>
  );
};

export default UploadTopicResult;
