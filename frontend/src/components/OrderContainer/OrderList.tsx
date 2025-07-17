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
import {OrderInfo} from "./OrderInfo";
import {IOrder} from "../../interfaces";
import { format } from "date-fns";

interface IColumn {
    key: keyof IOrder | 'manager';
    label: string;
}

const OrdersList: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {orders, error} = useAppSelector(state => state.orders);

    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const getPageFromUrl = (search: string) => {
        const queryParams = new URLSearchParams(search);
        return Number(queryParams.get("page") || "1");
    };

    useEffect(() => {
        const page = getPageFromUrl(location.search);
        dispatch(orderActions.getAll(page));
    }, [dispatch, location.search]);

    const toggleExpanded = (id: number) => {
        setExpandedOrderId(prev => (prev === id ? null : id));
    };

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
    const renderCell = (order: IOrder, col: IColumn) => {
        const key = col.key;

        if (key === "manager") {
            const manager = order.manager;

            if (manager === null) return null;

            if (typeof manager === "string" || typeof manager === "number") {
                return manager.toString();
            }

            if (typeof manager === "object") {
                const profile = (manager as any).profile;

                if (profile && profile.name && profile.surname) {
                    return `${profile.name} ${profile.surname}`;
                }

                if ('name' in manager && 'surname' in manager) {
                    return `${manager.name} ${manager.surname}`;
                }

                return JSON.stringify(manager);
            }

            return null;
        }

        const value = order[key as keyof IOrder];

        if (value === null) return "null";

        if (key === 'created_at' && typeof value === 'string') {
            return format(new Date(value), "yyyy-MM-dd");
        }

        return value.toString();
    };



    return (
        <Box sx={{width: "100%", backgroundColor: "#f5f5f5", p: 2}}>
            {orders.length ? (
                <TableContainer component={Paper} sx={{maxHeight: '75vh', overflow: 'auto'}}>
                    <Table size="small" stickyHeader>
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
                                        onClick={() => toggleExpanded(order.id)}
                                        style={{cursor: "pointer"}}
                                    >
                                        {columns.map((col) => (
                                            <TableCell key={col.key}>
                                                {renderCell(order, col)}
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
                                                        <Typography variant="subtitle2">{order.id}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <OrderInfo
                                                            order={order}
                                                            onClose={() => setExpandedOrderId(null)}
                                                        />
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
                <Typography variant="h6" sx={{mt: 2}}>
                    No orders found
                </Typography>
            )}
            <Pagination/>
        </Box>
    );
};
export {OrdersList}