import React from 'react'
import BaseScripts from '../../components/scripts/BaseScripts'
import { Metadata } from 'next';
import { getProjects } from '@/library/firebase/firestore';
import Project from '@/app/components/projects/Project';

export const metadata: Metadata = {
    title: "Ground Station",
};

export const dynamic = 'force-dynamic';

const ProjectsPage = async () => {
    const projects = await getProjects('ground-station')
    // console.log(projects)
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            {/* <!--Content--> */}
            <div className="h-24"></div>
            <div className="z-20 relative h-32 content-center max-lg:flex max-lg:justify-center max-lg:items-center">
                <h1 className="text-white text-4xl text-left lg:pl-28 flow_in_left delay-200">Ground Station</h1>
            </div>
            <div className="flex justify-center flex-row relative z-20">
                <div className="w-10 lg:w-64 grow-0 overflow-hidden"></div>
                <div className="flex flex-col items-center justify-center w-full">
                    {projects.map((project, index) => {
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
                                    launchDate={project.launchDate}>
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