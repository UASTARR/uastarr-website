import { getActiveExecutives } from '@/library/neon/database';
import Image from 'next/image';

const Headshots = async () => {
    const membersResponse = await getActiveExecutives();
    const members = await membersResponse.json();
    return (
        <div className="flex flex-wrap justify-center">
            {members.map((member: any, index: number) => (
                <div key={index} className="w-80 h-112 flex flex-col items-center justify-center relative">
                    <Image src={member.img_ref_link === null ? process.env.DEFAULT_MEMBER_IMAGE_URL! : member.img_ref_link} alt={`${member.first_name} ${member.last_name}`} className="w-[245px] h-[323px] object-cover" width={500} height={500} />
                    <div className="absolute right-6 bottom-6 bg-green-700 w-52 py-3 px-3">
                        <p className="text-white text-lg font-bold">{member.first_name} {member.last_name}</p>
                        <div className="h-1"></div>
                        <p className="text-white text-sm">{member.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Headshots;