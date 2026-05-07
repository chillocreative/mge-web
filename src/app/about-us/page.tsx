import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import { constructMetadata } from "@/lib/metadata";
import { Check, Target, Award, Users, BookOpen } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Us | Multi Green Engineering Sdn Bhd",
  description: "Learn about the history, philosophy, vision, and mission of Multi Green Engineering, a leading engineering firm in Malaysia."
});

const team = [
    { name: "MOHD SYAFIQ BIN MOHD SAUFI", position: "Managing Director" },
    { name: "NORAZLINDA BINTI SABARUDIN", position: "Project Manager" },
    { name: "FAM JIA SHIN", position: "Finance Controller" },
    { name: "ERLI NORAZIE BT ALIAS", position: "Human Resources Manager" },
    { name: "NOR LIANA BINTI BAHAROM @ BAHRUN", position: "Account Manager" },
    { name: "HASLINDA BINTI ABD HAMID", position: "Administration Manager" },
]

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
                    <p>Multi Green Engineering Sdn. Bhd. was incorporated under the Companies Act 1965 on 18 March 2014, founded and led by a 100% Bumiputera team of highly skilled professionals across specialised engineering disciplines.</p>
                    <p>The company delivers civil engineering services with a focus on Building Construction and Civil Works, backed by strong financials with RM15 million paid-up capital. We hold a Grade G7 licence from the Construction Industry Development Board (CIDB) and are accredited to ISO 9001:2015, awarded on 5 July 2018.</p>
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
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-10 h-[2px] bg-accent-yellow" />
              <span className="text-accent-yellow font-bold uppercase tracking-widest text-sm">Our Leaders</span>
              <div className="w-10 h-[2px] bg-accent-yellow" />
            </div>
            <Heading level={2} className="uppercase tracking-tight">
                The <span className="text-primary-green italic">Management</span> Team
            </Heading>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white p-6 shadow-md text-center">
              <Users className="w-12 h-12 text-primary-green mx-auto mb-4" />
              <h4 className="font-bold text-primary-green">{member.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{member.position}</p>
            </div>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
};

export default AboutPage;
