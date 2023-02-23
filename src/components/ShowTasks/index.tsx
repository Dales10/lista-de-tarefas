import { TaskProps } from '../../../@types/Task';
import { Dispatch, SetStateAction } from 'react';

import Task from "../Task";

type Props = {
    tasks: TaskProps[];
    setTaskPosition: Dispatch<SetStateAction<number>>;
    updateTasks: () => void;
    editTask: Dispatch<SetStateAction<boolean>>;
    deleteTask: Dispatch<SetStateAction<boolean>>;
}

const ShowTasks = ({ tasks, setTaskPosition, updateTasks, editTask, deleteTask }: Props) => {
    return (
        <div className="max-w-[1000px] w-11/12 min-w-[300px] flex flex-col justify-center items-center gap-3 py-9 px-4 bg-background rounded-br-default rounded-bl-default">
            {
                tasks.map((task, index) => {
                    const databaseTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                    let taskPosition = 0;
                    for (let position = 0; position < databaseTasks.length; position++) {
                        if (JSON.stringify(task) === JSON.stringify(databaseTasks[position])) {
                            taskPosition = position;
                            break;
                        }
                    }

                    return (
                        <div
                            key={index}
                            className='w-full'
                        >
                            <Task
                                task={task}
                                taskPosition={taskPosition}
                                setTaskPosition={setTaskPosition}
                                updateTasks={updateTasks}
                                editTask={editTask}
                                deleteTask={deleteTask}
                            />
                        </div>
                    )
                })
            }

            {
                tasks.length === 0 && (
                    <h2 className='text-2xl font-bold'>
                        Adicione uma tarefa.
                    </h2>
                )
            }
        </div>
    );
};

export default ShowTasks;
