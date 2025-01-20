"use client";

import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";
import RegisterGroupTable from "@/components/shared/Table/TableRegisterGroup/RegisterGroupTable";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { mockDataStudentRegisterGroup } from "@/mocks";
import {
  createGroupRegisterSchedule,
  editGroupRegisterSchedule,
  fetchGroupRegisterSchedule,
} from "@/services/groupRegisterServices";
import {
  convertGroupDataToRegisterGroupDataItem,
  IGroupRegisterResponseData,
  RegisterGroupDataItem,
} from "@/types/entity/GroupRegister";
import {
  formatDayToISODateWithDefaultTime,
  formatISOToDayDatatype,
} from "@/utils/dateTimeUtil";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { groupingIdAtom } from "../../../(courses)/(store)/courseStore";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

const ManageGroup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [minMember, setMinMember] = useState("");
  const [maxMember, setMaxMember] = useState("");
  const [selectedLeaderOption, setSelectedLeaderOption] = useState(false);
  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const [isToggleCreateSchedule, setIsToggleCreateSchedule] = useState(true);
  const [isToggleViewTable, setIsToggleViewTable] = useState(true);
  const [errorList, setErrorList] = useState([
    {
      id: "1",
      content:
        "Bạn phải chọn ngày bắt đầu và ngày kết thúc. Ngày kết thúc phải sau ngày bắt đầu.",
      value: false,
    },
    {
      id: "2",
      content: "Phải nhập số lượng thành viên nhóm tối thiểu và tối đa.",
      value: false,
    },
    { id: "3", content: "Số lượng thành viên phải là chữ số.", value: false },
    {
      id: "4",
      content: "Số lượng tối thiểu phải nhỏ hơn số lượng tối đa và khác 0.",
      value: false,
    },
  ]);

  const [isAlreadyHasSchedule, setIsAlreadyHasSchedule] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  //TODO: TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<RegisterGroupDataItem[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [groupRegisterSchedule, setGroupRegisterSchedule] =
    useState<IGroupRegisterResponseData>();

  const groupingId = useAtomValue(groupingIdAtom);
  const mockParamsGroupingId = "2f92d554-747d-4183-b8e3-f767437cabd3";

  useEffect(() => {
    //@ts-ignore
    if (mockParamsGroupingId !== "") {
      fetchGroupRegisterSchedule(mockParamsGroupingId)
        .then((data: IGroupRegisterResponseData) => {
          if (data) {
            console.log("fetchGroupRegisterSchedule", data);
            console.log(
              "convertGroupDataToRegisterGroupDataItem(data.groups)",
              convertGroupDataToRegisterGroupDataItem(data.groups)
            );

            setDataTable(convertGroupDataToRegisterGroupDataItem(data.groups));

            //?
            setDateStart(formatISOToDayDatatype(data.start_register_date));
            setDateEnd(formatISOToDayDatatype(data.end_register_date));
            setMaxMember(data.max_size.toString());
            setMinMember(data.min_size.toString());
            // ! mockParams
            // setSelectedLeaderOption(data.hasLeader)
            setIsAlreadyHasSchedule(true);

            setGroupRegisterSchedule(data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log("dataTable", dataTable);

  const setGroupingId = useSetAtom(groupingIdAtom);

  // 2. Define a submit handler.
  async function handleSubmit() {
    setIsSubmitting(true);
    if (validate()) {
      toast({
        title: "Tạo lịch thất bại.",
        description: `Vui lòng kiểm tra lại thông tin.`,
        variant: "error",
        duration: 3000,
      });
      return;
    }

    try {
      const mockParams = {
        class_id: "677fefdd854d3e02e4191707",
        subclass_code: "IT002.O21.CLC",
        start_register_date: formatDayToISODateWithDefaultTime(
          dateStart ?? new Date()
        ),
        end_register_date: formatDayToISODateWithDefaultTime(
          dateEnd ?? new Date()
        ),
        max_size: maxMember,
        min_size: minMember,
        // hasLeader: selectedLeaderOption,
      };

      if (isAlreadyHasSchedule) {
        setIsLoading(true);
        editGroupRegisterSchedule(mockParamsGroupingId, mockParams).then(
          (data) => {
            console.log("editGroupRegisterSchedule", data);
            setGroupingId(data.data.id);

            setIsLoading(false);
            toast({
              title: "Chỉnh sửa lịch đăng ký nhóm thành công.",
              variant: "success",
              duration: 3000,
            });
          }
        );

        setIsEditting(false);
      } else {
        setIsLoading(true);
        createGroupRegisterSchedule(mockParams).then((data) => {
          console.log("createGroupRegisterSchedule", data);
          setGroupingId(data.data.id);

          setIsLoading(false);
          toast({
            title: "Tạo lịch thành công.",
            description: `Đăng ký nhóm sẽ diễn ra vào ngày ${format(
              dateStart ?? "",
              "dd/MM/yyyy"
            )}`,
            variant: "success",
            duration: 3000,
          });
        });
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  const validate = () => {
    const newErrorList = [...errorList];
    let isNotValid = false;

    if (!dateStart || !dateEnd || dateEnd < dateStart) {
      newErrorList[0].value = true; // Ngày bắt đầu và kết thúc không hợp lệ
      isNotValid = true;
    } else {
      newErrorList[0].value = false; // Hợp lệ
    }

    if (minMember == "" || maxMember == "") {
      newErrorList[1].value = true; // Số lượng thành viên không hợp lệ
      isNotValid = true;
    } else {
      newErrorList[1].value = false;
    }

    if (isNaN(parseInt(minMember)) || isNaN(parseInt(maxMember))) {
      newErrorList[2].value = true;
      isNotValid = true;
      return isNotValid;
    } else {
      newErrorList[2].value = false;
    }

    if (
      parseInt(minMember) == 0 ||
      parseInt(maxMember) == 0 ||
      parseInt(minMember) > parseInt(maxMember)
    ) {
      newErrorList[3].value = true;
      isNotValid = true;
    } else {
      newErrorList[2].value = false;
    }
    console.log("newErrorList", newErrorList);

    setErrorList(newErrorList); // Cập nhật trạng thái errorList

    return isNotValid;
  };

  const { toast } = useToast();

  const handleClickCreateSchedule = () => {
    setIsToggleCreateSchedule(!isToggleCreateSchedule);
  };

  const handleClickViewTable = () => {
    setIsToggleViewTable(!isToggleViewTable);
  };

  const handleChangeMinMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinMember(e.target.value);
  };

  const handleChangeMaxMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMember(e.target.value);
  };

  return (
    <div>
      {isLoading ? <LoadingComponent /> : null}
      <ToggleTitle
        text="Lịch đăng ký nhóm"
        isActive={isAlreadyHasSchedule}
        showStatus
        showEditButton={isAlreadyHasSchedule}
        handleEdit={() => {
          setIsEditting(true);
        }}
        handleClick={handleClickCreateSchedule}
        value={isToggleCreateSchedule}
      />

      {isToggleCreateSchedule ? (
        isAlreadyHasSchedule && !isEditting ? (
          <div className="px-6 ">
            <div className="flex w-full flex-col gap-10">
              {/* //TODO: CUSTOM FORM FIELD */}
              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Thời hạn:
                  <span className="ml-2 body-regular">
                    {dateStart
                      ? format(dateStart, "dd/MM/yyyy")
                      : "Ngày bắt đầu"}{" "}
                    -{" "}
                    {dateEnd ? format(dateEnd, "dd/MM/yyyy") : "Ngày kết thúc"}
                  </span>
                </label>

                <p className="text-[0.8rem] dark:text-slate-400 body-regular mt-2.5 text-light-500">
                  Thời hạn sinh viên được phép đăng ký nhóm.
                </p>
              </div>

              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Số lượng thành viên nhóm{" "}
                  <span className="ml-2 mr-2 body-regular w-auto flex-shrink-0">
                    Tối thiểu: {minMember}
                  </span>
                  {" - "}
                  <span className="ml-2 body-regular w-auto flex-shrink-0">
                    Tối đa: {maxMember}
                  </span>
                </label>
              </div>

              <CheckboxComponent
                handleClick={() => {
                  setSelectedLeaderOption(!selectedLeaderOption);
                }}
                value={selectedLeaderOption}
                text="Nhóm có nhóm trưởng"
              />
            </div>
          </div>
        ) : (
          <div className="px-6 ">
            <div className="flex w-full flex-col gap-10">
              {/* //TODO: CUSTOM FORM FIELD */}
              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Thời hạn <span className="text-red-600">*</span>
                </label>

                <div className="mt-3.5 flex gap-4 items-center">
                  <div className="w-1/4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full flex items-center text-center font-normal ${
                            !dateStart && "text-muted-foreground"
                          } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                        >
                          <span
                            className={`flex-grow text-center ${
                              !dateStart && "text-muted-foreground"
                            }`}
                          >
                            {dateStart
                              ? format(dateStart, "dd/MM/yyyy")
                              : "Ngày bắt đầu"}
                          </span>
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateStart}
                          onSelect={setDateStart}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <span> - </span>
                  <div className="w-1/4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full flex items-center text-center font-normal ${
                            !dateEnd && "text-muted-foreground"
                          } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                        >
                          <span
                            className={`flex-grow text-center ${
                              !dateEnd && "text-muted-foreground"
                            }`}
                          >
                            {dateEnd
                              ? format(dateEnd, "dd/MM/yyyy")
                              : "Ngày kết thúc"}
                          </span>
                          <CalendarIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateEnd}
                          onSelect={setDateEnd}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <p className="text-[0.8rem] dark:text-slate-400 body-regular mt-2.5 text-light-500">
                  Thời hạn sinh viên được phép đăng ký nhóm.
                </p>

                {/* //! ERROR */}
                {errorList[0].value ? (
                  <p className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500">
                    {errorList[0].content}
                  </p>
                ) : (
                  <></>
                )}
              </div>

              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Số lượng thành viên nhóm{" "}
                  <span className="text-red-600">*</span>
                </label>

                <div className="mt-3.5 flex gap-6">
                  <div className="flex gap-2 w-1/3 items-center">
                    <span className="body-regular w-auto flex-shrink-0">
                      Tối thiểu
                    </span>
                    <Input
                      value={minMember}
                      onChange={handleChangeMinMember}
                      name="minMembers"
                      placeholder="Nhập số lượng..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                    />
                  </div>
                  <div className="flex gap-2 w-1/3 items-center">
                    <p className="body-regular w-auto flex-shrink-0">Tối đa</p>
                    <Input
                      value={maxMember}
                      onChange={handleChangeMaxMember}
                      name="maxMembers"
                      placeholder="Nhập số lượng..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                    />
                  </div>
                </div>

                {/* //! ERROR */}
                {errorList.map((item, index) => {
                  if (index != 0 && item.id && item.value)
                    return (
                      <p
                        key={`${index}_${item.id}`}
                        className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500"
                      >
                        {item.content}
                      </p>
                    );
                })}
              </div>

              <CheckboxComponent
                handleClick={() => {
                  setSelectedLeaderOption(!selectedLeaderOption);
                }}
                value={selectedLeaderOption}
                text="Nhóm có nhóm trưởng"
              />
            </div>
          </div>
        )
      ) : null}

      <div className="flex mx-6 mt-12 gap-2">
        {!isAlreadyHasSchedule || (isAlreadyHasSchedule && isEditting) ? (
          <SubmitButton
            text="Lưu lịch đăng ký nhóm"
            otherClasses="w-fit"
            onClick={handleSubmit}
          />
        ) : null}
        {isAlreadyHasSchedule && isEditting ? (
          <IconButton
            bgColor="bg-gray-500"
            text="Hủy"
            onClick={() => {
              setIsEditting(false);
            }}
          />
        ) : null}
      </div>

      <div className="mt-10">
        <ToggleTitle
          text="Danh sách nhóm"
          handleClick={handleClickViewTable}
          value={isToggleViewTable}
        />
      </div>

      {isToggleViewTable ? (
        dataTable && dataTable.filter((item) => !item.isDeleted).length > 0 ? (
          <div>
            <RegisterGroupTable
              dataTable={dataTable}
              isEditTable={isEditTable}
              isMultipleDelete={isMultipleDelete}
              // @ts-ignore
              onClickEditTable={() => {
                setIsEditTable(true);
              }}
              onSaveEditTable={(localDataTable) => {
                console.log("here");
                setIsEditTable(false);
                // set lại data import hoặc patch API
                localDataTable = localDataTable as RegisterGroupDataItem[];
                setDataTable(localDataTable);
              }}
              onClickMultipleDelete={() => {
                setIsMultipleDelete(true);
              }}
              onClickDeleteAll={() => {
                setDataTable((prevData) => {
                  if (prevData)
                    return prevData.map((item) => ({
                      ...item,
                      isDeleted: true,
                    }));
                });

                toast({
                  title: "Xóa thành công",
                  description: `Tất cả nhóm đã được xóa.`,
                  variant: "success",
                  duration: 3000,
                });
              }}
              onClickDelete={(itemsSelected: string[]) => {
                // ? DELETE THEO MÃ LỚP
                setDataTable((prevData) => {
                  if (prevData)
                    return prevData.map((item) => {
                      if (itemsSelected.includes(item.data["Mã nhóm"].toString())) {
                        return {
                          ...item,
                          isDeleted: true,
                        };
                      }
                      return item;
                    });
                });

                toast({
                  title: "Xóa thành công",
                  description: `${`Các lớp ${itemsSelected.join(
                    ", "
                  )} đã được xóa.`}`,
                  variant: "success",
                  duration: 3000,
                });
              }}
              onClickGetOut={() => {
                setIsMultipleDelete(false);
              }}
              onClickCancelEdit={() => {
                setIsEditTable(false);
              }}
            />
          </div>
        ) : (
          <NoResult
            title="Không có dữ liệu!"
            description="🚀 Chưa có nhóm nào được đăng ký."
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageGroup;
