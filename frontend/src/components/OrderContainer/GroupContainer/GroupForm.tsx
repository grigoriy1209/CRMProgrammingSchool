import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {groupActions} from "../../../redux/slices/groupSlice";

const {getAllGroup, createGroup,} = groupActions;

const GroupList = () => {
    const dispatch = useAppDispatch();
    const {groups, loading, error} = useAppSelector((state) => state.groups);
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(getAllGroup());
    }, [dispatch]);

    const handleSubmit = () => {
        if (name.trim()) {
            dispatch(createGroup({name}));
            setName('');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-2">Список груп</h2>
            {loading && <p>Завантаження...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="mb-4">
                {groups.map((group) => (
                    <li key={group.id}>• {group.name}</li>
                ))}
            </ul>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Нова група"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
                    Додати
                </button>
            </div>
        </div>
    );
};

export {GroupList};
