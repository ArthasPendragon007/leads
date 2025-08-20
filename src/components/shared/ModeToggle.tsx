"use client";

import {useIsMounted} from "@/hooks/useIsMounted";
import {useTheme} from "next-themes";
import {JSX, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Monitor, Moon, Sun} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const isMounted = useIsMounted();
    const [isHovering, setIsHovering] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const cycleTheme = (current?: string) =>
        current === "light" ? "dark" : current === "dark" ? "system" : "light";

    const icons: Record<string, JSX.Element> = {
        light: <Sun key="sun" className="h-4 w-4" />,
        dark: <Moon key="moon" className="h-4 w-4" />,
        system: <Monitor key="monitor" className="h-4 w-4" />,
    };

    const handleClick = () => {
        setTheme(cycleTheme(theme));
        setIsHovering(false);

        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setIsHovering(true), 500);
    };

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };

    if (!isMounted) {
        return (
            <Button variant="outline" size="icon">
                {icons["light"]}
                <span className="sr-only">Alternar tema</span>
            </Button>
        );
    }

    const nextTheme = cycleTheme(theme);
    const displayedTheme = isHovering ? nextTheme : theme ?? "system";

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden transition-colors cursor-pointer"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={displayedTheme}
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                >
                    {icons[displayedTheme]}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Alternar tema</span>
        </Button>
    );
}