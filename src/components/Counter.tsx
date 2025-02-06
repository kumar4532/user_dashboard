import { useState } from 'react'
import {
    Card,
    CardContent,
    Button,
    Typography,
    Box,
    Stack
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

const Counter = ({ onCountChange }: { onCountChange: (count: number) => void }) => {
    const [count, setCount] = useState(0);

    const backgroundHeight = Math.min(count * 2, 100);
    const backgroundColor = `hsl(200, 70%, ${50 + Math.min(count, 40)}%)`;

    const updateCount = (newCount: number) => {
        setCount(newCount);
        onCountChange(newCount);
    };

    return (
        <Card sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: `${backgroundHeight}%`,
                    bgcolor: backgroundColor,
                    transition: 'all 0.3s ease-in-out'
                }}
            />
            <CardContent sx={{ position: 'relative', zIndex: 1, p: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Counter: {count}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => updateCount(count + 1)}
                    >
                        Increment
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<RemoveIcon />}
                        onClick={() => updateCount(count - 1)}
                    >
                        Decrement
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={() => updateCount(0)}
                    >
                        Reset
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Counter