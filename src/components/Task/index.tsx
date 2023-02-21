import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import { TasksProps } from '../../../@types/Tasks';

type Props = {
    task: TasksProps;
    editTask: Dispatch<SetStateAction<boolean>>;
    deleteTask: Dispatch<SetStateAction<boolean>>;
}

const Task = ({ task, editTask, deleteTask }: Props) => {
    return (
        <div className="w-[950px] flex justify-between items-center border border-border rounded-default">
            <div className='max-w-[780px] ml-4 py-3 text-justify break-words'>
                <h1 className='text-green text-2xl mb-2'>
                    { task.title }
                </h1>
                <p>
                    { task.description }
                </p>
            </div>
            <div className='flex justify-end items-center gap-4 mr-6'>
                <button
                    type='button'
                    onClick={() => editTask(true)}
                    className='w-[44px] h-[44px] flex justify-center items-center bg-green rounded-[14px] hover:bg-opacity-80'
                >
                    <Image
                        src='/images/editTask.png'
                        alt='Button edit task'
                        width={30}
                        height={30}
                    />
                </button>

                <button
                    type='button'
                    onClick={() => deleteTask(true)}
                    className='w-[44px] h-[44px] flex justify-center items-center bg-red rounded-[14px] hover:bg-opacity-80'
                >
                    <Image
                        src='/images/deleteTask.png'
                        alt='Button delete task'
                        width={28}
                        height={28}
                    />
                </button>
            </div>
        </div>
    );
};

export default Task;
