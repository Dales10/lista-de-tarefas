import { useState, FormEvent, Dispatch, SetStateAction, MouseEvent } from 'react';
import Image from 'next/image';

import { TaskProps } from '../../../@types/Task';
import { useEffect } from 'react';

type Props = {
    popupEdit: Dispatch<SetStateAction<boolean>>;
    taskPosition: number;
    updateTasks: () => void;
}

const PopupEditTask = ({ popupEdit, taskPosition, updateTasks }: Props) => {
    const positionTop = { top: `${window.pageYOffset}px` };
    const task: TaskProps = JSON.parse(localStorage.getItem('tasks') || '[]')[taskPosition];

    const [title, setTitle] = useState(task.title);
    const [msgErrTitle, setMsgErrTitle] = useState('');
    const [styleInputTitle, setStyleInputTitle] = useState({ borderColor: '#202124' });
    const [description, setDescription] = useState(task.description);
    const [msgErrDescription, setMsgErrDescription] = useState('');
    const [styleInputDescription, setStyleInputDescription] = useState({ borderColor: '#202124' });
    const [hasContent, setHasContent] = useState(true);

    //Fará a validacação dos dados, e quando forem validos a tarefa será trocada pela nova corrigida.
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        popupEdit(false);

        //Troca atividade que estava sendo editada por uma nova com os dados atualizados.
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const formattedTitle = title.trim();
        const formattedDescription = description.trim();
        tasks.splice(taskPosition, 1, {
            title: formattedTitle,
            description: formattedDescription,
            completed: false,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTitle('');
        setDescription('');
        updateTasks();
    };

    //Verifica se o que foi clicado era o botão de fechar, ou foi fora da popup para fechar a mesma.
    const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const tagNameElement = (e.target as Element).classList[0];
        const closePopup = ['popup-wrapper', 'popup-closeButton'].some(name => {
            return name === tagNameElement;
        });

        if (closePopup)
            popupEdit(false);
    };

    const validateTitleData = () => {
        if (title.length <= 3) {
            setMsgErrTitle('O título é obrigatório, e precisa ter mais que 3 caracteres e no máximo 50.');
            setStyleInputTitle({ borderColor: '#ff0000'});
        } else {
            setMsgErrTitle('');
            setStyleInputTitle({ borderColor: '#57E6E6'});
        }
    };

    const handleStyleInputTitle = () => {
        if (!msgErrTitle.length)
            setStyleInputTitle({ borderColor: '#57E6E6'});
    };

    const validateDescriptionData = () => {
        if (description.length <= 3) {
            setMsgErrDescription('A descrição é obrigatório, e precisa ter mais que 3 caracteres e no máximo 1024.');
            setStyleInputDescription({ borderColor: '#ff0000'});
        } else {
            setMsgErrDescription('');
            setStyleInputDescription({ borderColor: '#57E6E6'});
        }
    }

    const handleStyleInputDescription = () => {
        if (!msgErrDescription.length)
            setStyleInputDescription({ borderColor: '#57E6E6'});
    };

    useEffect(() => {
        if (title.length || description.length) {
            validateTitleData();
            validateDescriptionData();

            const validData = title.trim().length > 3 && description.trim().length > 3;
            const differentData = task.title !== title || task.description !== description;
            if (validData && differentData)
                setHasContent(false);
            else
                setHasContent(true);
        }
    }, [title, description]);

    return (
        <div
            style={positionTop}
            onClick={e => handleClick(e)}
            className="popup-wrapper w-screen h-screen flex justify-center items-center absolute left-0 bg-black bg-opacity-50"
        >
            <form
                onSubmit={e => handleSubmit(e)}
                className="max-w-[600px] w-[90%] relative bg-background m-auto border-b border-cyan rounded-default"
            >
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
                    Editar Tarefa
                </h1>

                <div className='flex flex-col gap-1 mt-8 ml-7'>
                    <label
                        htmlFor='editTitle'
                        className='text-xl font-semibold'
                    >
                        Título:
                    </label>

                    <input
                        type="text"
                        id='editTitle'
                        style={styleInputTitle}
                        autoComplete='off'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onFocus={handleStyleInputTitle}
                        onBlur={validateTitleData}
                        className='w-11/12 h-9 pl-2 bg-input border-b-2 border-darkGrey focus:border-cyan transition duration-300 outline-none'
                    />

                    <span className='w-11/12 text-red text-xs mt-2'>
                        { msgErrTitle }
                    </span>
                </div>

                <div className='flex flex-col gap-1 mt-8 ml-7'>
                    <label
                        htmlFor='editDescription'
                        className='text-xl font-semibold'
                    >
                        Descrição:
                    </label>

                    <textarea
                        id="editDescription"
                        style={styleInputDescription}
                        maxLength={1024}
                        autoComplete='off'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        onFocus={handleStyleInputDescription}
                        onBlur={validateDescriptionData}
                        className='w-11/12 max-h-9 bg-input pt-1 pl-2 border-b-2 border-darkGrey focus:border-cyan  transition duration-300 outline-none'
                    />

                    <span className='w-11/12 text-red text-xs mt-2'>
                        { msgErrDescription }
                    </span>
                </div>

                <div className='w-full flex justify-center'>
                    <button
                        type="submit"
                        disabled={hasContent}
                        className="w-[250px] h-12 bg-green hover:bg-opacity-80 rounded-xl font-bold my-14 uppercase transition duration-300 active:scale-90 disabled:scale-100 disabled:bg-darkGrey disabled:text-[#606060] disabled:cursor-not-allowed"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PopupEditTask;
