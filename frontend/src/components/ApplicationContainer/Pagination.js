import { Pagination, PaginationItem } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CurrentPagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: '#08ff00',
                            color: '#fff',
                        },
                        '&:hover': {
                            backgroundColor: '#ffb74d',
                        },
                    }}
                    {...item}
                />
            )}
        />
    );
};

export {CurrentPagination};



