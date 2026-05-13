import { Button, Stack, Text } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu"


type PaginationControlsProps = {
    page: number
    totalPages: number
    total: number
    onPageChange: (page: number) => void
}

const PaginationControls = ({
    page,
    totalPages,
    total,
    onPageChange,
}: PaginationControlsProps) => {

    const limit = 10;

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);


    if (totalPages < 10) return null;

    return (
        <div className="flex flex-col md:flex-row items-center justify-end gap-4! md:gap-8! mt-6!">

            <Text fontSize="sm" color="fg.muted">
                {/* page {page} of {totalPages} */}
                {`${start} - ${end}`} of {total}
            </Text>

            <Stack direction={'row'}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={page === 1}
                >
                    <LuChevronsLeft />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    <LuChevronLeft />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    <LuChevronRight />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    disabled={page === totalPages}
                >
                    <LuChevronsRight />
                </Button>
            </Stack>


        </div>

    )
}

export default PaginationControls