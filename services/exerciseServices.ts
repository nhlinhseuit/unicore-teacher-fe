"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const createExercise = async (data: any) => {
  console.log("createExercise");
  console.log("data", data);

  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/homework`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });

  revalidateTag("create-exercise");

  return res;
};

export const editExercise = async (exerciseId: string, data: any) => {
  console.log('editExercise')
  console.log("data", data);
  
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/homework/${exerciseId}`,
    method: "PUT",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("list-subjects");

  return res;
};

export const fetchInValidExercises = async (data: any) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/homework`,
      method: "POST",
      body: { ...data },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchExercises failed:", error);
    throw error;
  }
};

export const fetchExercises = async (data: any) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/homework/class`,
      method: "POST",
      body: { ...data },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchExercises failed:", error);
    throw error;
  }
};

export const fetchDetailExercise = async (exerciseId: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/homework/${exerciseId}`,
      method: "GET",
      nextOption: {
        next: { tags: ["detail-exercise"] },
      },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchDetailExercises failed:", error);
    throw error;
  }
};




export const fetchAnnoucements = async (classId: string) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/class`,
      method: "GET",
      queryParams: { class_id: classId },
      nextOption: {
        next: { tags: ["list-annoucements"] },
      },
    });

    if (res?.data) {
      console.log("res.data::", res);
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchAnnoucements failed:", error);
    throw error;
  }
};