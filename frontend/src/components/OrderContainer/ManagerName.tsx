import React from 'react';

interface IManager {
    id: number;
    profile?: {
        name: string;
        surname: string;
    };
}

interface ManagerNameProps {
    manager: IManager | number | null;
}

const ManagerName: React.FC<ManagerNameProps> = ({ manager }) => {
    if (!manager) return <>—</>;
    if (typeof manager === 'number') return <>ID: {manager}</>;
    return <>{manager.profile ? `${manager.profile.name} ${manager.profile.surname}` : `ID: ${manager.id}`}</>;
};

export {ManagerName};
