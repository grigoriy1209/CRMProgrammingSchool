import React, { FC } from "react";
import {Box, Button, Typography} from "@mui/material";
import { IOrder } from "../../interfaces";
import {FormComments} from "./FormComments";

interface IProps {
    order: IOrder | null;
    onClose: () => void;
}

const OrderInfo: FC<IProps> = ({ order}) => {
    if (!order) {
        return <Typography>Завантаження...</Typography>;
    }

    return (
        <Box
            sx={{
                width: 400,
                margin: "100px auto",
                padding: 2,
                backgroundColor: "white",
                borderRadius: "8px",
            }}
        >
            <Typography>
                <strong>msg:</strong> {order.msg || "null"}
            </Typography>
            <Typography>
                <strong>utm:</strong> {order.utm || "null"}
            </Typography>

            <Typography>
                <strong></strong> {order.manager || ""}
            </Typography>
            <Typography></Typography>
            <Typography>
                <FormComments orderId={order.orderId}/>
            </Typography>
            <Button>
                edit
            </Button>
        </Box>
    );
};

export { OrderInfo };

