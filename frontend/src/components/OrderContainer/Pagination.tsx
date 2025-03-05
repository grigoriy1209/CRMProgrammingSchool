import {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {orderActions} from "../../redux/slices/ordersSlice";
import {Pagination as MUIButtonPagination, PaginationItem} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

const Pagination: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const page = useAppSelector((state) => state.orders.current_page);
    const totalPages = useAppSelector((state) => state.orders.pagination?.total_pages ?? 1);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageUrl = Number(queryParams.get("page") || 1)

        if (page !== pageUrl) {
            dispatch(orderActions.getAll(pageUrl));
        }
    }, [dispatch, location.search, page]);

    return (
        <MUIButtonPagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => {
                if (newPage !== page) {
                    dispatch(orderActions.getAll(page));
                    navigate(`?page=${newPage}`);
                }

            }}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    slots={{
                        previous: ArrowBack,
                        next: ArrowForward
                    }}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: '#08ff00',
                            color: '#fff',
                        },
                        '&:hover': {
                            backgroundColor: '#ffb74d',
                        },
                    }}
                />
            )}
        />
    );
};

export {Pagination};
