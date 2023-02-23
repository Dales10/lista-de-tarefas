import { useEffect, useState } from "react";

import SearchAndAddTasks from "@/components/SearchAndAddTasks";
import ShowTasks from "@/components/ShowTasks";

import PopupAddTask from './../components/Popups/AddTask';
import PopupEditTask from "@/components/Popups/EditTask";
import PopupDeleteTask from "@/components/Popups/DeleteTask";
import { TaskProps } from '../../@types/Task';

const Home = () => {
  const [popupAdd, setPopupAdd] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskPosition, setTaskPosition] = useState(-1);
  const [searchData, setSearchData] = useState('');
  const [msgErrsearch, setMsgErrSearch] = useState('');

  //Atualiza a lista de tarefas sempre que é chamado.
  const updateTasks = (isCleanButton?: boolean) => {
    //Se o campo "completed" de uma tarefa tiver mudado, e ao mesmo tempo o mecanismo de busca estiver em uso e, a função não tiver sido chamada pelo botão de limpar o campo de pesquisa, volta a exibir as tarefas que possuem a palavra/frase da pesquisa, se não, mostra todas as tarefas armazenadas.
    if (searchData.length !== 0 && !isCleanButton) {
      search(searchData);
    } else {
      setTasks(
        JSON.parse(localStorage.getItem('tasks') || '[]'),
      );
    }
  };

  //Retorna todas as atividades onde foi encontrada a presença da string inserida.
  const search = (searchData: string) => {
    const tasks: TaskProps[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (searchData.length === 0) {
      setTasks(tasks);
      setMsgErrSearch('Sem palavra(s) chave(s).');

      setTimeout(() => {
        setMsgErrSearch('');
      }, 3000);
    } else {
      const selectedTasks: TaskProps[] = tasks.filter(task => {
        const formatedData = searchData.toLocaleLowerCase().trim();
        if (checkData(task, formatedData)) {
          return true;
        } else {
          const datas = formatedData.split(' ');
          for (let data of datas) {
            if (checkData(task, data))
              return true;
          }
        }
      });
      setTasks(selectedTasks);
    }
  };

  //Verifica se a string passada está presente no título ou descrição, retornando um booleano como resposta.
  const checkData = (task: TaskProps, data: string) => {
    const titleContains = task.title.toLocaleLowerCase().includes(data);
    const descriptionContains = task.description.toLocaleLowerCase().includes(data);

    return titleContains || descriptionContains;
  };

  //Quando uma popup é aberta, esconde a rolagem lateral para não ser possível interagir com o fundo.
  useEffect(() => {
    if (popupAdd || popupEdit || popupDelete)
      document.body.style.overflowY = 'hidden';
    else
      document.body.style.overflowY = 'visible';
  }, [popupAdd || popupEdit || popupDelete]);

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
          searchData={searchData}
          setSearchData={setSearchData}
          search={search}
          msgErrsearch={msgErrsearch}
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
