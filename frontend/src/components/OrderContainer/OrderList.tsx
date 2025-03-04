import {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {orderActions} from "../../redux/slices/ordersSlice";

const OrdersList: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const orders = useAppSelector((state) => state.orders.orders);
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
            <h2>Список заявок</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <h3>{order.name} {order.surname}</h3>
                        <p>Email: {order.email || "Не вказано"}</p>
                        <p>Телефон: {order.phone || "Не вказано"}</p>
                        <p>Вік: {order.age}</p>
                        <p>Курс: {order.course}</p>
                        <p>Тип курсу: {order.course_type}</p>
                        <p>Формат курсу: {order.course_format}</p>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={prevPage} disabled={page <= 1}>
                    Попередня
                </button>
                <span>Сторінка {page} з {totalPages}</span>
                <button onClick={nextPage} disabled={page >= totalPages}>
                    Наступна
                </button>
            </div>
        </div>
    );
};

export {
    OrdersList
};
