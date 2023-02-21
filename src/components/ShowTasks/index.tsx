import { TasksProps } from '../../../@types/Tasks';
import { Dispatch, SetStateAction } from 'react';

import Task from "../Task";

type Props = {
    tasks: TasksProps[];
    editTask: Dispatch<SetStateAction<boolean>>;
    deleteTask: Dispatch<SetStateAction<boolean>>;
}

const ShowTasks = ({ tasks, editTask, deleteTask }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center gap-[10px] py-[35px] bg-background w-[1000px] rounded-br-default rounded-bl-default mb-10">
            {
                tasks.map((task, index) => {
                    return (
                        <div key={index}>
                            <Task
                                task={task}
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
