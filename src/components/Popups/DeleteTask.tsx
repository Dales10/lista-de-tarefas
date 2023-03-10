import { Dispatch, MouseEvent, SetStateAction, FormEvent } from 'react';
import Image from 'next/image';

import { TaskProps } from '../../../@types/Task';

type Props = {
    popupDelete: Dispatch<SetStateAction<boolean>>;
    taskPosition: number;
    updateTasks: () => void;
}

const PopupDeleteTask = ({ popupDelete, taskPosition, updateTasks }: Props) => {
    const positionTop = { top: `${window.pageYOffset}px` };
    const task: TaskProps = JSON.parse(localStorage.getItem('tasks') || '[]')[taskPosition];

    const DeleteTask = () => {
        const tasks: TaskProps[] = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.splice(taskPosition, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTasks();
    };

    //Verifica se o que foi clicado era o botão de fechar, ou foi fora da popup para fechar a mesma.
    const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | FormEvent) => {
        const tagNameElement = (e.target as Element).classList[0];
        const closePopup = ['popup-wrapper', 'popup-closeButton', 'popup-deleteButton'].some(name => {
            return name === tagNameElement;
        });

        if (closePopup)
            popupDelete(false);
    };

    return (
        <div
            style={positionTop}
            onClick={e => handleClick(e)}
            className="popup-wrapper w-screen h-screen flex justify-center items-center absolute left-0 bg-black bg-opacity-50"
        >
            <div className="max-w-[600px] w-[90%] relative bg-background m-auto border-b border-cyan rounded-default">
                <div
                    onClick={e => handleClick(e)}
                    className='popup-closeButton w-7 h-7 flex justify-center items-center absolute top-4 right-4 bg-darkGrey hover:bg-opacity-70 rounded-full cursor-pointer transition duration-300'
                >
                    <Image
                        src='/images/closePopup.png'
                        alt='Button close pop-up'
                        width={14}
                        height={14}
                        style={{ pointerEvents: 'none' }}
                    />
                </div>

                <h1 className="text-3xl text-center font-bold mt-8">
                    Apagar Tarefa
                </h1>

                <div className="flex flex-col gap-2 mt-8 ml-7">
                    <h2 className='text-xl font-semibold'>
                        Tem certeza que quer excluir a tarefa?
                    </h2>
                    <h2 className="text-xs text-red">
                        Alerta: Ao deletar a tarefa não será possível recuperá-la.
                    </h2>
                </div>

                <div className="w-[calc(100% - 56px)] mt-8 mx-7 py-2 border border-border rounded-md">
                    <div className='flex flex-col text-xs ml-3'>
                        <h1 className='text-green text-xl mb-2'>
                            { task.title }
                        </h1>
                        <p>
                            { task.description }
                        </p>
                    </div>
                </div>


                <div className='w-full flex justify-center'>
                    <button
                        type="submit"
                        onClick={e => { handleClick(e); DeleteTask() }}
                        className="popup-deleteButton w-60 h-12 bg-red hover:bg-opacity-80 rounded-xl font-bold my-14 uppercase transition duration-300 active:scale-90"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupDeleteTask;
