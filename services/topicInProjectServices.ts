"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchTopicRegisterSchedule = async (groupingId: string) => {
  try {
    //TODO: có thể bỏ type ISubject vào any ở đây
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/grouping/${groupingId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-group-register"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchGroupRegisterData failed:", error);
    throw error;
  }
};

export const handleCreateTopicAction = async (projectId: string, data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/projects/${projectId}/topics/import`,
    method: "PUT",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("list-topics");

  return res;
};


export const fetchTopicsInProject = async (projectId: string) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/projects/${projectId}/topics`,
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
  });
  revalidateTag("list-topics");

  return res;
};

export const handleCreateTopicScheduleAction = async (id: string, data: any) => {
  console.log('data:::', data);
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/projects/${id}/topics/schedule`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: {...data}
  });
  revalidateTag("list-topics");
  console.log('res:::', res);

  return res;
};
