import { RegisterTopicDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import RowRegisterTopicTable from "./RowRegisterTopicTable";

import { RegisterTopicTableType, itemsPerPageRegisterTable } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { mockTeacherList } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import IconButton from "../../Button/IconButton";
import SubmitButton from "../../Button/SubmitButton";
import TableSearch from "../../Search/TableSearch";
import MyFooter from "../components/MyFooter";

import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DataTableParams {
  type: RegisterTopicTableType;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: RegisterTopicDataItem[];
}

const RegisterTopicTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState(1);

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

  const [filteredDataTable, setFilteredDataTable] =
    useState<RegisterTopicDataItem[]>(currentItems);

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
          {currentItems.length > 0 && filteredDataTable.length === 0 ? (
            <NoResult
              title="Không có dữ liệu!"
              description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
            />
          ) : (
            <>
              {params.type === RegisterTopicTableType.approveTopic ? (
                isShowDialog === -1 ? (
                  <div className="flex justify-between items-center mb-3 gap-2">
                    <div className="flex gap-2 items-center">
                      <p className="inline-flex justify-start text-sm whitespace-nowrap">
                        Chọn giảng viên
                      </p>
                      <Dropdown
                        className="min-w-max z-30 rounded-lg"
                        label=""
                        dismissOnClick={true}
                        renderTrigger={() => (
                          <div>
                            <IconButton
                              text={`${
                                mockTeacherList[selectedTeacher - 1].value
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
                        <TableSearch
                          setSearchTerm={() => {}}
                          searchTerm=""
                          otherClasses="p-2"
                        />
                        <div className="w-full scroll-container scroll-container-dropdown-content">
                          {mockTeacherList.map((teacher, index) => (
                            <Dropdown.Item
                              key={`${teacher.id}_${index}`}
                              onClick={() => {
                                if (selectedTeacher === teacher.id) {
                                  setSelectedTeacher(1);
                                } else {
                                  setSelectedTeacher(teacher.id);
                                }
                              }}
                              className="min-w-max"
                            >
                              <div className="flex justify-between w-full">
                                <p className="w-[80%] text-left line-clamp-1">
                                  {teacher.value}
                                </p>
                                {selectedTeacher === teacher.id ? (
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

                    <div className="flex items-center mb-3 gap-2">
                      <p className="text-sm font-medium">
                        Đã chọn:
                        <span className="font-semibold">
                          {` ${itemsSelected.length}`}
                        </span>
                      </p>
                      <IconButton
                        text="Chỉ định giảng viên"
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
                          toast({
                            title:
                              "Chỉ định giảng viên duyệt đề tài thành công.",
                            description: `Đề tài ${itemsSelected.join(
                              ", "
                            )} sẽ dược duyệt bởi ${
                              mockTeacherList[selectedTeacher - 1].value
                            }.`,
                            variant: "success",
                            duration: 3000,
                          });
                          setItemsSelected([]);
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
                ) : (
                  <div className="flex justify-end items-center mb-3 gap-2">
                    <SubmitButton text="Lưu" iconWidth={16} iconHeight={16} />
                  </div>
                )
              ) : null}

              {itemsSelected.length > 0 && isShowDialog !== -1 ? (
                <div className="mb-4">
                  <p className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                    Phản hồi cho đề tài (nếu có)
                  </p>
                  <p className="body-regular mt-2.5 text-light-500">
                    Không bắt buộc.
                  </p>
                  <textarea
                    placeholder="Nhập phản hồi đề tài..."
                    onChange={(e) => setFeedback(e.target.value)}
                    className="
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

                    {Object.keys(filteredDataTable[0]?.data || {}).map(
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
                    {filteredDataTable.map((dataItem, index) =>
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
