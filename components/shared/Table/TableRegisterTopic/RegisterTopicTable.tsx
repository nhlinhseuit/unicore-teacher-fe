import { RegisterTopicDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import RowRegisterTopicTable from "./RowRegisterTopicTable";

import { RegisterTopicTableType, itemsPerPageRegisterTable } from "@/constants";
import { toast } from "@/hooks/use-toast";
import IconButton from "../../Button/IconButton";
import SubmitButton from "../../Button/SubmitButton";
import MyFooter from "../components/MyFooter";

import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderContainer from "../../BorderContainer";
import { tableTheme } from "../components/DataTable";

interface DataTableParams {
  type: RegisterTopicTableType;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: RegisterTopicDataItem[];
  onSaveTable: (itemsSelected: string[]) => void;
}

const RegisterTopicTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);

  const [feedback, setFeedback] = useState("");
  const [isShowDialog, setIsShowDialog] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const AnnoucementSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      setIsShowDialog(-1);

      if (isShowDialog === 1) {
        toast({
          title: "Duyệt đề xuất các đề tài thành công.",
          description: `Các đề tài ${itemsSelected.join(", ")} đã dược duyệt.`,
          variant: "success",
          duration: 3000,
        });
        params.onSaveTable(itemsSelected)
        setItemsSelected([]);
        // TODO: Xóa local
      } else if (isShowDialog === 2) {
        toast({
          title: "Phản hồi đề tài thành công.",
          description: `Các đề tài ${itemsSelected.join(", ")} đã dược duyệt.`,
          variant: "success",
          duration: 3000,
        });
        setItemsSelected([]);
      } else {
        toast({
          title: "Từ chối các đề tài thành công.",
          description: `Các đề tài ${itemsSelected.join(", ")} đã bị từ chối.`,
          variant: "success",
          duration: 3000,
        });
        setItemsSelected([]);
      }
    } catch {
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          {/* TABLE */}
          {currentItems.length > 0 && currentItems.length === 0 ? (
            <NoResult
              title="Không có dữ liệu!"
              description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
            />
          ) : (
            <>
              {params.type === RegisterTopicTableType.approveTopic ? (
                isShowDialog === -1 ? (
                  <BorderContainer otherClasses="mb-4 p-6">
                    <div className="flex justify-end items-center">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          Đã chọn:
                          <span className="font-semibold">
                            {` ${itemsSelected.length}`}
                          </span>
                        </p>
                        <IconButton
                          text="Duyệt đề tài"
                          onClick={() => {
                            if (itemsSelected.length === 0) {
                              toast({
                                title: "Vui lòng chọn đề tài!",
                                variant: "error",
                                duration: 3000,
                              });
                              return;
                            }
                            setIsShowDialog(1);
                          }}
                          iconWidth={16}
                          iconHeight={16}
                        />
                        <IconButton
                          text="Phản hồi đề tài"
                          green
                          onClick={() => {
                            if (itemsSelected.length === 0) {
                              toast({
                                title: "Vui lòng chọn đề tài!",
                                variant: "error",
                                duration: 3000,
                              });
                              return;
                            }
                            setIsShowDialog(2);
                          }}
                          iconWidth={16}
                          iconHeight={16}
                        />
                        <IconButton
                          text="Từ chối đề tài"
                          red
                          onClick={() => {
                            if (itemsSelected.length === 0) {
                              toast({
                                title: "Vui lòng chọn đề tài!",
                                variant: "error",
                                duration: 3000,
                              });
                              return;
                            }
                            setIsShowDialog(3);
                          }}
                          iconWidth={16}
                          iconHeight={16}
                        />
                      </div>
                    </div>
                  </BorderContainer>
                ) : null
              ) : null}

              {itemsSelected.length > 0 && isShowDialog !== -1 ? (
                <BorderContainer otherClasses="mb-4 p-6">
                  <div>
                    <div className="flex justify-end items-center mb-3 gap-2">
                      <SubmitButton text="Lưu" iconWidth={16} iconHeight={16} />
                    </div>

                    <div className="mb-4">
                      <p className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Phản hồi cho đề tài (nếu có)
                      </p>
                      <p className="body-regular mt-3.5 text-light-500">
                        {isShowDialog === 2
                          ? "Bạn có thể phản hồi và đề xuất sinh viên chỉnh sửa đề tài phù hợp hơn tại đây. Đề tài sẽ chuyển sang trạng thái đang xử lý."
                          : "Không bắt buộc."}
                      </p>
                      <textarea
                        placeholder="Nhập phản hồi đề tài..."
                        onChange={(e) => setFeedback(e.target.value)}
                        className="
                         mt-3.5
                        no-focus
                        paragraph-regular
                        background-light900_dark300
                        light-border-2
                        text-dark300_light700
                        min-h-[200px]
                        rounded-md
                        border
                        resize-none
                        w-full
                        px-3
                        py-4
                        focus:outline-none
                        focus:ring-0
                        active:outline-none
                        focus:border-inherit
                        text-sm"
                      />
                    </div>
                  </div>
                </BorderContainer>
              ) : null}

              <div
                className="
            scroll-container 
            overflow-auto
            max-w-full
            h-fit
            rounded-lg
            border-[1px]
            border-secondary-200
            "
              >
                <Table hoverable theme={tableTheme}>
                  {/* HEADER */}
                  <Table.Head
                    theme={tableTheme?.head}
                    className="sticky top-0 z-10 uppercase border-b bg-gray"
                  >
                    <Table.HeadCell
                      theme={tableTheme?.head?.cell}
                      className={`border-r-[1px] uppercase`}
                    ></Table.HeadCell>

                    <Table.HeadCell
                      theme={tableTheme?.head?.cell}
                      className={` w-10 border-r-[1px] uppercase`}
                    >
                      STT
                    </Table.HeadCell>

                    {Object.keys(currentItems[0]?.data || {}).map(
                      (key) => {
                        if (key === "Mã nhóm") return null;

                        return (
                          <Table.HeadCell
                            key={key}
                            theme={tableTheme?.head?.cell}
                            className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                          >
                            {key}
                          </Table.HeadCell>
                        );
                      }
                    )}
                  </Table.Head>

                  {/* BODY */}
                  <Table.Body className="text-left divide-y">
                    {currentItems.map((dataItem, index) =>
                      dataItem.isDeleted ? (
                        <></>
                      ) : (
                        <>
                          {/* //TODO: Main Row: Leader */}
                          <RowRegisterTopicTable
                            type={params.type}
                            key={dataItem.STT}
                            dataItem={dataItem}
                            isEditTable={params.isEditTable}
                            isMultipleDelete={params.isMultipleDelete}
                            onClickCheckBoxSelect={(item: string) => {
                              setItemsSelected((prev) => {
                                if (prev.includes(item)) {
                                  return prev.filter((i) => i !== item);
                                } else {
                                  return [...prev, item];
                                }
                              });
                            }}
                            onChangeRow={(updatedDataItem: any) => {
                              //   setLocalDataTable((prevTable) =>
                              //     prevTable.map((item) =>
                              //       item.STT === updatedDataItem.STT
                              //         ? updatedDataItem
                              //         : item
                              //     )
                              //   );
                            }}
                            saveSingleRow={(updatedDataItem: any) => {
                              const updatedDataTable = dataTable.map(
                                (item, index) =>
                                  item.STT === updatedDataItem.STT
                                    ? updatedDataItem
                                    : item
                              );

                              //   if (params.onSaveEditTable) {
                              //     params.onSaveEditTable(updatedDataTable);
                              //   }
                            }}
                            onClickGetOut={() => {
                              // params.onClickGetOut
                            }}
                            deleteSingleRow={() => {
                              //  params.onClickDelete
                            }}
                          />
                        </>
                      )
                    )}
                  </Table.Body>
                </Table>
              </div>
            </>
          )}

          {/* FOOTER */}
          {!isShowFooter || params.isEditTable || params.isMultipleDelete ? (
            <></>
          ) : (
            <MyFooter
              currentPage={currentPage}
              itemsPerPage={itemsPerPageRegisterTable}
              totalItems={totalItems}
              onPageChange={(newPage) => setCurrentPage(newPage)} //HERE
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegisterTopicTable;
