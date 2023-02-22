import { useEffect, useState } from "react";

import SearchAndAddTasks from "@/components/SearchAndAddTasks";
import ShowTasks from "@/components/ShowTasks";

import PopupAddTask from './../components/Popups/AddTask';
import PopupEditTask from "@/components/Popups/EditTask";
import PopupDeleteTask from "@/components/Popups/DeleteTask";

const Home = () => {
  const [popupAdd, setPopupAdd] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskPosition, setTaskPosition] = useState(-1);

  //Atualiza a lista de tarefas sempre que é chamado.
  const updateTasks = () => {
    setTasks(
      JSON.parse(localStorage.getItem('tasks') || '[]'),
    );
  };

  //Quando uma popup é aberta, esconde a rolagem lateral para não ser possível interagir com o fundo.
  useEffect(() => {
    if (popupAdd || popupEdit || popupDelete)
      document.body.style.overflowY = 'hidden';
    else
      document.body.style.overflowY = 'visible';
  }, [popupAdd ||popupEdit || popupDelete]);

  useEffect(() => {
    updateTasks();
  }, []);

  return (
    <div className="select-none mb-20">
      <h1 className="my-10 sm:my-24 text-4xl sm:text-5xl font-bold text-center">
        Minhas Tarefas
      </h1>

      <div className="flex flex-col items-center gap-3">
        {/* Componente responsável por adicionar as tarefas inseridas. */}
        <SearchAndAddTasks
          setPopupAdd={setPopupAdd}
          updateTasks={updateTasks}
        />

        {/* Componente responsável por fazer a listagem das tarefas armazenadas. */}
        <ShowTasks
          tasks={tasks}
          setTaskPosition={setTaskPosition}
          updateTasks={updateTasks}
          editTask={setPopupEdit}
          deleteTask={setPopupDelete}
        />
      </div>

      {
        popupAdd && (
          <PopupAddTask
            popupAdd={setPopupAdd}
            updateTasks={updateTasks}
          />
        )
      }

      {
        popupEdit && (
          <PopupEditTask
            popupEdit={setPopupEdit}
            taskPosition={taskPosition}
            updateTasks={updateTasks}
          />
        )
      }

      {
        popupDelete && (
          <PopupDeleteTask
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
