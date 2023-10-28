import { createContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { createTaskAPI, editTaskAPI, getTasksAPI } from '../api/tasks.js';

export const AppDataContext = createContext({});
export const AppAPIContext = createContext({});

const AppContextProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [curTasksPage, setCurTasksPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const [taskSortBy, setTaskSortBy] = useState('username');
  const [taskSortDirection, setTaskSortDirection] = useState('ASC');

  const getTasksPage = async () => {
    const {data} = await getTasksAPI(3, curTasksPage, taskSortBy, taskSortDirection);

    setTasks(data.tasks)
    setIsEnd(data.isEnd);
  }

  useEffect(() => {
    getTasksPage();
  }, [taskSortBy, taskSortDirection, curTasksPage]);

  const goToPage = (page) => {
    setCurTasksPage(Math.max(0, page));
  }

  const createTask = async (form) => {
    await createTaskAPI(form.username, form.email, form.text);

    getTasksPage();
  }

  const updateTask = async (form) => {
    await editTaskAPI(form.id, form.text, form.completed);

    getTasksPage();
  }

  /////////////////////////////////////


  const dataValue = {
    tasks,
    curTasksPage,
    isEnd,
    taskSortBy,
    taskSortDirection,

  };

  const APIValue = {
    setTaskSortBy,
    setTaskSortDirection,
    goToPage,
    createTask,
    updateTask,
  }

  return <AppDataContext.Provider value={ dataValue }>
    <AppAPIContext.Provider value={ APIValue }>
      { children }
    </AppAPIContext.Provider>
  </AppDataContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContextProvider;
