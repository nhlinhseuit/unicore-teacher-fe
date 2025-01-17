"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { formatDayToISO } from "@/utils/dateTimeUtil";
import { revalidateTag } from "next/cache";

//TODO: RegisterSchedule

export const fetchGroupRegisterSchedule = async (groupingId: string) => {
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

export const createGroupRegisterSchedule = async (data: any) => {
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/grouping/class`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("create-group-register");

  return res;
};

export const editGroupRegisterSchedule = async (groupingId: string, data: any) => {
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/grouping/${groupingId}`,
    method: "PUT",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("edit-group-register");

  return res;
};


//TODO: GroupRegister


export const editGroup = async (data: any) => {
  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/grouping/add`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("create-group-register");

  return res;
};



