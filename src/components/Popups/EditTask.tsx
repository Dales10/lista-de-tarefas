import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type Props = {
    popupEdit: Dispatch<SetStateAction<boolean>>;
}

const EditTask = ({ popupEdit }: Props) => {
    const positionTop = { top: `${window.pageYOffset}px` }

    return (
        <div
            className="w-screen h-screen flex justify-center items-center absolute left-0 bg-black bg-opacity-50"
            style={positionTop}
        >
            <div className="w-[800px] relative bg-background rounded-default">
                <div
                    onClick={() => popupEdit(false)}
                    className='flex justify-center items-center absolute top-4 right-4 bg-white rounded-full w-7 h-7'
                >
                    <Image
                        src='/images/closePopup.png'
                        alt='Button close pop-up'
                        width={14}
                        height={14}
                    />
                </div>
                <h1 className="text-3xl text-center font-bold mt-8">
                    Editar Tarefa
                </h1>
                <div>
                    <label>
                        Título
                        <input
                            type="text"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
