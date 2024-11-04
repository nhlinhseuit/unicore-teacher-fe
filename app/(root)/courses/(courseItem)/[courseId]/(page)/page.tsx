"use client";

import CourseDetail from "@/components/courses/CourseDetail";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  // ! Get ID từ param, muốn truyền cả object qua route mới thì sd Context / Redux
  const params = useParams() as { courseId: string };
  const { courseId } = params;

  return (
    <>
      
    </>
  );
};

export default page;
