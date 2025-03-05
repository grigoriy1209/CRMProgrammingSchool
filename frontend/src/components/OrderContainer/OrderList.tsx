import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { orderActions } from "../../redux/slices/ordersSlice";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { IOrder } from "../../interfaces";
import {Pagination} from "./Pagination";


interface IColumn {
    key: keyof IOrder;
    label: string;
}

const OrdersList: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const orders = useAppSelector((state) => state.orders.orders);
    const error = useAppSelector((state) => state.orders.error);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageUrl = queryParams.get("page") || "1";
        dispatch(orderActions.getAll(Number(pageUrl)));
    }, [dispatch, location.search]);

    if (error) return <Typography variant="h6" color="error">Помилка: {error}</Typography>;

    const columns: IColumn[] = [
        {key: "id", label: "ID"},
        {key: "name", label: "Name"},
        {key: "surname", label: "Surname"},
        {key: "email", label: "Email"},
        {key: "phone", label: "Phone"},
        {key: "age", label: "Age"},
        {key: "course", label: "Course"},
        {key: "course_type", label: "Course Type"},
        {key: "course_format", label: "Course Format"},
        {key: "status", label: "Status"},
        {key: "sum", label: "Sum"},
        {key: "alreadyPaid", label: "Already Paid"},
        {key: "group", label: "Group"},
        {key: "created_at", label: "Created At"},
        {key: "manager", label: "Manager"},
    ];

    return (
        <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", padding: 2, borderRadius: "8px" }}>
            {orders.length ? (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell key={col.key} style={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    {columns.map((col) => (
                                        <TableCell key={col.key}>
                                            {order[col.key] || "null"}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" sx={{ marginTop: 2 }}>Немає заявок для відображення.</Typography>
            )}
            <Pagination />
        </Box>
    );
};

export { OrdersList };

