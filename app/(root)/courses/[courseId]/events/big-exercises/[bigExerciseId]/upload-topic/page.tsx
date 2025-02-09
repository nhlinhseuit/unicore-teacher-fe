"use client";
import TitleDescription from "@/components/shared/TitleDescription";
import UploadTopicResult from "./(UploadTopicResult)/UploadTopicResult";
import { useEffect, useState } from "react";
import {
  formatISOToDayDatatype,
  isDateBeforeToday,
} from "@/utils/dateTimeUtil";
import NoResult from "@/components/shared/Status/NoResult";
import { format } from "date-fns";
import LoadingComponent from "@/components/shared/LoadingComponent";

const UploadTopic = () => {
  //! CALL API để xem là lớp thường hay lớp Khoa quản lý
  //! Chỉ hiện đăng đề tài nếu admin mở lịch đăng đề tài

  const [isLoading, setIsLoading] = useState(true);

  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();
  // parseISODateToDisplayDate

  const mockParamsStartTopicImportTime = "2025-02-01T06:00:00";
  const mockParamsEndTopicImportTime = "2025-02-28T06:00:00";

  useEffect(() => {
    //TODO thay cho startTopicImportTime
    if (mockParamsStartTopicImportTime && mockParamsEndTopicImportTime) {
      setDateStart(formatISOToDayDatatype(mockParamsStartTopicImportTime));
      setDateEnd(formatISOToDayDatatype(mockParamsEndTopicImportTime));
    }

    setIsLoading(false);
  }, []);

  return isLoading ? (
    <LoadingComponent />
  ) : dateStart && dateEnd ? (
    <div>
      <TitleDescription
        title="Đăng đề tài"
        description={[
          `Thời hạn: ${format(dateStart, "dd/MM/yyyy")} -  ${format(
            dateEnd,
            "dd/MM/yyyy"
          )}`,
        ]}
      />
      <UploadTopicResult />
    </div>
  ) : (
    <NoResult
      title="Không có dữ liệu"
      description="Hiện tại không phải thời hạn đăng đề tài"
    />
  );
};

export default UploadTopic;
