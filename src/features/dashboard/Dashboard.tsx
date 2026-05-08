import { Heading, Stack, Text } from "@chakra-ui/react"
import 'react-modern-gantt/dist/index.css';
import { GanttChart } from 'react-modern-gantt';




const Dashboard = () => {

     const tasks = [
        {
            id: "team-1",
            name: "IT",
            description: "Development Team",
            tasks: [
                {
                    id: "task-1",
                    name: "Website Redesign",
                    startDate: new Date(2023, 0, 1),
                    endDate: new Date(2023, 2, 15),
                    color: "#3B82F6", // blue-500
                    percent: 75,
                },
                {
                    id: "task-2",
                    name: "Responsive Design",
                    startDate: new Date(2023, 4, 1),
                    endDate: new Date(2023, 4, 15),
                    color: "#3B82F6", // blue-500
                    percent: 75,
                },
                // More tasks...
            ],
        },
        {
            id: "team-2",
            name: "Manager",
            description: "Development Team",
            tasks: [
                {
                    id: "task-1",
                    name: "Website Redesign",
                    startDate: new Date(2023, 2, 1),
                    endDate: new Date(2023, 3, 15),
                    color: "#3B82F6", // blue-500
                    percent: 75,
                },
                {
                    id: "task-2",
                    name: "Responsive Design",
                    startDate: new Date(2023, 4, 1),
                    endDate: new Date(2023, 4, 15),
                    color: "#3B82F6", // blue-500
                    percent: 75,
                },
                // More tasks...
            ],
        },
    ];

    // Task update handler
    const handleTaskUpdate = (groupId: number, updatedTask: any) => {
        // Update your task data here
        console.log("Task updated:", updatedTask);
    };


    return (
        <>
        
            <Stack mb={10}>
                <Heading>
                    Dashboard
                </Heading>
                <Text fontSize={'sm'} color={'fg.muted'}>
                    There's nothing here yet
                </Text>
            </Stack>

            <GanttChart
                tasks={tasks}
                title="Project Timeline"
                showProgress={false}
                onTaskUpdate={handleTaskUpdate}
                viewMode="month" // Options: "day", "week", "month", "quarter", "year"
            />

        
        </>
    )
}

export default Dashboard




