"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";

export const fetchDetailProject = async (projectId: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/projects/${projectId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["detail-project"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchDetailProject failed:", error);
    throw error;
  }
};
