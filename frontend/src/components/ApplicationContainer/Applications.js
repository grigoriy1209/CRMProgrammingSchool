import { useEffect, useState } from "react";
import { applicationService } from "../../services/applicationService";
import { CurrentPagination } from "./Pagination";
import { useSearchParams } from "react-router-dom";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const page = parseInt(searchParams.get("page"), 10) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        setSearchParams((prev) => ({
            ...Object.fromEntries(prev.entries()),
            page: currentPage.toString(),
        }));
        getApplication();
    }, [currentPage, searchParams]);

    const getApplication = async () => {
        try {
            const response = await applicationService.getAll(currentPage, searchParams);
            const data = response.data;
            setApplications(data.result);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleSort = (field) => {
        const currentOrder = searchParams.get("order");
        const newOrder = currentOrder === `${field}` ? `${field}` : `${field}`;

        setSearchParams((prev) => ({
            ...Object.fromEntries(prev.entries()),
            order: newOrder,
            page: "1",
        }));
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    {applications.length > 0 &&
                        Object.keys(applications[0]).map((key) => (
                            <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                                {key} {searchParams.get("order")?.includes(key) &&
                                (searchParams.get("order").endsWith("asc") ? "⬆️" : "⬇️")}
                            </th>
                        ))}
                </tr>
                </thead>
                <tbody>
                {applications.map((application, i) => (
                    <tr key={i}>
                        {Object.values(application).map((value, j) => (
                            <td key={j}>{String(value)}</td>

                        ))}
                    </tr>
                ))}
                </tbody>
            </table>


            <CurrentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export { Applications };
