import AddTask from "@/components/AddTask";
import ShowTasks from "@/components/ShowTasks";

const Home = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-center">
        Minhas Tarefas
      </h1>

      <div className="flex flex-col mt-24 gap-3">
        <AddTask />
        <ShowTasks />
      </div>
    </>
  );
};

export default Home;
