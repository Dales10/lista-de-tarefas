import { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type Props = {
    setPopupAdd: Dispatch<SetStateAction<boolean>>;
    updateTasks: () => void;
}

const AddTask = ({ setPopupAdd, updateTasks }: Props) => {
    const [search, setSearch] = useState('');
    const [msgErrSeearch, setMsgErrSearch] = useState('');

    return (
        <div
            className="max-w-[1000px] w-11/12 min-w-[300px] bg-background pt-1 py-6 sm:py-5 rounded-tr-default rounded-tl-default"
        >
            <div className='sm:flex sm:justify-between'>
                <div className="w-full flex flex-col ml-7 gap-1 relative">
                    <label
                        htmlFor="search"
                        className="text-xl"
                    >
                        Pesquisar tarefa(s):
                    </label>

                    <div className='w-full relative pt-2'>
                        <textarea
                            id="search"
                            maxLength={100}
                            onChange={e => setSearch(e.target.value)}
                            autoComplete='off'
                            className="w-full h-9 pl-2 pr-8 bg-input border-b-2 border-[#57E6E6] outline-none"
                        />

                        <div
                            className='popup-closeButton w-6 h-6 flex justify-center items-center absolute top-[14px] right-2 bg-white rounded-full'
                        >
                            <Image
                                src='/images/closePopup.png'
                                alt='Button close pop-up'
                                width={10}
                                height={10}
                                style={{ pointerEvents: 'none' }}
                            />
                        </div>
                    </div>

                    <span className='mt-2 text-red text-xs'>
                        {msgErrSeearch}
                    </span>
                </div>

                <div className='w-full flex justify-center sm:w-[150px] sm:block mt-8 sm:mt-9 sm:mx-10'>
                    <button
                        type="button"
                        className="min-w-[150px] h-10 bg-green rounded-xl font-bold uppercase hover:bg-opacity-80"
                    >
                        Procurar
                    </button>
                </div>
            </div>

            <div className='flex justify-center mt-4'>
                <button
                    type="button"
                    onClick={() => setPopupAdd(true)}
                    className="w-40 h-12 bg-green rounded-xl font-bold uppercase hover:bg-opacity-80"
                >
                    Criar Tarefa
                </button>
            </div>
        </div>
    );
};

export default AddTask;
