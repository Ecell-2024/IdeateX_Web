'use client';
import  { useState } from "react";
import Heading from "./Heading"; // Adjust the path as needed
import { ArrowRight } from "lucide-react"; // Use lucide-react for the arrow icon

const faqs = [
  {
    question: "What is IDEATEX?",
    answer: "IDEATEX is an innovation-driven event that provides a platform for aspiring entrepreneurs to present their unique business ideas, receive feedback, and network with industry experts.",
  },
  {
    question: "Who can participate in IDEATEX?",
    answer: "IDEATEX is open to all students, entrepreneurs, and innovators. Teams can consist of 1-4 members.",
  },
  {
    question: "What type of ideas are allowed?",
    answer: "The business ideas presented must be original, feasible, and capable of creating a positive impact.",
  },
  {
    question: "What is the structure of the event?",
    answer: "IDEATEX consists of a single round where teams present their business ideas. The best ideas are chosen based on feasibility, creativity, and impact.",
  },
  {
    question: "How long should the presentation be?",
    answer: "The duration for each presentation will be specified in the event guidelines. Generally, it lasts around 5-10 minutes, followed by a Q&A session.",
  },
  {
    question: "Do I need prior business experience to participate?",
    answer: "No, prior business experience is not required. We encourage all innovative thinkers with fresh ideas to participate.",
  },
  {
    question: "What is the judging criteria?",
    answer: "Judges will evaluate ideas based on originality, practicality, scalability, market potential, and overall presentation quality.",
  }, {
    question: "Can I update my submission after registration?",
    answer: "Once registered, you can update your submission before the submission deadline. Make sure to check the event guidelines for deadlines and updates.",
  },{
    question: "What happens after the event?",
    answer: "Post-event, you’ll receive feedback from judges and mentors. There will be opportunities to network and explore funding or partnership opportunities for your idea.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="flex flex-col md:flex-row items-center  text-white p-0 md:p-8">
      {/* Left Side with Heading */}
      <div className="md:w-[40%] w-full flex items-start h-full pr-8">
        <Heading top="Solutions for Your Curiosities" med="IdeaTex" last="HELPDESK" />
      </div>

      {/* Right Side with FAQ */}
      <div className="md:w-[60%] w-full mt-8 md:mt-0 h-[60vh] overflow-y-auto hide-scrollbar hide-scrollbar::-webkit-scrollbar space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            className="p-6 rounded-lg border-2 border-[#26222D] cursor-pointer bg-[#110C1A] transition-all ease-in-out duration-300"
          >
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-[700] text-[#d2d2d2]">
                {faq.question}
              </p>
              <ArrowRight
                className={`transition-transform duration-300 ${
                  openIndex === index ? "transform rotate-90 text-[#838490]" : "text-[#838490]"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-[400] text-[#838490] text-[16px]">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
 