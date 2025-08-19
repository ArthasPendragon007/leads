"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    const getNextTheme = (currentTheme: string | undefined): string => {
        switch (currentTheme) {
            case "light":
                return "dark";
            case "dark":
                return "system";
            case "system":
            default:
                return "light";
        }
    };

    const toggleTheme = () => {
        setTheme(getNextTheme(theme));
    };

    const getIcon = (currentTheme: string | undefined) => {
        switch (currentTheme) {
            case "light":
                return <Sun key="sun" className="h-4 w-4" />;
            case "dark":
                return <Moon key="moon" className="h-4 w-4" />;
            case "system":
            default:
                return <Monitor key="monitor" className="h-4 w-4" />;
        }
    };

    if (!isMounted) {
        return (
            <Button variant="outline" size="icon">
                <Monitor className="h-4 w-4" />
                <span className="sr-only">Alternar tema</span>
            </Button>
        );
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative overflow-hidden transition-colors"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                >
                    {getIcon(theme)}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Alternar tema</span>
        </Button>
    );
}