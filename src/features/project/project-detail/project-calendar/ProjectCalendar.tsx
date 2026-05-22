import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewWeekAgenda,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useEffect, useState } from "react"
import { useTaskByProject } from '../project-task/hooks/useTask'
import LoadingSpinner from '@/shared/components/LoadingSpinner'
import { useColorMode } from '@/components/ui/color-mode'
import { useProjectTaskDialogStore } from '../project-task/store/projectTaskStore'

const ProjectCalendar = () => {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const { colorMode } = useColorMode()
    const { tasks, isPending, error } = useTaskByProject()

    const setSelectedTask = useProjectTaskDialogStore(state => state.setSelectedTask);
    const setDetailOpen = useProjectTaskDialogStore(state => state.setDetailOpen);

    const calendar = useCalendarApp({
        views: [
        createViewDay(),
        createViewWeekAgenda(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
        ],
        plugins: [eventsService],
        isDark: colorMode === 'dark',
        calendars: {
            todo: {
                colorName: 'todo',
                lightColors: {
                main: '#ef4444',
                container: '#fee2e2',
                onContainer: '#991b1b',
                },
                darkColors: {
                main: '#f87171',
                container: '#450a0a',
                onContainer: '#fecaca',
                },
            },

            inprogress: {
                colorName: 'inprogress',
                lightColors: {
                main: '#f59e0b',
                container: '#fef3c7',
                onContainer: '#92400e',
                },
                darkColors: {
                main: '#fbbf24',
                container: '#451a03',
                onContainer: '#fde68a',
                },
            },

            forreview: {
                colorName: 'forreview',
                lightColors: {
                main: '#22c55e',
                container: '#dcfce7',
                onContainer: '#166534',
                },
                darkColors: {
                main: '#4ade80',
                container: '#052e16',
                onContainer: '#bbf7d0',
                },
            },

            completed: {
                colorName: 'completed',
                lightColors: {
                main: '#3b82f6',
                container: '#dbeafe',
                onContainer: '#1e3a8a',
                },
                darkColors: {
                main: '#60a5fa',
                container: '#172554',
                onContainer: '#bfdbfe',
                },
            },
        },
        callbacks: {
            onEventClick: (event) => {

                const task = tasks?.find(task => task.task_id == event.id);

                if (task) {
                    setSelectedTask(task)
                    setDetailOpen(true)
                }

            },
        },
    })

    useEffect(() => {

        if (!tasks?.length || !calendar) return

        const mappedEvents = tasks.map((task) => ({
            id: String(task.task_id),
            title: task.task_title,
            start: Temporal.PlainDate.from(task.created_at.split("T")[0]),
            end: Temporal.PlainDate.from(task.due_date.split("T")[0]),
            calendarId: task.status.replace(/\s+/g, "")
        }))

        // replace by brute force reset
        calendar.events.getAll().forEach((e) => {
            calendar.events.remove(e.id)
        })

        mappedEvents.forEach((e) => {
             calendar.events.add(e)
        })


    }, [tasks, calendar])

    useEffect(() => {
        calendar?.setTheme(colorMode)
    }, [colorMode, calendar])

    if (isPending && !tasks) return <LoadingSpinner />
    if (error) return <p>Failed to load data</p>

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default ProjectCalendar