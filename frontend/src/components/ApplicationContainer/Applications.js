import {useEffect, useState} from "react";

import {applicationService} from "../../services/applicationService";
import {CurrentPagination} from "./Pagination";
import {Application} from "./Application";
import {useSearchParams} from "react-router-dom";

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchParams,setSearchParams] = useSearchParams();

    useEffect(() => {
        const pageful = parseInt(searchParams.get("page"),10) ;
        setCurrentPage(pageful);
    }, [searchParams]);

    useEffect(() => {
        setSearchParams({page: currentPage.toString(), });
        getApplication(currentPage);
    },[currentPage,setSearchParams]);

    const handlePageChange = (page) => {
        if(page<1 || page > totalPages)return;
        setCurrentPage(page);
    }

    const getApplication =async (page) => {
        try {
            const response = await applicationService.getAll(page);
            const data = response.data;
            setApplications(data.result);
            setCurrentPage(data.current_page);
            setTotalPages(data.total_pages)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            {
                applications.map((application, i) => <Application key={i} application={application} />)
            }
            <CurrentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export {Applications};