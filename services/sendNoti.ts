"use server";

import { IBackendRes } from "@/types/commonType";
import { sendRequest } from "@/utils/api";

export const feedbackTopicSendNoti = async (data: any) => {
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/mail/topics/feedback`,
    method: "POST",
    // headers: {
    //   Authorization: `Bearer ${session?.user?.access_token}`,
    // },
    body: { ...data },
  });

  return res;
};
