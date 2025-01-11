import { ReadonlyURLSearchParams } from "next/navigation";

export const extractDateAndTime = (
  isoString: string
): { date: string; time: string } | undefined => {
  if (!isoString) return undefined;

  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/; // Kiểm tra định dạng ISO 8601
  if (!dateTimeRegex.test(isoString)) return undefined;

  try {
    const dateObj = new Date(isoString); // Tạo đối tượng Date từ chuỗi ISO 8601
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");

    return {
      date: `${year}-${month}-${day}`, // Ngày theo định dạng yyyy-MM-dd
      time: `${hours}:${minutes}`, // Giờ theo định dạng HH:mm
    };
  } catch (error) {
    return undefined; // Trả về undefined nếu xảy ra lỗi
  }
};

export const convertDataNavigate = (params: any) => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        return [key, JSON.stringify(value)]; // Chuyển thành chuỗi JSON
      }
      return [key, String(value)]; // Đảm bảo mọi giá trị là chuỗi
    })
  );
};

export const convertDataReceive = (searchParams: ReadonlyURLSearchParams) => {
  return Object.fromEntries(
    Array.from(searchParams.entries()).map(([key, value]) => {
      try {
        return [key, JSON.parse(value)];
      } catch {
        return [key, value]; // Trả về giá trị ban đầu nếu không phải JSON
      }
    })
  );
};

export const isDateValid = (selectedDate: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
};

//TODO: DATETIME

//? ISO để params cho API

export const formatDayToISODateWithDefaultTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T06:00:00`;
};

export const formatDayToISO = (date: Date, time: string): string => {
  console.log("time", time);

  // Mặc định là 6h sáng nếu time rỗng
  const defaultTime = "6:00 SA";

  // Nếu time rỗng, sử dụng giá trị mặc định
  const inputTime = time || defaultTime;

  // Tách giờ và phút từ chuỗi time (hỗ trợ định dạng với SA/CH)
  const timeRegex = /^(\d{1,2}):(\d{2})\s?(SA|CH)?$/i;
  const match = inputTime.match(timeRegex);

  if (!match) {
    throw new Error(`Invalid time format: ${inputTime}`);
  }

  let [_, hourStr, minuteStr, period] = match; // Sử dụng destructuring
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  // Xử lý định dạng SA/CH
  if (period?.toUpperCase() === "CH" && hour < 12) {
    hour += 12; // Buổi chiều, cộng thêm 12 giờ
  }
  if (period?.toUpperCase() === "SA" && hour === 12) {
    hour = 0; // 12 giờ sáng chuyển thành 0 giờ
  }

  // Tạo một đối tượng Date mới với giờ và phút
  const newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour,
      minute,
      0
    )
  );

  // Chuyển đổi sang định dạng ISO, bỏ phần 'Z'
  const isoString = newDate.toISOString().split(".")[0]; // Bỏ phần mili giây
  return isoString;
};

//? Truyền ISO lấy ra kiểu Date và Time calendar để edit

export const formatISOToDayDatatype = (isoString: string): Date | undefined => {
  // Kiểm tra chuỗi ISO hợp lệ
  if (!isoString) {
    console.log("Invalid ISO string input.");
    return undefined;
  }

  // Tạo đối tượng Date từ chuỗi ISO
  const date = new Date(isoString);

  // Kiểm tra xem đối tượng Date có hợp lệ không
  if (isNaN(date.getTime())) {
    console.log(`Invalid ISO date format: ${isoString}`);
    return undefined;
  }

  return date;
};

export const formatISOToTimeCalendarType = (isoString: string): string => {
  if (!isoString) {
    console.log("Invalid ISO string input.");
    return "";
  }

  // Chuyển đổi chuỗi ISO thành đối tượng Date
  const date = new Date(isoString);

  // Lấy giờ và phút
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Xác định buổi (SA/CH)
  const period = hours >= 12 ? "CH" : "SA";

  // Định dạng giờ theo 12 giờ
  if (hours === 0) {
    hours = 12; // 12 giờ sáng
  } else if (hours > 12) {
    hours -= 12; // Buổi chiều
  }

  // Định dạng chuỗi thời gian
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
  return formattedTime;
};

//? Truyền ISO lấy ra String để hiển thị
