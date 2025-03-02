import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {applicationService} from "../../services/applicationService";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {CurrentPagination} from "./Pagination";

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [comment, setComment] = useState("");

    // Структура колонок
    const columns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "surname", label: "Surname" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "age", label: "Age" },
        { key: "course", label: "Course" },
        { key: "course_type", label: "Course Type" },
        { key: "course_format", label: "Course Format" },
        { key: "status", label: "Status" },
        { key: "sum", label: "Sum" },
        { key: "alreadyPaid", label: "Already Paid" },
        { key: "group", label: "Group" },
        { key: "created_at", label: "Created At" },
        { key: "manager", label: "Manager" },
    ];

    // Завантаження даних
    useEffect(() => {
        const page = parseInt(searchParams.get("page"), 10);
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        setSearchParams((prev) => ({
            ...Object.fromEntries(prev.entries()),
            page: currentPage.toString(),
        }));
        getApplications();
    }, [currentPage, searchParams]);

    const getApplications = async () => {
        try {
            const response = await applicationService.getAll(currentPage, searchParams);
            const data = response.data;
            console.log(data);  // Логування для перевірки структури
            setApplications(data.result);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    // Обробка зміни сторінки
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Обрання заявки для коментарів
    const handleSelectApplication = (application) => {
        setSelectedApplication(application);
    };

    // Обробка введення коментаря
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // Обробка надсилання коментаря
    const handleSubmitComment = async () => {
        if (!comment || !selectedApplication) return;

        if (selectedApplication.manager || selectedApplication.status === "In Work") {
            alert("Неможливо додати коментар до цієї заявки");
            return;
        }
        try {
            const updatedApplication = {
                ...selectedApplication,
                manager: "Поточне ім'я користувача",
                status: selectedApplication.status === "New" ? "In Work" : selectedApplication.status,
                comment: comment,
            };
            await applicationService.updateApplication(selectedApplication.id, updatedApplication);
            setSelectedApplication(updatedApplication);
            setComment("");
            getApplications();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            width: "100%"
        }}>
            <TableContainer component={Paper}>
                <Table size="small" sx={{width: "100%"}}>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key} style={{fontWeight: "bold", backgroundColor: "#e3f2fd"}}>
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application.id} onClick={() => handleSelectApplication(application)} style={{cursor: "pointer"}}>
                                {columns.map((col) => (
                                    <TableCell key={col.key}>
                                        {application[col.key] || "null"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedApplication && (
                <Box sx={{padding: 2, marginTop: 2, backgroundColor: "#e3f2fd"}}>
                    <p><strong>Message:</strong> {selectedApplication.msg}</p>
                    <p><strong>utm:</strong> {selectedApplication.utm}</p>
                    <TextField
                        label="Коментар"
                        multiline
                        rows={4}
                        value={comment}
                        onChange={handleCommentChange}
                        fullWidth
                        disabled={selectedApplication.manager || selectedApplication.status === "In Work"}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitComment}
                        disabled={selectedApplication.manager || selectedApplication.status === "In Work"}
                    >
                        SUBMIT
                    </Button>
                </Box>
            )}
            <CurrentPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Box>
    );
};

export {ApplicationsList};

