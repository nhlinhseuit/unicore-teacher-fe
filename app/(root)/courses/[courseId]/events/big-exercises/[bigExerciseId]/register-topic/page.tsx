"use client";

import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import NoResult from "@/components/shared/Status/NoResult";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { mockDataStudentRegisterTopic } from "@/mocks";
import { RegisterTopicDataItem } from "@/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterTopic = () => {
  const router = useRouter();
  const isMainGroupExisted = false;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToggleCreateSchedule, setIsToggleCreateSchedule] = useState(true);
  const [isToggleViewTable, setIsToggleViewTable] = useState(true);
  const [isUseExistedGroup, setIsUseExistedGroup] = useState(1);

  const [minMember, setMinMember] = useState("");
  const [maxMember, setMaxMember] = useState("");
  const [selectedLeaderOption, setSelectedLeaderOption] = useState(false);

  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const [errorList, setErrorList] = useState([
    {
      id: "1",
      content:
        "Bạn phải chọn ngày bắt đầu và ngày kết thúc. Ngày kết thúc phải sau ngày bắt đầu.",
      value: false,
    },
    {
      id: "2",
      content: "Số lượng thành viên nhóm tối thiểu và tối đa.",
      value: false,
    },
    { id: "3", content: "Số lượng thành viên phải là chữ số.", value: false },
    {
      id: "4",
      content: "Số lượng tối thiểu phải nhỏ hơn số lượng tối đa và khác 0.",
      value: false,
    },
    {
      id: "5",
      content: "Không có nhóm chính, phải tạo nhóm mới.",
      value: false,
    },
  ]);

  const handleClickViewTable = () => {
    setIsToggleViewTable(!isToggleViewTable);
  };

  const handleClickCreateSchedule = () => {
    setIsToggleCreateSchedule(!isToggleCreateSchedule);
  };

  const handleChangeMinMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinMember(e.target.value);
  };

  const handleChangeMaxMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMember(e.target.value);
  };

  const validate = () => {
    const newErrorList = [...errorList];
    let isNotValid = false;

    if (!isMainGroupExisted && isUseExistedGroup === 1) {
      newErrorList[4].value = true; // Không có nhóm chính nên không thể sử dụng nhóm chính cũ
      isNotValid = true;
    }

    if (!dateStart || !dateEnd || dateEnd < dateStart) {
      newErrorList[0].value = true; // Ngày bắt đầu và kết thúc không hợp lệ
      isNotValid = true;
    } else {
      newErrorList[0].value = false; // Hợp lệ
    }

    if (isUseExistedGroup === 2) {
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
    }

    setErrorList(newErrorList); // Cập nhật trạng thái errorList

    return isNotValid;
  };

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
      console.log({
        dateStart: dateStart,
        dateEnd: dateEnd,
        minMembers: minMember,
        maxMembers: maxMember,
      });

      // naviate to home page
      router.push("/");

      toast({
        title: "Tạo lịch thành công.",
        description: `Đăng ký nhóm sẽ diễn ra vào ngày ${format(
          dateStart ?? "",
          "dd/MM/yyyy"
        )}`,
        variant: "success",
        duration: 3000,
      });
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<RegisterTopicDataItem[]>(
    mockDataStudentRegisterTopic
  );

  return (
    <>
      <ToggleTitle
        text="Lịch đăng ký đề tài"
        showStatus
        showEditButton
        handleClick={handleClickCreateSchedule}
        value={isToggleCreateSchedule}
      />

      {isToggleCreateSchedule ? (
        <div className="flex px-6 gap-12">
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
                Thời hạn sinh viên được phép đăng ký đề tài.
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
                Tùy chọn nhóm <span className="text-red-600">*</span>
              </label>

              <BorderContainer otherClasses="mt-3.5">
                <div className="p-4 flex flex-col gap-10">
                  <div>
                    <RadioboxComponent
                      id={1}
                      handleClick={() => {
                        setIsUseExistedGroup(1);
                      }}
                      value={isUseExistedGroup}
                      text="Sử dụng nhóm chính"
                    />
                    {/* //! ERROR */}
                    {errorList[4].value ? (
                      <p className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500">
                        {errorList[4].content}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <RadioboxComponent
                      id={2}
                      handleClick={() => {
                        setIsUseExistedGroup(2);
                      }}
                      value={isUseExistedGroup}
                      text="Tạo nhóm mới"
                    />
                    <p className="text-[0.8rem] dark:text-slate-400 body-regular mt-4 text-light-500">
                      Nhóm cho bài tập lớn được tạo cũng sẽ là nhóm chính nếu
                      lớp chưa chia nhóm.
                    </p>
                  </div>

                  {isUseExistedGroup === 2 ? (
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
                          <p className="body-regular w-auto flex-shrink-0">
                            Tối đa
                          </p>
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
                        if (index != 0 && index != 4 && item.value)
                          return (
                            <p
                              key={`${index}_${item.id}`}
                              className="mt-3.5 text-[0.8rem] font-medium dark:text-red-900 text-red-500"
                            >
                              {item.content}
                            </p>
                          );
                      })}

                      <div className="mt-10">
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
                    <></>
                  )}
                </div>
              </BorderContainer>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="mt-10">
        <ToggleTitle
          text="Danh sách đăng ký đề tài"
          handleClick={handleClickViewTable}
          value={isToggleViewTable}
        />
      </div>

      {isToggleViewTable ? (
        dataTable.filter((item) => !item.isDeleted).length > 0 ? (
          <RegisterTopicTable
            type={RegisterTopicTableType.registerTopic}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            // @ts-ignore
            dataTable={dataTable}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              console.log("here");
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as RegisterTopicDataItem[];
              setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              setDataTable((prevData) => {
                return prevData.map((item) => ({
                  ...item,
                  isDeleted: true,
                }));
              });

              toast({
                title: "Xóa thành công",
                description: `Đã xóa tất cả lớp học`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MÃ LỚP
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.STT.toString())) {
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
          />
        ) : (
          <NoResult
            title="Không có dữ liệu!"
            description="🚀 Chưa có đề tài nào được đăng ký."
          />
        )
      ) : (
        <></>
      )}

      <div className="flex mt-12 gap-2">
        <SubmitButton text="Đăng" otherClasses="w-fit" onClick={handleSubmit} />

        <IconButton text="Hủy" red otherClasses="w-fit" onClick={() => {}} />
      </div>
    </>
  );
};

export default RegisterTopic;
