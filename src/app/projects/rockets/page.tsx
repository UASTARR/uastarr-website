import React from 'react'
import BaseScripts from '../../components/scripts/BaseScripts'
import { Metadata } from 'next';
import { getProjects } from '@/library/firebase/firestore';
import Project from '@/app/components/projects/Project';
import { getUrl } from '@/library/firebase/storage';
import RipplingBackground from '@/app/components/videos/RipplingBackground';

export const metadata: Metadata = {
    title: "Rockets",
};

export const dynamic = 'force-dynamic';

const ProjectsPage = async () => {
    const projects = await getProjects('rocket')
    // console.log(projects)
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <RipplingBackground />

            {/* <!--Content--> */}
            <div className="h-24"></div>
            <div className="z-20 relative h-32 content-center max-lg:flex max-lg:justify-center max-lg:items-center">
                <h1 className="text-white text-4xl text-left lg:pl-28 flow_in_left delay-200">Rockets</h1>
            </div>
            <div className="flex justify-center flex-row relative z-20">
                <div className="w-10 lg:w-64 grow-0 overflow-hidden"></div>
                <div className="flex flex-col items-center justify-center w-full">
                    {projects.map( async (project, index) => {
                        const albumUrl = project.coverFile ? (await getUrl(['photo-albums', project.albumRef, project.coverFile].join('/'))).string : ''
                        return (
                            <div key={index} className="flex flex-col w-full items-center">
                                <div key={index} className="flex flex-col bg-black bg-opacity-70 items-center w-full">
                                    <div className="h-12"></div>
                                    <Project 
                                    title={project.name} 
                                    playlist={project.playlistLink} 
                                    logos={project.logosRef}
                                    album={project.albumRef}
                                    albumName={project.albumName}
                                    launchDate={project.launchDate}
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