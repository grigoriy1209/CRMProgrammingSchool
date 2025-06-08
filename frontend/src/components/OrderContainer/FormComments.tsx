import React, {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import dayjs from 'dayjs';
import {commentActions} from "../../redux/slices/commentsSlise";

const FormComments = ({ orderId }: { orderId: number }) => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState('');
    const [isCommentAllowed, setIsCommentAllowed] = useState(true);

    const order = useAppSelector((state) => state.orders.orderInfo);
    const user = useAppSelector((state) => state.users.user);
    const comments = order?.comments || [];


    useEffect(() => {
        setIsCommentAllowed(!order?.manager && (order?.sq === 'New' || !order?.status));
        console.log('Order with comments:', order);
    }, [order]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            const manager = user?.profile.surname ?? '';
            const newStatus = order?.status === 'New' || !order?.status ? 'In_Work' : order.status;


            dispatch(commentActions.addComment({ orderId, comment, manager, status: newStatus }));
            setComment('');
        }
    };

    return (
        <div>
            <div className="mb-4">
                {comments.length > 0 && (
                    <ul>
                        {
                            comments.map(({manager,created_at,text}, index) => (
                                <li key={index} className="border-b py-2">
                                    <p>{`${manager}: ${dayjs(created_at).format('MMMM DD, YYYY')}`}</p>
                                    <p>{text}</p>
                                </li>
                            ))
                        }
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
