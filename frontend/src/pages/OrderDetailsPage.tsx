import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {IOrder, IUser} from "../interfaces";
import { orderServices } from "../services/orderServices";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {getManagerName} from "../services/managerNameService";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<IOrder | null>(null);

    useEffect(() => {
        if (id) {
            orderServices.byId(id)
                .then(data => setOrder(data))
                .catch(err => console.error("Error", err));
        }
    }, [id]);

    if (!order) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Order Details
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Field</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>{order.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{order.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Surname</TableCell>
                            <TableCell>{order.surname}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{order.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone</TableCell>
                            <TableCell>{order.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Age</TableCell>
                            <TableCell>{order.age}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Course</TableCell>
                            <TableCell>{order.course}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Course Type</TableCell>
                            <TableCell>{order.course_type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Course Format</TableCell>
                            <TableCell>{order.course_format}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sum</TableCell>
                            <TableCell>{order.sum}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Already Paid</TableCell>
                            <TableCell>{order.alreadyPaid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Group</TableCell>
                            <TableCell>{order.group}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Manager</TableCell>
                            <TableCell>{getManagerName(order.manager)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export { OrderDetailsPage };
