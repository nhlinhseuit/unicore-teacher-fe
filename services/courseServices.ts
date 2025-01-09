"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchCourses = async () => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom`,
      method: "GET",
      nextOption: {
        next: { tags: ["list-classroom"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchCourses failed:", error);
    throw error;
  }
};

export const handleCreateCourseAction = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classroom/bulk`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("list-classroom");

  return res;
};

// export const handleUpdateCourseAction = async (data: any) => {
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
//   revalidateTag('list-classroom');

//   return res;
// };

// export const handleDeleteCourseAction = async (id: any) => {
//
//   const res = await sendRequest<IBackendRes<any>>({
//     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/users/${id}`,
//     method: 'DELETE',
//     // headers: {
//     //   Authorization: `Bearer ${session?.user?.access_token}`,
//     // },
//   });
//   revalidateTag('list-classroom');
//   return res;
// };
