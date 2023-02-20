const AddTask = () => {
    return (
        <form className="flex items-center bg-background w-[1000px] h-[100px] rounded-tr-default rounded-tl-default">
            <div className="flex flex-col ml-[30px]">
                <label
                    htmlFor="titulo"
                    className="text-xl"
                >
                    Título
                </label>
                <input
                    type="text"
                    id="titulo"
                    className="w-[150px] h-[30px] bg-input rounded-[10px]"
                />
            </div>

            <div className="flex flex-col ml-[30px]">
                <label
                    htmlFor="descricao"
                    className="text-xl"
                >
                    Descrição
                </label>
                <input
                    type="text"
                    id="descricao"
                    className="w-[550px] h-[30px] bg-input rounded-[10px]"
                />
            </div>

            <button
                type="submit"
                className="w-[150px] h-[40px] bg-green rounded-[10px] ml-[60px] font-bold uppercase"
            >
                Adicionar
            </button>
        </form>
    );
};

export default AddTask;
