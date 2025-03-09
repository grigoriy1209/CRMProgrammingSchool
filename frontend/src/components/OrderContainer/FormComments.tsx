import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import React, { FormEvent, useState, useEffect } from "react";
import { orderActions } from "../../redux/slices/ordersSlice";
import dayjs from "dayjs"; // для форматування дати

const FormComments = ({ orderId }: { orderId: number }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState("");
    const [isCommentAllowed, setIsCommentAllowed] = useState(true);

    const order = useAppSelector((state) => state.orders.orderInfo);
    const user = useAppSelector((state) => state.auth.user);
    const comments = order?.comments || [];

    useEffect(() => {

        if (order && (order.manager || order.status !== 'New' && order.status !== null)) {
            setIsCommentAllowed(false);
        } else {
            setIsCommentAllowed(true);
        }
    }, [order]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            const manager = user?.lastName || "Unknown";
            const newStatus = order?.status === null || order?.status === "New" ? "In Work" : order?.status;


            dispatch(orderActions.addComment({ orderId, comment, manager, status: newStatus }));

            setComment("");
        }
    };

    return (
        <div>
            <div className="mb-4">
                {comments.length > 0 ? (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index} className="border-b py-2">
                                <p>{comment.manager}:{comment.text}</p>
                                <p>{dayjs(comment.created_at).format("YYYY-MM-DD HH:mm")}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Немає коментарів.</p>
                )}
            </div>


            {isCommentAllowed ? (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Додати коментар..."
                        className="border p-2 rounded-md"
                        rows={3}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Додати коментар
                    </button>
                </form>
            ) : (
                <p>Коментарі не можна додавати.</p>
            )}
        </div>
    );
};

export { FormComments };
