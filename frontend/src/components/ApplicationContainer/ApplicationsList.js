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
            setApplications(data.result);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleSelectApplication = (application) => {
        setSelectedApplication(application);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

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
                            {[
                                'id',
                                'name',
                                'surname',
                                'email',
                                'phone',
                                'age',
                                'course',
                                'course_type',
                                'course_format',
                                'status',
                                'sum',
                                'alreadyPaid',
                                'group',
                                'created_at',
                                'manager',

                            ].map((key) => (
                                <TableCell key={key}
                                           style={{fontWeight: "bold", backgroundColor: "#e3f2fd"}}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application.id}  onClick={() => handleSelectApplication(application)}
                                      style={{cursor: "pointer"}}>
                                <TableCell>{application.id}</TableCell>
                                <TableCell>{application.name}</TableCell>
                                <TableCell>{application.surname}</TableCell>
                                <TableCell>{application.email}</TableCell>
                                <TableCell>{application.phone}</TableCell>
                                <TableCell>{application.age}</TableCell>

                                <TableCell>{application.course}</TableCell>
                                <TableCell>{application.course_type}</TableCell>
                                <TableCell>{application.course_format}</TableCell>
                                <TableCell>{application.status || "null"}</TableCell>

                                <TableCell>{application.sum || "null"}</TableCell>
                                <TableCell>{application.alreadyPaid || "null"}</TableCell>
                                <TableCell>{application.created_at}</TableCell>
                                <TableCell>{application.manager ||"null"}</TableCell>
                                <TableCell>{application.group ||"null"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedApplication && (
                <Box sx={{padding: 2, marginTop: 2, backgroundColor: "#e3f2fd"}}>
                    <p><strong>Message:</strong> {selectedApplication.msg}</p>
                    <p><strong>utm:</strong> {selectedApplication.utm}</p>
                    {/*<p>{selectedApplication.comments.text}</p>*/}
                    {/*<p>{selectedApplication.manager}</p>*/}
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
