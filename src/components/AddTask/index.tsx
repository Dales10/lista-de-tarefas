import { FormEvent, useState } from 'react';

type Props = {
    updateTasks: () => void;
}

const AddTask = ({ updateTasks }: Props) => {
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
            updateTasks();
        }
    };

    return (
        <form
            onSubmit={e => handleSubmit(e)}
            className="max-w-[1000px] w-11/12 min-w-[300px] sm:flex sm:justify-between bg-background py-6 sm:py-5 rounded-tr-default rounded-tl-default"
        >
            <div className='w-full sm:flex'>
                <div className="flex flex-col ml-7 gap-1 relative">
                    <label
                        htmlFor="title"
                        className="text-xl"
                    >
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        maxLength={50}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoComplete='off'
                        className="w-11/12 sm:w-[142px] h-9 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none"
                    />
                    <span className='w-11/12 sm:w-[142px] mt-1 sm:mt-2 text-red text-xs'>
                        { msgErrTitle }
                    </span>
                </div>

                <div className="sm:w-full flex flex-col mt-3 sm:mt-0 ml-7 gap-1">
                    <label
                        htmlFor="description"
                        className="text-xl"
                    >
                        Descrição
                    </label>
                    <textarea
                        id="description"
                        rows={5}
                        maxLength={1024}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        autoComplete='off'
                        className="w-11/12 sm:max-w-[550px] sm:w-full h-9 pt-1 pl-2 bg-input border-b-2 border-[#57E6E6] outline-none"
                    />
                    <span className='w-11/12 sm:max-w-[550px] mt-1 sm:mt-2 text-red text-xs'>
                        { msgErrDescription }
                    </span>
                </div>
            </div>


            <div className='w-full flex justify-center sm:w-[150px] sm:block mt-8 sm:mt-6 sm:mx-10'>
                <button
                    type="submit"
                    className="min-w-[150px] h-10 bg-green rounded-xl font-bold uppercase hover:bg-opacity-80"
                >
                    Adicionar
                </button>
            </div>
        </form>
    );
};

export default AddTask;
