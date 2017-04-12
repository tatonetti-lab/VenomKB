const handleUpdateProtein = (e, updateProtein, _id, changes) => {
    e.preventDefault();
    const now = new Date();
    const updatedAt = now.toISOString();

    updateProtein(_id, {
        updatedAt,
        ...changes
    });

    return;
};

export default handleUpdateProtein;
