import {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {orderActions} from "../../redux/slices/ordersSlice";


const Pagination: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const page = useAppSelector((state) => state.orders.current_page);
    const totalPages = useAppSelector((state) => state.orders.pagination?.total_pages ?? 1);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageUrl = queryParams.get("page");

        if (pageUrl) {
            dispatch(orderActions.getAll(Number(pageUrl)));
        }
    }, [dispatch, location.search]);

    const prevPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            dispatch(orderActions.getAll(newPage));
            navigate(`?page=${newPage}`);
        }
    };

    const nextPage = () => {
        if (page < totalPages) {
            const newPage = page + 1;
            dispatch(orderActions.getAll(newPage));
            navigate(`?page=${newPage}`);
        }
    };

    return (
        <div>
            <button onClick={prevPage} disabled={page <= 1}>
                Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={nextPage} disabled={page >= totalPages}>
                Next
            </button>
        </div>
    );
};

export {Pagination};
