import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Box,
    Container,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Counter from '../components/Counter';
import UserForm from '../components/UserForm';
import Editor from '../components/EditorView';

const DashboardApp = () => {
    const [count, setCount] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 400 });

    // Sample data for chart
    const chartData = [
        { name: 'Mon', value: count },
        { name: 'Tue', value: count * 1.5 },
        { name: 'Wed', value: count * 0.8 },
        { name: 'Thu', value: count * 2 },
        { name: 'Fri', value: count * 1.2 }
    ];

    useEffect(() => {
        const updateDimensions = () => {
            const width = isMobile ? window.innerWidth - 48 : 500;
            const height = isMobile ? 300 : 400;
            setChartDimensions({ width, height });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [isMobile]);

    const handleCountChange = (newCount: number) => {
        setCount(newCount);
    };

    return (
        <Box
            sx={{
                bgcolor: 'grey.100',
                p: { xs: 2, sm: 3, md: 4 },
                pt: { xs: 8, sm: 10, md: 12 } // Add padding to the top
            }}
        >
            <Container maxWidth="lg">
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-10'>
                    <Counter onCountChange={handleCountChange} />
                    <UserForm />
                    <Editor />

                    <Card>
                        <CardHeader
                            title="Dashboard Visualization"
                            sx={{
                                '& .MuiCardHeader-title': {
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }
                            }}
                        />
                        <CardContent>
                            <Box sx={{
                                width: '100%',
                                height: chartDimensions.height,
                                overflowX: 'auto'
                            }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fontSize: isMobile ? 12 : 14 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: isMobile ? 12 : 14 }}
                                        />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#1976d2"
                                            strokeWidth={isMobile ? 1.5 : 2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </Box>
    );
};

export default DashboardApp;