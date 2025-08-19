"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedBlurNumberProps {
    value: string | number;
}

export const AnimatedBlurNumber: React.FC<AnimatedBlurNumberProps> = ({ value }) => {
    return (
        <motion.span
            key={String(value)}
            initial={{ filter: "blur(10px)", opacity: 0, scale: 0.9 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
        >
            {value}
        </motion.span>
    );
};