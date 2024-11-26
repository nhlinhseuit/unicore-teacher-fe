import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterGroupDataItem, RegisterTopicDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import RowRegisterTopicTable from "./RowRegisterTopicTable";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { itemsPerPageRegisterTable, RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { mockTeacherGradingList } from "@/mocks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BorderContainer from "../../BorderContainer";
import IconButton from "../../Button/IconButton";
import RadioboxComponent from "../../RadioboxComponent";
import MyFooter from "../components/MyFooter";

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
  const [isShowDialog, setIsShowDialog] = useState(-1);
  const [selectedTeacherOption, setSelectedTeacherOption] = useState(1);
  const [selectedTeacherGrading, setSelectedTeacherGrading] = useState(1);

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
    useState<RegisterGroupDataItem[]>(currentItems);

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
      console.log({
        title: values.title,
        description: values.description,

        // naviate to home page
        // router.push("/");
      });

      if (isShowDialog === 1) {
        toast({
          title: "Duyệt đề xuất các đề tài thành công.",
          description: `Các đề tài ${itemsSelected.join(", ")} đã dược duyệt.`,
          variant: "success",
          duration: 3000,
        });
        setItemsSelected([]);
        // TODO: Xóa local
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
            <div className="flex justify-end items-center mb-3 gap-2">
              <p className="text-sm font-medium">
                Đã chọn:
                <span className="font-semibold">
                  {` ${itemsSelected.length}`}
                </span>
              </p>
              <IconButton
                text="Duyệt đề tài"
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
                  setIsShowDialog(1);
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
                  setIsShowDialog(2);
                }}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
          ) : (
            <></>
          )}

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

                {Object.keys(filteredDataTable[0]?.data || {}).map((key) => {
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
                })}
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
                        isMemberOfAboveGroup={
                          index === 0
                            ? false
                            : filteredDataTable[index - 1].data["Mã nhóm"] ===
                              dataItem.data["Mã nhóm"]
                        }
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

                      {/* //TODO: MEMBER */}
                      {/* {dataItem.data.listStudent
                        .filter((student) => !student.isLeader)
                        .map((student, index) => (
                          <RowRegisterTopicTable
                            key={`${dataItem.STT}-${index}`}
                            dataItem={{
                              ...dataItem,
                              data: { ...dataItem.data, student },
                            }}
                            isEditTable={params.isEditTable}
                            isMultipleDelete={params.isMultipleDelete}
                            onClickCheckBoxSelect={() => {}}
                            onChangeRow={() => {}}
                            saveSingleRow={() => {}}
                            onClickGetOut={() => {}}
                            deleteSingleRow={() => {}}
                          />
                        ))} */}
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

      {/* ALERT CONFIRM */}
      {itemsSelected.length > 0 && isShowDialog !== -1 ? (
        <AlertDialog open={isShowDialog !== -1}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {isShowDialog === 1 ? "Chỉ định giảng viên" : "Phản hồi"}
              </AlertDialogTitle>
            </AlertDialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* NAME ANNOUCEMENT */}
                <div className="flex flex-col gap-6">
                  {isShowDialog === 1 ? (
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Chọn giảng viên duyệt đề xuất đề tài của sinh viên{" "}
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <BorderContainer otherClasses="mt-3.5">
                              <div className="p-4 flex flex-col gap-10">
                                <div className="inline-flex">
                                  <RadioboxComponent
                                    id={1}
                                    handleClick={() => {
                                      setSelectedTeacherOption(1);
                                    }}
                                    value={selectedTeacherOption}
                                    text="Chỉ định giảng viên được sinh viên đề xuất"
                                  />
                                </div>
                                <div className="inline-block">
                                  <RadioboxComponent
                                    id={2}
                                    handleClick={() => {
                                      setSelectedTeacherOption(2);
                                    }}
                                    value={selectedTeacherOption}
                                    text="Chọn giảng viên mới"
                                  />

                                  {selectedTeacherOption === 2 ? (
                                    <Dropdown
                                      className=" z-30 rounded-lg"
                                      label=""
                                      dismissOnClick={true}
                                      renderTrigger={() => (
                                        <div className="mt-4">
                                          <IconButton
                                            text={`${
                                              mockTeacherGradingList[
                                                selectedTeacherGrading - 1
                                              ].value
                                            }`}
                                            onClick={() => {}}
                                            iconRight={
                                              "/assets/icons/chevron-down.svg"
                                            }
                                            bgColor="bg-white"
                                            textColor="text-black"
                                            otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                                          />
                                        </div>
                                      )}
                                    >
                                      <div className="scroll-container scroll-container-dropdown-content">
                                        {mockTeacherGradingList.map(
                                          (teacher, index) => (
                                            <Dropdown.Item
                                              key={`${teacher.id}_${index}`}
                                              onClick={() => {
                                                if (
                                                  selectedTeacherGrading ===
                                                  teacher.id
                                                ) {
                                                  setSelectedTeacherGrading(1);
                                                } else {
                                                  setSelectedTeacherGrading(
                                                    teacher.id
                                                  );
                                                }
                                              }}
                                            >
                                              <div className="flex justify-between w-full">
                                                <p className="w-[80%] text-left line-clamp-1">
                                                  {teacher.value}
                                                </p>
                                                {selectedTeacherGrading ===
                                                teacher.id ? (
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
                                          )
                                        )}
                                      </div>
                                    </Dropdown>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </BorderContainer>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Lí do từ chối đề tài
                          </FormLabel>
                          <FormDescription className="body-regular mt-2.5 text-light-500">
                            Không bắt buộc.
                          </FormDescription>
                          <FormControl className="mt-3.5 ">
                            <textarea
                              {...field}
                              placeholder="Nhập phản hồi đề tài..."
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
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsShowDialog(-1);
                      }}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RegisterTopicTable;
