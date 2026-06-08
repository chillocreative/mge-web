import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { Check, Target, Award, BookOpen } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Us | Multi Green Engineering Sdn Bhd",
  description: "Learn about the history, philosophy, vision, and mission of Multi Green Engineering, a leading engineering firm in Malaysia."
});

const team = [
    {
        name: "MOHD SYAFIQ BIN MOHD SAUFI",
        position: "Managing Director",
        image: "/team/syafiq.png",
        bio: "Mechanical Engineering professional with extensive experience across oil & gas, manufacturing, engineering, and project management. Holds a Bachelor of Engineering (Hons) in Mechanical Engineering from Universiti Malaysia Pahang. Has held senior engineering and project leadership roles at Petronas Carigali Sdn Bhd, Panasonic Manufacturing Malaysia Berhad, STMicroelectronics Sdn Bhd, and Durukan Asia Berhad. Since April 2025, leads the strategic direction and operations of Multi Green Engineering Sdn Bhd.",
    },
    {
        name: "NORAZLINDA BINTI SABARUDIN",
        position: "Project Manager",
        image: "/team/noraz.png",
        bio: "Holds an Executive Master in Business Management from Universiti Malaysia Pahang (2024) and a Degree in Civil Engineering from Universiti Teknologi Malaysia (2015), with over 19 years of experience in civil engineering and project management across the government and private sectors. She began her career at Jabatan Pengairan dan Saliran Malaysia as a Technical Assistant (2005–2012), followed by roles as Project Manager at Star Gains Global and Senior Project Manager at Elreka Sdn Bhd, and later Project Manager at Sarawak Industrialised Building System Sdn Bhd. Since October 2025, she has served as Project Manager at Multi Green Engineering, responsible for project planning, execution, coordination, and delivery in compliance with client and regulatory requirements.",
    },
    {
        name: "FAM JIA SHIN",
        position: "Finance Controller",
        image: "/team/fam.png",
        bio: "Holds a Bachelor of Business and Commerce from Monash University and is a Member of CPA Australia, with over 10 years of professional experience in finance, auditing, and corporate financial management. He began his career at Crowe Horwath as a Senior External Auditor (2014–2018), handling audit engagements, financial reporting, and compliance advisory for various corporate clients. Since March 2018, he has served as Finance Controller at Multi Green Engineering, responsible for financial planning, budgeting, statutory reporting, audit coordination, and overall financial governance of the company.",
    },
    {
        name: "ERLI NORAZIE BT ALIAS",
        position: "Human Resources Manager",
        image: "/team/erli.png",
        bio: "Holds a Bachelor in Human Resource Management from Universiti Teknologi MARA, with over 10 years of experience in human resources management and recruitment. She began her career as a Recruitment Consultant at Firina Management. Since May 2015, she has served as Human Resources Manager at Multi Green Engineering, responsible for human capital planning, recruitment, employee relations, performance management, and compliance with labour regulations.",
    },
    {
        name: "NOR LIANA BINTI BAHAROM @ BAHRUN",
        position: "Account Manager",
        image: "/team/liana.png",
        bio: "Holds a Diploma in Accounts from Polytechnic Sultan Abdul Halim Mu'adzam Shah and a Bachelor of Science (Hons) in Finance from Universiti Utara Malaysia, with over 20 years of experience in accounting and financial administration. She began her career as a Project Supervisor at Adn Minda Management Services, followed by a role as Account Clerk at Kim Yam Trading Sdn Bhd. Since November 2005, she has served as Account Manager at Multi Green Engineering, overseeing day-to-day accounting operations, financial documentation, reporting, and compliance with statutory and internal requirements.",
    },
    {
        name: "HASLINDA BINTI ABD HAMID",
        position: "Administration Manager",
        image: "/team/haslinda.png",
        bio: "Holds a Bachelor of Science (Hons) in Malay Studies from University of Malaya (2008), with over 16 years of experience in administration and corporate support functions. She began her career as an Administration Assistant at Multi Green Engineering in 2008 and was promoted to Administration Manager in 2012. In her current role, she oversees administrative operations, documentation control, office management, and internal coordination to support overall business efficiency.",
    },
]

