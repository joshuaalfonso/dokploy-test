// store/projectStore.ts
import { create } from "zustand";
import type { Task } from "../projectTask.model";


type TaskStore = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;

  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;

  isDetailOpen: boolean;
  setDetailOpen: (open: boolean) => void

};

export const useProjectTaskDialogStore = create<TaskStore>((set) => ({

  selectedTask: null,

  setSelectedTask: (task) =>
    set({
      selectedTask: task,
    }),

  isCreateModalOpen: false,
  setCreateModalOpen: (open: boolean) =>
    set({
      isCreateModalOpen: open,
    }),

  isDetailOpen: false,
  setDetailOpen: (open: boolean) =>
    set({
      isDetailOpen: open,
    })

}));