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
    date: string;
}

const fallbackCurrentProjects: TableProject[] = [
    {
        slug: "",
        name: "Menyiapkan Baki Kerja Rancangan Tebatan Banjir (RTB) Lembangan Sungai Muar",
        client: "Jabatan Pengairan dan Saliran Malaysia",
        amount: "288,000,000.00",
        date: "31.10.2025 - 31.10.2027",
    },
];

const fallbackPreviousProjects: TableProject[] = [
    {
        slug: "",
        name: "Projek Pembangunan Lembangan Sungai Bersepadu Sungai Golok (KESBAN) Fasa 1",
        client: "Bina Mekar Sdn Bhd",
        amount: "380,856,741.00",
        date: "01.06.2018 - 31.06.2024",
    },
    {
        slug: "",
        name: "Rancangan Tebatan Banjir (RTB) Lembangan Sungai Muar, Johor",
        client: "Bina Mekar Sdn Bhd",
        amount: "134,970,834.00",
        date: "06.05.2019 - 18.10.2024",
    },
    {
        slug: "",
        name: "Cadangan Kerja-Kerja Membina Dan Menyiapkan Jalan Baru Dari Kampung Belukar Durian Ke Persimpangan Felda Waha",
        client: "Bina Mekar Sdn Bhd",
        amount: "51,137,192.89",
        date: "24.10.2017 - 23.10.2019",
    },
    {
        slug: "",
        name: "Projek Menaiktaraf Jalan Muar - Tangkak – Segamat, Johor (Fasa 1 : Segamat-Tangkak) - Pakej 3",
        client: "Bina Mekar Sdn Bhd",
        amount: "134,629,116.00",
        date: "01.09.2016 - 09.12.2019",
    },
    {
        slug: "",
        name: "Projek Menaiktaraf Jalan Muar-Tangkak-Segamat, Johor (Fasa: Segamat-Tangkak) Pakej 2",
        client: "Bina Mekar Sdn Bhd",
        amount: "119,308,367.50",
        date: "14.03.2012 - 30.07.2015",
    },
];

const toTableProject = (p: Project): TableProject => ({
    slug: p.slug,
    name: p.title,
    client: p.client,
    amount: p.value,
    date: p.year,
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
        <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">{project.date}</td>
    </tr>
);

const ProjectsPage = async () => {
    const projectsRes = await apiService.getProjects({ per_page: 100 });
    const allProjects = projectsRes?.data ?? [];

    const cmsCurrent = allProjects
        .filter((p) => p.status === "in_progress" || p.status === "upcoming")
        .map(toTableProject);
    const cmsPrevious = allProjects
        .filter((p) => p.status === "completed")
        .map(toTableProject);

    const currentProjects = cmsCurrent.length ? cmsCurrent : fallbackCurrentProjects;
    const previousProjects = cmsPrevious.length ? cmsPrevious : fallbackPreviousProjects;

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
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {currentProjects.map((p, i) => <ProjectRow key={`curr-${i}`} project={p} />)}
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
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {previousProjects.map((p, i) => <ProjectRow key={`prev-${i}`} project={p} />)}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Footer />
        </main>
    );
};

export default ProjectsPage;
