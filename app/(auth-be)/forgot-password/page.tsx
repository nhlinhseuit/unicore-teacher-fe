"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const router = useRouter();

  return <div></div>
    // <main>
    //   <div className="w-full h-screen flex gap-12">
    //     <div className="flex-grow flex flex-col items-start justify-center gap-10">
    //       <Image
    //         src="/assets/images/site-logo.svg"
    //         width={80}
    //         height={80}
    //         alt="DevFlow"
    //         className="mb-6"
    //       />
    //       <div>
    //         <BackToPrev text={"Back to login"} linkPrev="/login" />
    //         <p className="text-[34px] font-semibold leading-[40px]">
    //           Forgot your password?
    //         </p>
    //         <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
    //           Don’t worry, happens to all of us. Enter your email below to
    //           recover your password
    //         </p>
    //       </div>

    //       <div className="w-full">
    //         <MyInput
    //           type="text"
    //           label="Email"
    //           placeholder="dev.hoanglinh@gmail.com"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           validate={validateEmail}
    //         />
    //       </div>

    //       <div className="w-full flex flex-col gap-6">
    //         <button className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 ">
    //           <p className="body-semibold text-black">Submit</p>
    //         </button>
    //       </div>

    //       {/* <div className="w-full flex items-center">
    //         <div className="flex-grow bg-gray-300 h-[1px]"></div>

    //         <p className="mx-4 bg-white px-2 text-[14px] text-gray-500 font-medium leading-[24px]">
    //           Or login with
    //         </p>

    //         <div className="flex-grow bg-gray-300 h-[1px]"></div>
    //       </div> */}
    //     </div>

    //     {/* //TODO: RIGHT */}

    //     <div className="flex flex-grow items-center justify-center">
    //       <One />
    //     </div>
    //   </div>
    // </main>
};

export default page;
