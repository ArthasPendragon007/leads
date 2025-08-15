// components/PaginationControls.tsx
"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import React from "react";
import {motion} from "framer-motion";
import {usePagination} from "@/hooks/usePagination";

const MotionPaginationLink = motion(PaginationLink);

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                   totalPages,
                                                                   currentPage,
                                                                   onPageChange
                                                               }) => {
    const { pageNumbers } = usePagination({ totalPages, currentPage });

    if (totalPages <= 1) return null;

    // Classes de botão comuns para Anterior e Próximo
    const buttonBaseClasses = `cursor-pointer rounded-full text-gray-700 h-8 px-3 hover:bg-gray-200 transition-colors duration-200`;

    return (
        <div className="flex justify-center mt-6">
            <Pagination className="flex items-center">
                <PaginationContent
                    className="flex items-center gap-4 bg-gray-100 p-2 rounded-full w-fit shadow-sm"
                >
                    {/* Botão Anterior */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                            className={`${buttonBaseClasses} ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                        />
                    </PaginationItem>

                    {/* Páginas */}
                    {pageNumbers.map((page, index) =>
                        page === "..." ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis className="text-gray-500" />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={page}>
                                <MotionPaginationLink
                                    onClick={() => onPageChange(Number(page))}
                                    isActive={Number(page) === currentPage}
                                    layoutId={Number(page) === currentPage ? "active-pill" : undefined}
                                    className={`
                                        cursor-pointer
                                        w-8 h-8 flex items-center justify-center rounded-full text-sm
                                        transition-all duration-200
                                        ${Number(page) === currentPage
                                        ? "bg-white text-black font-bold shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                    }
                                    `}
                                >
                                    {page}
                                </MotionPaginationLink>
                            </PaginationItem>
                        )
                    )}

                    {/* Botão Próximo */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                            className={`${buttonBaseClasses} ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationControls;