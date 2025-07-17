import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import dayjs from 'dayjs';
import { commentActions } from '../../redux/slices/commentsSlise';
import { orderActions } from "../../redux/slices/ordersSlice";
import { getManagerName } from "../../services/managerNameService";

interface FormCommentsProps {
    orderId: number;
}

const FormComments: FC<FormCommentsProps> = ({ orderId }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState('');

    const { user } = useAppSelector(state => state.users);
    const comments = useAppSelector(state => state.comments.comments);
    const orderInfo = useAppSelector(state => state.orders.orderInfo);

    const managerId = user?.id;

    const isCommentAllowed =
        !orderInfo?.manager ||
        (typeof orderInfo.manager === "object" && 'id' in orderInfo.manager && orderInfo.manager.id === managerId) ||
        (typeof orderInfo.manager === "number" && orderInfo.manager === managerId);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const currentStatus = orderInfo?.status;
        const newStatus = (!currentStatus || currentStatus === 'New') ? 'InWork' : currentStatus;

        // Додаємо коментар
        await dispatch(commentActions.addComment({
            orderId,
            comment: comment.trim(),
            status: newStatus,
        }));

        setComment('');

        // Оновлюємо коментарі та саму заявку (orderInfo)
        await dispatch(commentActions.getComments(orderId));
        await dispatch(orderActions.getById(orderId.toString()));
    };

    return (
        <div>
            <div className="mb-4">
                {comments.length > 0 && (
                    <ul className="space-y-2">
                        {comments.map(({ id, manager, created_at, comment }) => (
                            <li key={id} className="border p-2 rounded">
                                <p><strong>Author:</strong> {getManagerName(manager) || '—'}</p>
                                <p>
                                    <strong>Date:</strong> {created_at ? dayjs(created_at).format('YYYY-MM-DD HH:mm') : '—'}
                                </p>
                                <p><strong>Comment:</strong> {comment || '—'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isCommentAllowed && (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <textarea
                        autoFocus
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment"
                        className="border p-2 rounded-md resize-y"
                        rows={3}
                    />
                    <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export { FormComments };

