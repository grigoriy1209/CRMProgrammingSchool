import React, {FC, useEffect, useState} from "react";
import {Pagination} from "./Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {useLocation} from "react-router-dom";
import {orderActions} from "../../redux/slices/ordersSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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
import {format} from "date-fns/format";
import {OrderInfo} from "./OrderInfo";
import {IOrder} from "../../interfaces";

interface IColumn {
    key: keyof IOrder;
    label: string;
}

const OrdersList: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const orders = useAppSelector((state) => state.orders.orders);
    const error = useAppSelector((state) => state.orders.error);

    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const getPageFromUrl = (search: string) => {
        const queryParams = new URLSearchParams(search);
        return Number(queryParams.get("page") || "1");
    };

    useEffect(() => {
        const pageUrl = getPageFromUrl(location.search);
        dispatch(orderActions.getAll(pageUrl));
    }, [dispatch, location.search,]);

    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

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

    const handleRowClick = (orderId: number) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };

    return (
        <Box sx={{width: "100%", backgroundColor: "#f5f5f5", padding: 0, margin: 0, borderRadius: "0px"}}>
            {orders.length ? (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell key={col.key} sx={{fontWeight: "bold", backgroundColor: "#e3f2fd"}}>
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <TableRow
                                        onClick={() => handleRowClick(order.id)}
                                        style={{cursor: "pointer"}}
                                    >
                                        {columns.map((col) => (
                                            <TableCell key={col.key}>
                                                {col.key === "created_at"
                                                    ? format(new Date(order.created_at), "MMMM dd, yyyy")
                                                    : order[col.key] || "null"}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    {expandedOrderId === order.id && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <Accordion expanded>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon/>}
                                                        aria-controls={`order-${order.id}-content`}
                                                        id={`order-${order.id}-header`}
                                                    >
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <OrderInfo order={order}
                                                                   onClose={() => setExpandedOrderId(null)}/>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" sx={{marginTop: 2}}>
                    No orders found
                </Typography>
            )}
            <Pagination/>
        </Box>
    );
};
export {
    OrdersList
}

