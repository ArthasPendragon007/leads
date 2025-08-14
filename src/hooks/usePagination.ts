import {useMemo} from "react";

interface UsePaginationProps {
    totalPages: number;
    currentPage: number;
    maxVisiblePages?: number;
    edgeCount?: number;
}

const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const usePagination = ({
                                  totalPages,
                                  currentPage,
                                  maxVisiblePages = 7,
                                  edgeCount = 4,
                              }: UsePaginationProps) => {

    const pageNumbers = useMemo((): (number | string)[] => {
        if (totalPages <= 1) return [];

        if (totalPages <= maxVisiblePages) {
            return range(1, totalPages);
        }

        const isStart = currentPage <= edgeCount;
        const isEnd = currentPage >= totalPages - (edgeCount - 1);

        if (isStart) {
            return [...range(1, edgeCount + 1), "...", totalPages];
        }

        if (isEnd) {
            return [1, "...", ...range(totalPages - edgeCount, totalPages)];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    }, [totalPages, currentPage, maxVisiblePages, edgeCount]);

    return { pageNumbers };
};