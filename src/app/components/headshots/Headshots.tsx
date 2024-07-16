import { getHeadshots } from '@/library/firebase/firestore';

const Headshots = async () => {
    const headshots = await getHeadshots();
    return (
        <div className="flex flex-wrap justify-center">
            {headshots.map((headshot: any, index: number) => (
                <div key={index} className="w-80 h-112 flex flex-col items-center justify-center relative">
                    <img src={headshot.imgref} alt={headshot.name} className="w-[245px] h-[323px] object-cover"/>
                    <div className="absolute right-6 bottom-6 bg-green-700 h-20 w-52 py-3 px-3">
                        <p className="text-white text-lg font-bold">{headshot.name}</p>
                        <div className="h-1"></div>
                        <p className="text-white text-sm">{headshot.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Headshots;