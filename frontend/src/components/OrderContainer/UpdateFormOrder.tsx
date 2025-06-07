import { SubmitHandler, useForm } from "react-hook-form";
import { IGroup, IOrder } from "../../interfaces";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { orderActions } from "../../redux/slices/ordersSlice";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";

interface IProps {
    order: IOrder;
    onClose?: () => void;
    groups: IGroup[];
}

const statuses = ["InWork", "New", "Agree", "Disagree", "Dubbing"];
const courses = ['FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX'];
const courseType = ['pro', 'minimal', 'premium', 'incubator', 'vip'];
const courseFormat = ["static", 'online'];

const UpdateFormOrder = ({ order, onClose, groups }: IProps) => {
    const { register, handleSubmit, setValue } = useForm<IOrder>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (order) {
            setValue("name", order.name);
            setValue("surname", order.surname);
            setValue("email", order.email);
            setValue("age", order.age);
            setValue("phone", order.phone);
            setValue("sum", order.sum);
            setValue("alreadyPaid", order.alreadyPaid);
            setValue("status", order.status);
            setValue("course", order.course);
            setValue("courseFormat", order.courseFormat);
            setValue("courseType", order.courseType);
            if (order.group_id) {
                setValue("group_id", order.group_id);
            }
        }
    }, [order, setValue]);




    const onSubmit: SubmitHandler<IOrder> = async (data) => {
        try {
            await dispatch(orderActions.updateOrder({ orderId: order.id.toString(), data }));
            onClose?.();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 500,
                margin: '0 auto',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3
            }}
        >
            {/*<Typography variant="h6" component="h2">Редагування заявки</Typography>*/}

            <TextField label="Ім'я" {...register("name", { required: true })} />
            <TextField label="Прізвище" {...register("surname", { required: true })} />
            <TextField label="Email" type="email" {...register("email", { required: true })} />
            <TextField label="Вік" type="number" {...register("age", { required: true, min: 1 })} />
            <TextField label="Телефон" type="number" {...register("phone", { required: true })} />
            <TextField label="Сума" type="number" {...register("sum", { required: true })} />
            <TextField label="Оплачено" type="number" {...register("alreadyPaid")} />

            <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select {...register("status")} defaultValue={order.status}>
                    {statuses.map(status => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select {...register("course")} defaultValue={order.course}>
                    {courses.map(course => (
                        <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Course Type</InputLabel>
                <Select {...register("courseType")} defaultValue={order.courseType}>
                    {courseType.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Course Format</InputLabel>
                <Select {...register("courseFormat")} defaultValue={order.courseFormat}>
                    {courseFormat.map(format => (
                        <MenuItem key={format} value={format}>{format}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select {...register("group_id")} defaultValue={order.group_id || ""}>
                    <MenuItem value="">-- Виберіть групу --</MenuItem>
                    {groups.map(group => (
                        <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">Оновити</Button>
                {onClose && (
                    <Button variant="outlined" onClick={onClose}>Close</Button>
                )}
            </Box>
        </Box>
    );
};

export { UpdateFormOrder };

