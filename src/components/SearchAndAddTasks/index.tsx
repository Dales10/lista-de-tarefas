import { Dispatch, SetStateAction, useRef } from 'react';
import Image from 'next/image';

type Props = {
    searchData: string;
    setSearchData: Dispatch<SetStateAction<string>>;
    search: (searchData: string) => void;
    msgErrsearch: string;
    setPopupAdd: Dispatch<SetStateAction<boolean>>;
    updateTasks: (isCleanButton: boolean) => void;
}

const AddTask = ({ searchData, setSearchData, search, msgErrsearch, setPopupAdd, updateTasks }: Props) => {
    const searchInput = useRef<HTMLInputElement>(null);

    const removeFocus = () => {
        if (searchInput.current !== null)
            searchInput.current.blur();
    }
    
    return (
        <div
            className="max-w-[1000px] w-11/12 min-w-[300px] bg-background pt-1 py-6 rounded-tr-default rounded-tl-default"
        >
            <div className='flex justify-between mt-3'>
                <div className="w-full flex flex-col mx-7 sm:mr-0 gap-1 relative">
                    <label
                        htmlFor="search"
                        className="text-xl"
                    >
                        Pesquisar tarefa(s):
                    </label>

                    <div className='w-full relative pt-2'>
                        <input
                            id="search"
                            maxLength={100}
                            value={searchData}
                            onChange={e => setSearchData(e.target.value)}
                            onKeyUp={e => { if (e.key === 'Enter') { search(searchData); removeFocus() } }}
                            autoComplete='off'
                            ref={searchInput}
                            className="w-full h-9 pt-1 pl-2 pr-8 bg-input border-b-2 border-darkGrey focus:border-cyan transition duration-300 outline-none"
                        />

                        <div
                            onClick={() => { setSearchData(''); updateTasks(true); }}
                            className='popup-closeButton w-5 h-5 flex justify-center items-center absolute top-4 right-1 rounded-full cursor-pointer'
                        >
                            <Image
                                src='/images/closePopup.png'
                                alt='Button close pop-up'
                                width={12}
                                height={12}
                                style={{ pointerEvents: 'none' }}
                            />
                        </div>

                        <span className='mt-2 text-red text-xs'>
                            { msgErrsearch }
                        </span>
                    </div>
                </div>

                <div className='hidden sm:block w-[150px] mt-10 mx-4 sm:mx-8 md:mx-10'>
                    <button
                        type="button"
                        onClick={() => search(searchData)}
                        className="min-w-[100px] sm:min-w-[150px] h-8 sm:h-10 bg-green rounded-xl text-sm font-bold p-1 uppercase hover:bg-opacity-80 transition duration-300 active:scale-90"
                    >
                        Procurar
                    </button>
                </div>
            </div>

            <div className='flex justify-center mt-6'>
                <button
                    type="button"
                    onClick={() => setPopupAdd(true)}
                    className="w-40 h-12 bg-green rounded-xl font-bold uppercase hover:bg-opacity-80 transition duration-300 active:scale-90"
                >
                    Criar Tarefa
                </button>
            </div>
        </div>
    );
};

export default AddTask;
