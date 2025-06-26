import React, { FormEvent, useMemo, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import dayjs from 'dayjs';
import { commentActions } from '../../redux/slices/commentsSlise';
import { orderActions } from '../../redux/slices/ordersSlice';

const FormComments = ({ orderId }: { orderId: number }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState('');

    const { user } = useAppSelector((state) => state.users);
    const { orderInfo } = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(orderActions.getById(orderId.toString()));
    }, [dispatch, orderId]);

    const comments = orderInfo?.comments || [];
    const manager = useMemo(() => user?.profile?.surname ?? '', [user]);

    const isCommentAllowed =
        !orderInfo?.manager || String(orderInfo.manager) === manager;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const currentStatus = orderInfo?.status;
        const newStatus = (!currentStatus || currentStatus === 'New') ? 'InWork' : currentStatus;

        dispatch(commentActions.addComment({
            orderId,
            comment: comment.trim(),
            manager,
            status: newStatus,
        })).then(() => {
            dispatch(orderActions.getById(orderId.toString()));
        });

        setComment('');
    };

    return (
        <div>
            <div className="mb-4">
                {comments.length > 0 && (
                    <ul className="space-y-2">
                        {comments.map(({ author, created_at, text }, index) => (
                            <li key={index} className="border p-2 rounded">
                                <p><strong>Автор:</strong> {author || 'Unknown'}</p>
                                <p><strong>Дата:</strong> {created_at ? dayjs(created_at).format('YYYY-MM-DD HH:mm') : '---'}</p>
                                <p><strong>Текст:</strong> {text || '---'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isCommentAllowed && (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment"
                        className="border p-2 rounded-md"
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
            {!isCommentAllowed && (
                <p className="text-gray-500 italic">
                    Коментарі дозволено лише, якщо заявка ще не взята або вона ваша.
                </p>
            )}
        </div>
    );
};

export { FormComments };

