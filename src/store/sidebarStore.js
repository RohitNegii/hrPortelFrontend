import { create } from "zustand";

const useSidebarStore = create((set) => ({
  activeTab: "Candidates",
  setActiveTab: (tab) => set({ activeTab: tab }),
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
