import { promises as fs } from 'fs';

async function getHeadshots() {
    const file = await fs.readFile(process.cwd() + '/public/assets/database/headshots.json', 'utf-8');
    const data = JSON.parse(file);
    return data;
}

const Headshots = async () => {
    const headshots = await getHeadshots();
    return (
        <div className="flex flex-wrap justify-center">
            {headshots.map((headshot: Array<string>, index: number) => (
                <div key={index} className="w-72 h-112 flex flex-col items-center justify-center">
                    <img src={headshot[2]} alt={headshot[0]} />
                    <p className="text-white">{headshot[0]}</p>
                    <p className="text-white">{headshot[1]}</p>
                </div>
            ))}
        </div>
    );
}

export default Headshots;