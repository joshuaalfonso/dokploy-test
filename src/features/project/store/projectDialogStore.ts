// store/projectStore.ts
import { create } from "zustand";
import type { ProjectList } from "../project.model";



type ProjectStore = {
  selectedProject: ProjectList | null;
  setSelectedProject: (project: ProjectList | null) => void;

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