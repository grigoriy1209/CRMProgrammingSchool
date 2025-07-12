import React, { FC, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FormComments } from "./FormComments";
import { UpdateFormOrder } from "./UpdateFormOrder";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IOrder } from "../../interfaces";
import { orderActions } from "../../redux/slices/ordersSlice";

interface IProps {
    order: IOrder;
    onClose: () => void;
}

const OrderInfo: FC<IProps> = ({ order, onClose }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useAppDispatch();
    const { groups } = useAppSelector(state => state.groups);
    const orderInfo = useAppSelector(state => state.orders.orderInfo);

    useEffect(() => {
        if (!orderInfo || orderInfo.id !== order.id) {
            dispatch(orderActions.getById(order.id.toString()));
        }
    }, [dispatch, order.id, orderInfo]);

    const currentOrder = orderInfo || order;

    return (
        <Box sx={{ position: "relative", p: 2 }}>
            <Typography><strong>msg:</strong> {currentOrder.msg || "—"}</Typography>
            <Typography><strong>utm:</strong> {currentOrder.utm || "—"}</Typography>

            <FormComments orderId={order.id} />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button variant="contained" onClick={() => setShowEditForm(true)}>
                    Edit
                </Button>
            </Box>

            {showEditForm && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        backgroundColor: "#fff",
                        padding: 3,
                        borderRadius: "8px",
                        boxShadow: 3,
                        width: "90%",
                        maxWidth: "600px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        border: "3px solid limegreen"
                    }}
                >
                    <Button
                        size="small"
                        onClick={() => setShowEditForm(false)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        ❌
                    </Button>

                    <UpdateFormOrder
                        order={currentOrder}
                        onClose={() => setShowEditForm(false)}
                        groups={groups}
                    />
                </Box>
            )}
        </Box>
    );
};

export { OrderInfo };

