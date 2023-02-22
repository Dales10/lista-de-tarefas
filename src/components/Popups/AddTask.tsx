import { useState, FormEvent, Dispatch, SetStateAction, MouseEvent } from 'react';
import Image from 'next/image';

type Props = {
    popupAdd: Dispatch<SetStateAction<boolean>>;
    updateTasks: () => void;
}

const PopupAddTask = ({ popupAdd, updateTasks }: Props) => {
    const positionTop = { top: `${window.pageYOffset}px` };

    const [title, setTitle] = useState('');
    const [msgErrTitle, setMsgErrTitle] = useState('');
    const [description, setDescription] = useState('');
    const [msgErrDescription, setMsgErrDescription] = useState('');

    //Fará a validacação dos dados, e quando forem validos serão guardados.
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let validTitle = false;
        let validDescription = false;

        setTitle(prevState => prevState.trim());
        setDescription(prevState => prevState.trim());

        if (title.length <= 3) {
            setMsgErrTitle('O título é obrigatório, e precisa ter mais que 3 caracteres e no máximo 50.')
        } else {
            setMsgErrTitle('');
            validTitle = true;
        }

        if (description.length <= 3) {
            setMsgErrDescription('A descrição é obrigatório, e precisa ter mais que 3 caracteres e no máximo 1024.')
        } else {
            setMsgErrDescription('');
            validDescription = true;
        }

        //Adiciona os dados em formato de objeto no localstorage, e limpa os useState.
        if (validTitle && validDescription) {
            popupAdd(false);

            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push({
                title,
                description,
                completed: false,
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setTitle('');
            setDescription('');
            updateTasks();
        }
    };

    const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const tagNameElement = (e.target as Element).classList[0];
        const closePopup = ['popup-wrapper', 'popup-closeButton'].some(name => {
            return name === tagNameElement;
        });

        if (closePopup)
            popupAdd(false);
    };

    return (

        <div
            style={positionTop}
            onClick={e => handleClick(e)}
            className="popup-wrapper w-screen h-screen flex justify-center items-center absolute left-0 bg-black bg-opacity-50"
        >

            <form
                onSubmit={e => handleSubmit(e)}
                className="max-w-[600px] w-[90%] relative bg-background m-auto border-b border-[#57E6E6] rounded-default"
            >
                <div
                    onClick={e => handleClick(e)}
                    className='popup-closeButton w-7 h-7 flex justify-center items-center absolute top-4 right-4 bg-white rounded-full'
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
                    Criar Tarefa
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='w-11/12 h-9 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none'
                    />
                    <span className='w-11/12 mt-2 text-red text-xs'>
                        {msgErrTitle}
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
                        maxLength={1024}
                        autoComplete='off'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='w-11/12 max-h-9 pt-1 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none'
                    />
                    <span className='w-11/12 mt-2 text-red text-xs'>
                        {msgErrDescription}
                    </span>
                </div>

                <div className='w-full flex justify-center'>
                    <button
                        type="submit"
                        className="w-[250px] h-12 bg-green rounded-xl font-bold uppercase hover:bg-opacity-80 my-14"
                    >
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PopupAddTask;