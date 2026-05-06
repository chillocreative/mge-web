import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { apiService, Project } from "@/services/api";

export const metadata = constructMetadata({
    title: "Our Engineering Projects | Multi Green Engineering",
    description: "Explore the portfolio of infrastructure and industrial engineering projects completed by Multi Green Engineering across Malaysia."
});

interface TableProject {
    slug: string;
    name: string;
    client: string;
    amount: string;
    startDate: string;
    completionDate: string;
}

const toTableProject = (p: Project): TableProject => ({
    slug: p.slug,
    name: p.title,
    client: p.client,
    amount: p.value,
    startDate: p.start_date,
    completionDate: p.year,
});

const ProjectRow = ({ project }: { project: TableProject }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-4 px-6 text-sm text-gray-800">
            {project.slug ? (
                <Link href={`/projects/${project.slug}`} className="hover:text-primary-green hover:underline">
                    {project.name}
                </Link>
            ) : (
                project.name
            )}
        </td>
        <td className="py-4 px-6 text-sm text-gray-600">{project.client}</td>
        <td className="py-4 px-6 text-sm text-gray-600 text-right">{project.amount}</td>
        <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">{project.startDate || "—"}</td>
        <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">{project.completionDate}</td>
    </tr>
);

const EmptyRow = ({ label }: { label: string }) => (
    <tr>
        <td colSpan={5} className="py-8 px-6 text-center text-sm text-gray-500 italic">
            {label}
        </td>
    </tr>
);

const ProjectsPage = async () => {
    const projectsRes = await apiService.getProjects({ per_page: 100 });
    const allProjects = projectsRes?.data ?? [];

    const currentProjects = allProjects
        .filter((p) => p.status === "in_progress" || p.status === "upcoming")
        .map(toTableProject);
    const previousProjects = allProjects
        .filter((p) => p.status === "completed")
        .map(toTableProject);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-primary-green pt-40 pb-20 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-[2px] bg-accent-yellow" />
                        <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Portfolio</span>
                    </div>
                    <Heading level={1} className="text-white uppercase italic">
                        Engineering <span className="text-accent-yellow">Projects</span>
                    </Heading>
                </div>
            </div>

            <Section>
                <Heading level={2} className="mb-8 uppercase text-center">Current <span className="text-primary-green italic">Projects</span></Heading>
                <div className="overflow-x-auto bg-white shadow-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                                <th className="py-3 px-6 text-left">Project Name</th>
                                <th className="py-3 px-6 text-left">Client</th>
                                <th className="py-3 px-6 text-right">Amount (RM)</th>
                                <th className="py-3 px-6 text-left">Start Date</th>
                                <th className="py-3 px-6 text-left">Completion Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {currentProjects.length > 0
                                ? currentProjects.map((p, i) => <ProjectRow key={`curr-${i}`} project={p} />)
                                : <EmptyRow label="No current projects yet." />}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section variant="industrial">
                <Heading level={2} className="mb-8 uppercase text-center">Previous <span className="text-primary-green italic">Projects</span></Heading>
                <div className="overflow-x-auto bg-white shadow-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                                <th className="py-3 px-6 text-left">Project Name</th>
                                <th className="py-3 px-6 text-left">Client</th>
                                <th className="py-3 px-6 text-right">Amount (RM)</th>
                                <th className="py-3 px-6 text-left">Start Date</th>
                                <th className="py-3 px-6 text-left">Completion Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {previousProjects.length > 0
                                ? previousProjects.map((p, i) => <ProjectRow key={`prev-${i}`} project={p} />)
                                : <EmptyRow label="No previous projects yet." />}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ProjectsPage;
