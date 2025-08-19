// @/components/shared/AnimatedTypingNumber.tsx
"use client";

import React, {useEffect} from "react";
import {animate, motion, useMotionValue, useTransform} from "framer-motion";

interface AnimatedNumberProps {
    value: string | number;
    tempo?: number;
}

export const AnimatedTypingNumber: React.FC<AnimatedNumberProps> = ({ value, tempo = 1, }) => {
    const numericValue = typeof value === 'number' ? value : parseFloat(String(value));
    const isValidNumber = !isNaN(numericValue);

    const count = useMotionValue(isValidNumber ? numericValue : 0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isValidNumber) {
            const controls = animate(count, numericValue, {
                duration: tempo,
                ease: [0.17, 0.67, 0.83, 0.67],
            });
            return controls.stop;
        }
    }, [value, count, numericValue, isValidNumber, tempo]);

    return (
        <>
            {isValidNumber ? (
                <motion.span>{rounded}</motion.span>
            ) : (
                <span>{value}</span>
            )}
        </>
    );
};