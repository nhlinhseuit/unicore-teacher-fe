"use client";

import { motion } from "framer-motion";

export default function StringSkeleton({
    className = "",
    from = 80,
    to = 200,
}: {
    className?: string;
    from?: number;
    to?: number;
}) {
    return (
        <motion.div
            className={`h-6 ${className} background-light800_darkgradient rounded-md`}
            initial={{ width: 60 }}
            animate={{
                width: Math.floor(Math.random() * (to - from) + from),
            }}
            transition={{
                ease: "easeOut",
                duration: 0.5,
            }}
        />
    );
}
