import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {groupActions} from "../../../redux/slices/groupSlice";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

interface Props {
    value: string | number | null;
    onChange: (value: string | number) => void;
}

const Group = ({ value, onChange }: Props) => {
    const dispatch = useAppDispatch();
    const { groups } = useAppSelector((state) => state.groups);
    const [newGroup, setNewGroup] = useState("");

    useEffect(() => {
        dispatch(groupActions.getAllGroup());
    }, [dispatch]);

    const handleSelectChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    const handleCreateGroup = async () => {
        if (!newGroup.trim()) return;
        await dispatch(groupActions.createGroup({name:newGroup}))
        setNewGroup("");
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select
                    value={value?.toString() ?? ""}
                    label="Group"
                    onChange={(e) => onChange(e.target.value)}  // e.target.value буде string
                >
                    {groups.map(group => (
                        <MenuItem key={group.id} value={group.id.toString()}>{group.name}</MenuItem>
                    ))}
                </Select>

            </FormControl>
            <Box mt={1} display="flex" gap={1}>
                <TextField
                    label="Нова група"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    size="small"
                    fullWidth
                />
                <Button
                    onClick={handleCreateGroup}
                    variant="outlined"
                    sx={{ height: '40px' }}
                >
                    ADD Group
                </Button>
            </Box>
        </Box>
    );
};

export { Group };
