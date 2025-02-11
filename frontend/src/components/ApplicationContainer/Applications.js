import React, {useEffect, useState} from "react";
import {Application} from "./Application";
import {applicationService} from "../../services/applicationService";
import {Pagination} from "./Pagination"

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10;

    useEffect(()=> {
        applicationService.getAll(currentPage, itemsPerPage).then(({data}) => {
            setApplications(data.result);
            setTotalItems(data.total_items);
        })
    },[currentPage])
    return (
        <div>
            {applications.length > 0 ? (
                applications.map((application) => (
                    <Application key={application.id} application={application}/>
                ))
            ) : (
                <p>Заявки відсутні</p>
            )}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setPage={setCurrentPage}
            />
        </div>
    );
};

export {Applications};