const [lead, ...members] = team;

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-primary-green pt-40 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-accent-yellow" />
            <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Story</span>
          </div>
          <Heading level={1} className="text-white uppercase italic">
            About <span className="text-accent-yellow">Our Company</span>
          </Heading>
        </div>
      </div>

      {/* Introduction Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <Heading level={2} className="uppercase tracking-tight mb-6">
                    MULTI GREEN <span className="text-primary-green italic">ENGINEERING</span>
                </Heading>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>MULTI GREEN ENGINEERING SDN. BHD. was incorporated under the Company Act 1965 on March 18, 2014. This company is established and run by a group of professional workforces which comprises of 100% Bumiputera high-skilled in specific areas.</p>
                    <p>This company provides services in the Construction Engineering field specifically in Infra and Civil Works with strong financial Capital Paid up RM15,000,000.00. It started its construction activity with Grade G7 licenses from the Construction Industry Development Board (&quot;CIDB&quot;) and has been accredited and awarded ISO 9001: 2015 on July 5, 2018.</p>
                </div>
            </div>
            <div className="p-8 bg-white shadow-lg border-l-4 border-primary-green">
                <Heading level={3} className="text-primary-green mb-4 flex items-center gap-3"><Target /> Our Mission</Heading>
                <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary-green shrink-0" /> To be an aggressive, professional and influential company in improving competitiveness.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary-green shrink-0" /> Provide the best and quality service to provide high satisfaction according to the customer's needs.</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary-green shrink-0" /> Ensure continuous performance improvement through human resource development and business excellence.</li>
                </ul>
            </div>
        </div>
      </Section>

      {/* Philosophy & Quality Policy */}
      <Section variant="industrial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-white shadow-lg">
                <Heading level={3} className="text-primary-green mb-4 flex items-center gap-3"><BookOpen /> Company Philosophy</Heading>
                <p className="text-gray-600 text-sm">Our philosophy is based on the best quality of service and efficiency. The company always strives to carry out and maintain the best style of management by promising optimum service to all of whom the company render the work.</p>
            </div>
            <div className="p-8 bg-white shadow-lg">
                 <Heading level={3} className="text-primary-green mb-4 flex items-center gap-3"><Award /> Quality Policy</Heading>
                <p className="text-gray-600 text-sm">We are fully committed to providing quality construction services to our clients. For us, quality means competition, high aesthetic workmanship, efficiency, awareness of safety, and courtesy.</p>
            </div>
        </div>
      </Section>
      
      {/* Team Section */}
      <Section className="bg-[#abb3b6]">
        <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-10 h-[2px] bg-primary-green/40" />
              <span className="text-primary-green font-bold uppercase tracking-widest text-sm">Our Leaders</span>
              <div className="w-10 h-[2px] bg-primary-green/40" />
            </div>
            <Heading level={2} className="uppercase tracking-tight text-primary">
                The <span className="text-primary-green italic">Management</span> Team
            </Heading>
        </div>

        {/* Featured leader */}
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-8 md:gap-14 items-center pb-14 mb-14 border-b border-primary/15">
          <div className="flex justify-center md:justify-start">
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden">
              <img src={lead.image} alt={lead.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">{lead.name}</h3>
            <div className="flex items-center gap-2.5 justify-center md:justify-start mt-3 mb-5">
              <span className="w-7 h-[2px] bg-primary-green" />
              <span className="text-primary-green text-xs font-bold uppercase tracking-[0.2em]">{lead.position}</span>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-2xl">{lead.bio}</p>
          </div>
        </div>

        {/* Management team */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
          {members.map((member) => (
            <div key={member.name} className="w-full sm:w-[44%] lg:w-[29%] flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-5">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-bold text-primary leading-tight">{member.name}</h4>
              <span className="text-[11px] font-bold text-primary-green uppercase tracking-[0.18em] mt-2 mb-3">{member.position}</span>
              <p className="text-[13px] text-gray-700 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default AboutPage;
