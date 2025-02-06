import {
    Card,
    CardContent,
    CardHeader,
    Button,
    TextField,
    Alert,
    Stack
} from '@mui/material';
import {
    Save as SaveIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface FormData {
    name: string,
    email: string,
    address: string,
    phone: string,
    userId: string
}

const UserForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        address: '',
        phone: '',
        userId: ''
    });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [formattedText, setFormattedText] = useState<FormData[]>([]);

    const handleFormChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setHasUnsavedChanges(true);
    };

    const generateUserId = () => {
        return 'USER_' + Math.random().toString(36).substr(2, 9);
    };

    const handleSave = () => {
        const newData = {
            ...formData,
            userId: generateUserId()
        };
        localStorage.setItem('userData', JSON.stringify(newData));
        setHasUnsavedChanges(false);
        setFormattedText([...formattedText, newData]);
    };

    useEffect(() => {
        const handleBeforeUnload = (e: any) => {
            if (hasUnsavedChanges && formData) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    return (
        <Card>
            <CardHeader title="User Data Form" />
            <CardContent>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                    />
                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    {hasUnsavedChanges && (
                        <Alert severity="warning">
                            You have unsaved changes. Please save before leaving.
                        </Alert>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserForm