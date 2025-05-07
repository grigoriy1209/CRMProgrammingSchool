import {Form, SubmitHandler, useForm} from "react-hook-form";
import {IOrder} from "../../interfaces";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {useEffect} from "react";
import {orderActions} from "../../redux/slices/ordersSlice";

interface IProps {
    order: IOrder;
    onClose?: () => void;
}

const statuses = [" In work", "New", "Agree", "Disagree", "Dubbing"]
const courses = ['FS', 'QAC', 'JCX', 'JSCX', 'FE', 'PCX']
const courseType = ['pro', 'minimal', 'premium', 'incubator', 'vip']
const courseFormat = ["static", 'online']


const UpdateFormOrder = ({order, onClose}: IProps) => {
    const {register, handleSubmit, setValue} = useForm<IOrder>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (order) {
            setValue("name", order.name);
            setValue("surname", order.surname);
            setValue("age", order.age);
            setValue("sum", order.sum);
            setValue("alreadyPaid", order.alreadyPaid);
            setValue("status", order.status);
            setValue("course", order.course);
            setValue("courseFormat", order.courseFormat);
            setValue("courseType", order.courseType);
        }
    }, [order, setValue]);

    const onSubmit: SubmitHandler<IOrder> = async (data) => {
        try {
            console.log("Sending data:", data);  // Додайте лог для перевірки
            await dispatch(orderActions.updateOrder({orderId: order.id.toString(), data}));
            console.log("Order updated successfully");
            onClose?.();  // Закриває модалку
        } catch (error) {
            console.error("Update failed:", error);  // Лог для помилки
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input type="text" placeholder="name" {...register("name")} />
            <input type="text" placeholder="surname" {...register("surname")} />
            <input type="number" placeholder="age" min="1" {...register("age")} />
            <input type="number" placeholder="sum" min="1" {...register("sum")} />
            <input type="number" placeholder="alreadyPaid" {...register("alreadyPaid")} />

            <select {...register("status")}>
                {statuses.map(status => <option key={status}>{status}</option>)}
            </select>

            <select {...register("course")}>
                {courses.map(course => <option key={course} value={course}>{course}</option>)}
            </select>

            <select {...register("courseFormat")}>
                {courseFormat.map(format => <option key={format} value={format}>{format}</option>)}
            </select>

            <select {...register("courseType")}>
                {courseType.map(type => <option key={type} value={type}>{type}</option>)}
            </select>

            <button type="submit">update</button>
            {onClose && (
                <button type="button" onClick={onClose}>Close</button>
            )}
        </form>
    );
};
export {
    UpdateFormOrder,
}