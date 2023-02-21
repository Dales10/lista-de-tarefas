import { FormEvent, useState } from 'react';

type Props = {
    addingTask: () => void;
}

const AddTask = ({ addingTask }: Props) => {
    const [title, setTitle] = useState('');
    const [msgErrTitle, setMsgErrTitle] = useState('');
    const [description, setDescription] = useState('');
    const [msgErrDescription, setMsgErrDescription] = useState('');

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

        if (validTitle && validDescription) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push({
                title,
                description,
                completed: false,
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setTitle('');
            setDescription('');
            addingTask();
        }
    };

    return (
        <form onSubmit={e => handleSubmit(e)} className="flex bg-background w-[1000px] py-5 rounded-tr-default rounded-tl-default">
            <div className="flex flex-col ml-7 gap-1 relative">
                <label
                    htmlFor="titulo"
                    className="text-xl"
                >
                    Título
                </label>
                <input
                    type="text"
                    id="titulo"
                    maxLength={50}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    autoComplete='off'
                    className="w-[142px] h-9 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none"
                />
                <span className='w-[150px] mt-2 text-red text-xs'>
                    { msgErrTitle }
                </span>
            </div>

            <div className="flex flex-col ml-7 gap-1">
                <label
                    htmlFor="descricao"
                    className="text-xl"
                >
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    rows={5}
                    maxLength={1024}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    autoComplete='off'
                    className="w-[550px] h-9 pt-1 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none"
                />
                <span className='w-[542px] mt-2 text-red text-xs'>
                    { msgErrDescription }
                </span>
            </div>

            <button
                type="submit"
                className="w-[150px] h-10 bg-green rounded-xl ml-14 font-bold uppercase hover:bg-opacity-95 mt-6"
            >
                Adicionar
            </button>
        </form>
    );
};

export default AddTask;
