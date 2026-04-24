
import { Gantt, WillowDark } from "@svar-ui/react-gantt";
import '@svar-ui/react-gantt/all.css';
import '../../index.css';


const tasks = [
  {
      id: 20,
      text: "New Task",
      start: new Date(2026, 6, 11),
      end: new Date(2026, 6, 19),
      duration: 8,
      progress: 2,
      type: "task",
      lazy: false,
    },
    {
      id: 47,
      text: " Master project",
      start: new Date(2026, 7, 12),
      end: new Date(2026, 7, 16),
      duration: 5,
      progress: 0,
      parent: 0,
      type: "summary",
    },
    {
      id: 22,
      text: "Task",
      start: new Date(2026, 7, 11),
      end: new Date(2026, 8, 12),
      duration: 8,
      progress: 0,
      parent: 47,
      type: "task",
    },
    {
      id: 21,
      text: "New Task 2",
      start: new Date(2026, 7, 10),
      end: new Date(2026, 8, 12),
      duration: 3,
      progress: 0,
      type: "task",
      lazy: false,
    },
];

export const GanttChart = () => {
    return (
        <div className="myGantt">
            <WillowDark>
                <Gantt tasks={tasks} />
            </WillowDark>
            <p>hello</p>
        </div>
    )
}