import Image from 'next/image';

const ShowTasks = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-[10px] py-[35px] bg-background w-[1000px] rounded-br-default rounded-bl-default">
            <div className="w-[950px] h-[85px] flex justify-between items-center border border-border rounded-default">
                <div>
            oi
                </div>
                <div className='h-full flex items-center gap-4 mr-6'>
                    <div className='w-[44px] h-[44px] flex justify-center items-center bg-green rounded-[14px]'>
                        <Image
                            src='/images/editTask.png'
                            alt='Button edit task'
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className='bg-white rounded-2xl'>
                        <Image
                            src='/images/deleteTask.png'
                            alt='Button delete task'
                            width={44}
                            height={44}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowTasks;
