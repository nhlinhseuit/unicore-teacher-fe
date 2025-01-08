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

export const formatDayToISODateWithDefaultTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T06:00:00`;
};

export const formatStartDayToISO = (date: Date, time: string): string => {
  // Tách giờ và phút từ chuỗi time
  const [hours, minutes] = time.split(":").map(Number);

  // Tạo một đối tượng Date mới với cùng ngày nhưng giờ phút mới
  const newDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0)
  );

  // Chuyển đổi sang định dạng ISO, bỏ phần 'Z'
  const isoString = newDate.toISOString().split(".")[0]; // Bỏ phần mili giây
  return isoString;
};
