"use client";

import { motion } from "framer-motion";

export default function StringSkeleton({
    className = "",
    from = 300,
    to = 400,
}: {
    className?: string;
    from?: number;
    to?: number;
}) {
    return (
        <motion.div
            className={`h-9 ${className} bg-secondary-100`}
            initial={{ width: 0 }}
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
