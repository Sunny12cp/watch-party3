import RoomActionButtons from "@/components/Buttons/RoomActionButtons";
import Controls from "@/components/ControlsUI/Controls";

function Home() {
    return (
        <main className="bg-neutral-900 h-screen flex items-center justify-center text-center">
            <div className="bg-neutral-950 py-60 px-44 rounded-xl relative  ">
                <h1 className="text-neutral-100 text-7xl font-cubano mx-auto leading-tight">
                    Let's Start a Watch Party
                </h1>
                <RoomActionButtons />
                <Controls />
            </div>
        </main>
    );
}

export default Home;
