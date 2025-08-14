import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
    loading: boolean;
    fullScreen?: boolean;
}

export function LoadingOverlay({ loading, fullScreen = false }: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loading-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`absolute inset-0 flex items-center justify-center 
            bg-white/80 backdrop-blur-sm z-50 
            ${fullScreen ? "fixed" : ""}`}
                >
                    <motion.div
                        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
