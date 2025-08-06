import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                   totalPages,
                                                                   currentPage,
                                                                   onPageChange,
                                                               }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </Button>

            <span className="text-sm text-gray-700">
        Página {currentPage} de {totalPages}
      </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </Button>
        </div>
    );
};

export default PaginationControls;
