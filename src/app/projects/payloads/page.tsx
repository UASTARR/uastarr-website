import React from 'react'
import BaseScripts from '@/app/components/scripts/BaseScripts'
import { Metadata } from 'next';
import { getProjects } from '@/library/neon/database';
import Project from '@/app/components/projects/Project';
import RipplingBackground from '@/app/components/videos/RipplingBackground';
import { redirect } from 'next/navigation'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
    title: "Payloads",
};

export const revalidate = 86400; // 60 * 60 * 24 Revalidate once a day

const ProjectsPage = async () => {
    const projectsResponse = await getProjects('payload');
    const projectsData = await projectsResponse.json();
    const projects = projectsData.rows ?? [];

    if (!projects) {
        redirect('/down-for-maintenance');
    }
    // console.log(projects)
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <RipplingBackground />

            {/* <!--Content--> */}
            <div className="h-24"></div>
            <div className="z-20 relative h-32 content-center max-lg:flex max-lg:justify-center max-lg:items-center">
                <h1 className="text-white text-4xl text-left lg:pl-28 flow_in_left delay-200">Payloads</h1>
            </div>
            <div className="flex justify-center flex-row relative z-20">
                <div className="w-10 lg:w-64 grow-0 overflow-hidden"></div>
                <div className="flex flex-col items-center justify-center w-full">
                    {projects.map(async (project: any, index: number) => {
                        // const albumUrl = project.coverFile ? (await getUrl(['photo-albums', project.albumRef, project.coverFile].join('/'))).string : ''
                        const albumUrl = '';
                        return (
                            <div key={index} className="flex flex-col w-full items-center">
                                <div key={index} className="flex flex-col bg-black bg-opacity-70 items-center w-full">
                                    <div className="h-12"></div>
                                    <Project 
                                    title={project.name} 
                                    playlist={project.playlist_link}
                                    albumYear={project.album_year}
                                    albumName={project.album_folder_name}
                                    launchDate={project.launch_date}
                                    albumUrl={albumUrl ? albumUrl : ''}>
                                        {project.description}
                                    </Project>
                                    <div className="h-12"></div>
                                </div>
                                <div className="h-12"></div>
                            </div>
                        )
                    })}
                </div>
                <div className="h-10"></div>
                <div className="w-10 lg:w-64 grow-0 overflow-hidden"></div>
            </div>

        </main>
    )
}

export default ProjectsPage;