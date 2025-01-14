"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export const fetchReviewsInClass = async (data: any) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/submissions/review/class`,
      method: "POST",
      body: { ...data },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchReviews failed:", error);
    throw error;
  }
};

export const fetchReviewsOfTeacher = async (data: any) => {
  try {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/submissions/review/class`,
      method: "POST",
      body: { ...data },
    });

    if (res?.data) {
      return res.data;
    } else {
      throw new Error("Data format error: 'data' field is missing.");
    }
  } catch (error) {
    console.error("fetchReviews failed:", error);
    throw error;
  }
};

export const gradeAReview = async (reviewId: string, data: any) => {
  console.log("gradeAReview");
  console.log("data", data);

  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/submissions/review/${reviewId}`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("grade-review");

  return res;
};

export const declineAReview = async (reviewId: string, data: any) => {
  console.log("gradeAReview");
  console.log("data", data);

  // const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/classevent/submissions/review/${reviewId}/turn-down`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });
  revalidateTag("grade-review");

  return res;
};


