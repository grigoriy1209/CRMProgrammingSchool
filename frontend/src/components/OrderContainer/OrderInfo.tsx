import React, {FC, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {FormComments} from "./FormComments";
import {UpdateFormOrder} from "./UpdateFormOrder";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {orderActions} from "../../redux/slices/ordersSlice";
import {IOrder} from "../../interfaces";


interface IProps {
    order: IOrder ;
    onClose: () => void;
}


const OrderInfo: FC<IProps> = ({ order,onClose }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useAppDispatch();

    const { groups } = useAppSelector(state => state.groups)



    return (
        <Box sx={{ position: "relative", p: 2 }}>

            <Typography><strong>msg:</strong> {order.msg || "null"}</Typography>
            <Typography><strong>utm:</strong> {order.utm || "null"}</Typography>
            <Typography><strong>Manager:</strong> {order.manager || ""}</Typography>

            <FormComments orderId={order.orderId} />


            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => setShowEditForm(true)}
                >
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
                    <UpdateFormOrder
                        order={order}
                        onClose={() => setShowEditForm(false)}
                        groups={groups}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>

                    </Box>
                </Box>
            )}
        </Box>
    );
};

export { OrderInfo };


