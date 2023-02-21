import { useEffect, useState } from "react";

import AddTask from "@/components/AddTask";
import ShowTasks from "@/components/ShowTasks";

import EditTask from "@/components/Popups/EditTask";
import DeleteTask from "@/components/Popups/DeleteTask";

const Home = () => {
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddingTask = () => {
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
    handleAddingTask();
  }, []);

  return (
    <>
      <h1 className="my-24 text-5xl font-bold text-center">
        Minhas Tarefas
      </h1>

      <div className="flex flex-col items-center gap-3">
        <AddTask
          addingTask={handleAddingTask}
        />
        <ShowTasks
          tasks={tasks}
          editTask={setPopupEdit}
          deleteTask={setPopupDelete}
        />
      </div>

      {
        popupEdit && (
          <EditTask
            popupEdit={setPopupEdit}
          />
        )
      }

      {
        popupDelete && (
          <DeleteTask />
        )
      }
    </>
  );
};

export default Home;
