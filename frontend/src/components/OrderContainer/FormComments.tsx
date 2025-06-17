import React, {FormEvent, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import dayjs from 'dayjs';
import {commentActions} from "../../redux/slices/commentsSlise";

const FormComments = ({ orderId }: { orderId: number }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState('');
    const [isCommentAllowed, setIsCommentAllowed] = useState(true);

    const {orderInfo} = useAppSelector((state) => state.orders);
    const {user} = useAppSelector((state) => state.users);
    const comments = orderInfo?.comments || [];

    const manager = useMemo(()=> user?.profile.surname ?? '', [user] ) ;




    useEffect(() => {
        setIsCommentAllowed(!orderInfo?.manager && (orderInfo?.sq === 'New' || !orderInfo?.status));
        console.log('Order with comments:', orderInfo);
    }, [orderInfo]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            const newStatus = orderInfo?.status === 'New' || !orderInfo?.status ? 'In_Work' : orderInfo.status;


            dispatch(commentActions.addComment({ orderId, comment, manager, status: newStatus }));
            setComment('');
        }
    };

    return (
        <div>
            <div className="mb-4">
                {comments.length > 0 && (
                    <ul>
                        {comments.map(({author, created_at, text}, index) => (
                            <li key={index}>
                                <p>Автор: {author || 'Unknown'}</p>
                                <p>Дата: {created_at ? dayjs(created_at).format('YYYY-MM-DD HH:mm') : '---'}</p>
                                <p>Текст: {text || '---'}</p>
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
                    <button type="submit"
                            disabled={!comment.trim()}
                            className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        SUBMIT
                    </button>
                </form>
            )}
        </div>
    );
};

export { FormComments };
