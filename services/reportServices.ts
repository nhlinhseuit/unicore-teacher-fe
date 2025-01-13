"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const createReport = async (data: any) => {
  console.log("createReport");
  console.log("data", data);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/reports`,
    method: "POST",
    body: { ...data },
  });

  revalidateTag("create-report");

  return res;
};

export const editReport = async (reportId: string, data: any) => {
  console.log("editReport");
  console.log("data", data);

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/reports/${reportId}`,
    method: "PUT",
    body: { ...data },
  });

  revalidateTag("list-reports");

  return res;
};

export const fetchDetailReport = async (reportId: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/reports/${reportId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["detail-report"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchDetailReport failed:", error);
    throw error;
  }
};
