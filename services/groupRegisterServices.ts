"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { formatDayToISO } from "@/utils/dateTimeUtil";
import { revalidateTag } from "next/cache";

export const fetchGroupRegisterData = async () => {
  try {
    //TODO: có thể bỏ type ISubject vào any ở đây
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom/grouping`,
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
  console.log("createGroupRegisterSchedule");
  console.log("data", data);

  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom/grouping`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    // body: { ...data },
    body: {
      class_id: "6728d58b38829046d82ccc3c",
      subclass_code: "IT006.CLC",
      start_register_date: "2025-01-18T06:00:00",
      end_register_date: "2025-01-24T06:00:00",
      has_leader: true,
      max_size: "4",
      min_size: "1",
      create_subclass: false,
      groups: [],
    },
  });
  revalidateTag("create-group-register");

  return res;
};

// export const handleUpdateSubjectAction = async (data: any) => {
//   const { id, ...rest } = data; // Separate id from the rest of the data

//   // Send the PATCH request to update supplier by ID in the URL path
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`, // Include ID directly in the path
//     method: 'PATCH',
//     body: { ...rest },
//     // headers: {
//     //   Authorization: `Bearer ${session?.user?.access_token}`, // Uncomment if authentication is needed
//     // },
//   });

//   // Revalidate to update the list view if necessary
//   revalidateTag('list-subjects');

//   return res;
// };

// export const handleDeleteSubjectAction = async (id: any) => {
//   // const session = await auth();
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`,
//     method: 'DELETE',
//     // headers: {
//     //   Authorization: `Bearer ${session?.user?.access_token}`,
//     // },
//   });
//   revalidateTag('list-subjects');
//   return res;
// };
