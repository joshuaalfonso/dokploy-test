// store/projectStore.ts
import { create } from "zustand";
import type { Project } from "../project.model";



type ProjectStore = {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  isCreateModalOpen: boolean;
  // isDeleteModalOpen: boolean;

  setCreateModalOpen: (open: boolean) => void;

  // openDeleteModal: () => void;
  // closeDeleteModal: () => void;
};

export const useProjectDialogStore = create<ProjectStore>((set) => ({

  selectedProject: null,

  setSelectedProject: (project) =>
    set({
      selectedProject: project,
    }),

  isCreateModalOpen: false,
  // isDeleteModalOpen: false,

  setCreateModalOpen: (open: boolean) =>
    set({
      isCreateModalOpen: open,
    })

  // openDeleteModal: () =>
  //   set({
  //     isDeleteModalOpen: false,
  //   }),

  // closeDeleteModal: () =>
  //   set({
  //     isDeleteModalOpen: false,
  //   }),
}));