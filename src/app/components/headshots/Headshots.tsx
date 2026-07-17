import { getActiveExecutives } from '@/library/neon/database';
import { getImageUrlDicts } from '@/library/google/drive';
import Image from 'next/image';

const Headshots = async () => {
    const membersResponse = await getActiveExecutives();
    const membersData = await membersResponse.json();
    const members = membersData.rows ?? [];
    const photosDict = await getImageUrlDicts(process.env.google_drive_id!, process.env.google_drive_executive_photos_folder_id!);

    // Update member img_ref_link with the corresponding image URL from Google Drive
    members.forEach((member: any) => {
        if (!member.img_ref_link) {
            const formattedName = `${member.first_name}${member.last_name}`;
            member.img_ref_link = photosDict[formattedName] || process.env.default_member_image_url;
        }
    });
    return (
        <div className="flex flex-wrap justify-center">
            {members.map((member: any, index: number) => (
                <div key={index} className="w-80 h-112 flex flex-col items-center justify-center relative">
                    <Image src={member.img_ref_link} alt={`${member.first_name} ${member.last_name}`} className="w-[245px] h-[323px] object-cover" width={500} height={500} />
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