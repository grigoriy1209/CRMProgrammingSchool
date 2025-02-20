import { useEffect, useState } from "react";
import { applicationService } from "../../services/applicationService";
import { CurrentPagination } from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer, Box, TextField, Button } from "@mui/material";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedApplication, setSelectedApplication] = useState(null); // для вибору заявки
    const [comment, setComment] = useState(""); // для коментаря

    useEffect(() => {
        const page = parseInt(searchParams.get("page"), 10);
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

    const handleSelectApplication = (application) => {
        setSelectedApplication(application); // вибір заявки
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async () => {
        if (!comment || !selectedApplication) return;

        // Перевірка статусу заявки
        if (selectedApplication.manager || selectedApplication.status === "In Work") {
            alert("Неможливо додати коментар до цієї заявки");
            return;
        }

        try {
            const updatedApplication = {
                ...selectedApplication,
                manager: "Поточне ім'я користувача", // Ваше ім'я
                status: selectedApplication.status === null || selectedApplication.status === "New" ? "In Work" : selectedApplication.status,
                comment: comment,
            };
            await applicationService.updateApplication(selectedApplication.id, updatedApplication);
            setSelectedApplication(updatedApplication); // оновлення вибраної заявки
            setComment(""); // очистка поля коментаря
            getApplication(); // поновлення списку
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{
            padding: 2,
            border: "2px solid #1976d2",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            marginBottom: 2
        }}>
            <TableContainer component={Paper} style={{ margin: 0, padding: 0 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {applications.length > 0 &&
                                Object.keys(applications[0]).map((key) => (
                                    <TableCell key={key} onClick={() => handleSort(key)} style={{
                                        cursor: "pointer",
                                        border: "1px solid #ddd",
                                        fontWeight: "bold",
                                        padding: "4px",
                                        backgroundColor: "#e3f2fd"
                                    }}>
                                        {key} {searchParams.get("order")?.includes(key) &&
                                        (searchParams.get("order").endsWith("asc") ? "⬆️" : "⬇️")}
                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application, i) => (
                            <TableRow key={i} onClick={() => handleSelectApplication(application)} style={{ cursor: "pointer" }}>
                                {Object.values(application).map((value, j) => (
                                    <TableCell key={j} style={{
                                        border: "1px solid #ddd",
                                        padding: "4px"
                                    }}>{String(value)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedApplication && (
                <Box sx={{ padding: 2, marginTop: 2, backgroundColor: "#e3f2fd" }}>
                    <h3>Заявка: {selectedApplication.id}</h3>
                    <p><strong>Message:</strong> {selectedApplication.message}</p>
                    <p><strong>UTM:</strong> {selectedApplication.utm}</p>
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
                        Додати коментар
                    </Button>
                </Box>
            )}

            <CurrentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export { Applications };

