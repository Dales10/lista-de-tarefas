import { useEffect, useState } from "react";

import AddTask from "@/components/AddTask";
import ShowTasks from "@/components/ShowTasks";

import EditTask from "@/components/Popups/EditTask";
import DeleteTask from "@/components/Popups/DeleteTask";

const Home = () => {
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskPosition, setTaskPosition] = useState(-1);

  const updateTasks = () => {
    setTasks(
      JSON.parse(localStorage.getItem('tasks') || '[]'),
    );
  };

  useEffect(() => {
    if (popupEdit || popupDelete)
      document.body.style.overflowY = 'hidden';
    else
      document.body.style.overflowY = 'visible';
  }, [popupEdit || popupDelete]);

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <div className="select-none mb-20">
      <h1 className="my-10 sm:my-24 text-4xl sm:text-5xl font-bold text-center">
        Minhas Tarefas
      </h1>

      <div className="flex flex-col items-center gap-3">
        <AddTask
          updateTasks={updateTasks}
        />
        
        <ShowTasks
          tasks={tasks}
          setTaskPosition={setTaskPosition}
          updateTasks={updateTasks}
          editTask={setPopupEdit}
          deleteTask={setPopupDelete}
        />
      </div>

      {
        popupEdit && (
          <EditTask
            popupEdit={setPopupEdit}
            taskPosition={taskPosition}
            updateTasks={updateTasks}
          />
        )
      }

      {
        popupDelete && (
          <DeleteTask
            popupDelete={setPopupDelete}
            taskPosition={taskPosition}
            updateTasks={updateTasks}
          />
        )
      }
    </div>
  );
};

export default Home;
