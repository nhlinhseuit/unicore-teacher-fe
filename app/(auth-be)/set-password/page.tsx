"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    //           Set a password
    //         </p>
    //         <p className="mt-4 ml-2 text-[16px] text-[#112211] font-medium leading-[24px]">
    //           Your previous password has been reseted. Please set a new password
    //           for your account.
    //         </p>
    //       </div>

    //       <div className="w-full">
    //         <MyPasswordInput
    //           label="Create Password"
    //           placeholder="Create Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           validate={validatePassword}
    //         />
    //       </div>

    //       <div className="w-full">
    //         <MyPasswordInput
    //           label="Re-enter Password"
    //           placeholder="Re-enter Password"
    //           value={passwordConfirm}
    //           onChange={(e) => setPasswordConfirm(e.target.value)}
    //           validate={(value) => validateConfirmPassword(password, value)}
    //         />
    //       </div>

    //       <div className=" w-full flex flex-col gap-6">
    //         <button className="w-full flex justify-center items-center rounded-md gap-x-1 px-4 py-3 bg-primary-100 ">
    //           <p className="body-semibold text-black">Set password</p>
    //         </button>
    //       </div>

    //       <div className="h-20 w-full flex flex-col gap-6"></div>
    //     </div>

    //     {/* //TODO: RIGHT */}

    //     <div className="flex flex-grow items-center justify-center">
    //       <One />
    //     </div>
    //   </div>
    // </main>
};

export default page;
