import { Dispatch, SetStateAction, MouseEvent } from 'react';
import Image from 'next/image';

import { TaskProps } from '../../../@types/Task';

type Props = {
    task: TaskProps;
    taskPosition: number;
    setTaskPosition: Dispatch<SetStateAction<number>>;
    updateTasks: () => void;
    editTask: Dispatch<SetStateAction<boolean>>;
    deleteTask: Dispatch<SetStateAction<boolean>>;
}

const Task = ({ task, taskPosition, setTaskPosition, updateTasks, editTask, deleteTask }: Props) => {
    const changeTaskState = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const tagNameElement = (e.target as Element).classList[0];

        const changeState = ['editButton', 'deleteButton'].some(name => {
            return name === tagNameElement;
        });

        //Caso o elemento que tenha sido clicado não tenha sido os botões de editar e deletar, troca o booleano da propriedade completed pelo seu oposto.
        if (!changeState) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.splice(taskPosition, 1, {
                title: task.title,
                description: task.description,
                completed: !task.completed,
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTasks();
        }
    };

    return (
        <div
            onClick={e => changeTaskState(e)}
            className="max-w-[950px] w-full flex justify-between items-center m-auto border border-border rounded-default"
        >
            <div className='max-w-[780px] w-full ml-4 mr-2 sm:mr-8 py-3 sm:py-3 text-justify break-words'>
                <h1
                    className='text-2xl mb-2'
                    style={ task.completed ? { textDecoration: 'line-through', color: '#1D1D1D' } : { textDecoration: 'none', color: '#00CC00' } }
                >
                    { task.title }
                </h1>
                <p
                    style={ task.completed ? { textDecoration: 'line-through', color: '#1D1D1D' } : { textDecoration: 'none', color: '#FFFFFF' } }
                >
                    { task.description }
                </p>
            </div>

            <div className='flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 sm:mr-6 p-4 sm:p-0'>
                {/* Botão de editar tarefa. */}
                <button
                    type='button'
                    onClick={() => { editTask(true); setTaskPosition(taskPosition) }}
                    className='editButton w-[44px] h-[44px] flex justify-center items-center bg-green rounded-[14px] hover:bg-opacity-80'
                >
                    <Image
                        src='/images/editTask.png'
                        alt='Button edit task'
                        width={30}
                        height={30}
                        style={{ pointerEvents: 'none' }}
                    />
                </button>

                {/* Botão de deletar tarefa. */}
                <button
                    type='button'
                    onClick={() => { deleteTask(true); setTaskPosition(taskPosition) }}
                    className='deleteButton w-[44px] h-[44px] flex justify-center items-center bg-red rounded-[14px] hover:bg-opacity-80'
                >
                    <Image
                        src='/images/deleteTask.png'
                        alt='Button delete task'
                        width={28}
                        height={28}
                        style={{ pointerEvents: 'none' }}
                    />
                </button>
            </div>
        </div>
    );
};

export default Task;
