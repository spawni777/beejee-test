import { create } from 'zustand';
import { createTaskAPI, editTaskAPI, getTasksAPI } from '@/api/tasks.js';

const useAppStore = create((set, get) => ({
  tasks: [],
  currentPage: 0,
  isLastPage: true,
  tasksSortedBy: 'username',
  tasksSortDirection: 'ASC',
  changeSortedBy(sortedBy) {
    set({tasksSortedBy: sortedBy});
    get().getTasksPage();
  },
  changeSortDirection(sortedDirection) {
    set({sortedDirection: sortedDirection});
    get().getTasksPage();
  },
  goToPage: (page) => {
    set({ currentPage: Math.max(0, page) });
    get().getTasksPage();
  },
  getTasksPage: async () => {
    const {currentPage, tasksSortedBy, tasksSortDirection} = get();
    const {data} = await getTasksAPI(3, currentPage, tasksSortedBy, tasksSortDirection);

    set({ tasks: data.tasks });
    set({ isLastPage: data.isLastPage });
  },
  createTask: async (form) => {
    await createTaskAPI(form.username, form.email, form.text);

    get().getTasksPage();
  },
  updateTask: async (form) => {
    await editTaskAPI(form.id, form.text, form.completed);

    get().getTasksPage();
  },
}))

// Fetch that gets the current bears from api
getTasksAPI().then(({data}) => useAppStore.setState({ tasks: data.tasks, isLastPage: data.isLastPage }));

export default useAppStore;
