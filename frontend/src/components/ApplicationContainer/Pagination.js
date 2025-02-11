const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    setPage})=>{
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page)=>{
        if (page>= 1 && page<= totalPages){
            setPage(page);
        }
    };
    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Попередня
            </button>
            {[...Array(totalPages).keys()].map((i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Наступна
            </button>
        </div>
    )
}
export {
    Pagination,
}