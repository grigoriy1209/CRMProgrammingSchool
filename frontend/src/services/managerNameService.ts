export const getManagerName = (manager: any): string | null => {
    if (!manager) return null;
    if ('profile' in manager && manager.profile) {
        return `${manager.profile.name} ${manager.profile.surname}`;
    }
    if ('name' in manager && 'surname' in manager) {
        return `${manager.name} ${manager.surname}`;
    }
    return null;
};
