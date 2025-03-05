import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { orderActions } from "../../redux/slices/ordersSlice";

const OrdersList: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const orders = useAppSelector((state) => state.orders.orders);
    const page = useAppSelector((state) => state.orders.current_page);
    const totalPages = useAppSelector((state) => state.orders.pagination?.total_pages ?? 1);
    const error = useAppSelector((state) => state.orders.error);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageUrl = queryParams.get("page") || "1";

        console.log("Fetching orders for page:", pageUrl);
        dispatch(orderActions.getAll(Number(pageUrl)));
    }, [dispatch, location.search]);

    console.log("Orders:", orders);
    console.log("Page:", page, "Total Pages:", totalPages);

    const prevPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            navigate(`?page=${newPage}`);
        }
    };

    const nextPage = () => {
        if (page < totalPages) {
            const newPage = page + 1;
            navigate(`?page=${newPage}`);
        }
    };

    if (error) return <p>Помилка: {error}</p>;

    return (
        <div>
            <h2>Список заявок</h2>
            {orders.length ? (
                <>
                    <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            <th>Ім'я</th>
                            <th>Прізвище</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Вік</th>
                            <th>Курс</th>
                            <th>Тип курсу</th>
                            <th>Формат курсу</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.name}</td>
                                <td>{order.surname}</td>
                                <td>{order.email || "Не вказано"}</td>
                                <td>{order.phone || "Не вказано"}</td>
                                <td>{order.age}</td>
                                <td>{order.course}</td>
                                <td>{order.course_type}</td>
                                <td>{order.course_format}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: "10px" }}>
                        <button onClick={prevPage} disabled={page <= 1}>Попередня сторінка</button>
                        <span style={{ margin: "0 10px" }}>Сторінка {page} з {totalPages}</span>
                        <button onClick={nextPage} disabled={page >= totalPages}>Наступна сторінка</button>
                    </div>
                </>
            ) : (
                <p>Немає заявок для відображення.</p>
            )}
        </div>
    );
};

export { OrdersList };
