import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Button, FormControl,Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {orderActions} from "../../redux/slices/ordersSlice";
import {IGroup, IOrder} from "../../interfaces";
import {Group} from "./GroupContainer/GroupForm";



const statuses = ["InWork", "New", "Agree", "Disagree", "Dubbing"];
const courses = ['FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX'];
const courseType = ['pro', 'minimal', 'premium', 'incubator', 'vip'];
const courseFormat = ["static", 'online'];

interface IProps {
    order: IOrder | null;
    onClose?: () => void;
    groups: IGroup[];
}

const UpdateFormOrder = ({order, onClose}: IProps) => {
    const {register, handleSubmit, setValue, watch} = useForm<IOrder>();
    const dispatch = useAppDispatch();

    const group_id = watch("group_id");

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
        console.log("Submitting data:", data);
        try {
            await dispatch(orderActions.updateOrder({orderId: order!.id.toString(), data}));
            await dispatch(orderActions.getById(order!.id.toString()))
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
                maxWidth: 1000,
                mx: "auto",
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 3
        }}
        >

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Name" fullWidth {...register("name")} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Surname" fullWidth {...register("surname")} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Email" fullWidth
                                                     type="email" {...register("email")} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Age" fullWidth
                                                     type="number" {...register("age", {min: 1})} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Phone" fullWidth
                                                     type="number" {...register("phone")} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Suma" fullWidth type="number" {...register("sum")} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="already paid" fullWidth
                                                     type="number" {...register("alreadyPaid")} /></Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select{...register("status")}>
                            {statuses.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                        </Select>
                    </FormControl>

                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Course</InputLabel>
                        <Select{...register("course")}>
                            {courses.map(course => <MenuItem key={course} value={course}>{course}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Course Type</InputLabel>
                        <Select {...register("courseType")}>
                            {courseType.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Course Format</InputLabel>
                        <Select{...register("courseFormat")}>
                            {courseFormat.map(format => <MenuItem key={format} value={format}>{format}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Group
                        value={group_id || ""}
                        onChange={(value) => setValue("group_id",Number( value))}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item><Button type="submit" variant="contained">Update</Button></Grid>
                        {onClose && <Grid item><Button variant="outlined" onClick={onClose}>Close</Button></Grid>}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export {UpdateFormOrder};




