import { useState } from "react";
import { Minus, Plus } from "lucide-react";
const optionData = {
  "FAQ for Blog": [
    {
      id: 1,
      title: "What is the blog about?",
      desc: "I write about everything, I know programming languages. I write about these topics or research topics I don't know and share my gathered knowledge.",
    },
    {
      id: 2,
      title: "How often is new content published?",
      desc: "I try to post a blog article once a week.",
    },
    {
      id: 3,
      title: "How do you choose your articles?",
      desc: "I usually refer to documentation, Udemy videos, and YouTube videos.",
    },
    {
      id: 4,
      title: "Can I be a guest writer?",
      desc: "My goal is to create a personal blog and portfolio page, but everything may change in the future. After all, the world is changing, right? :)",
    },
    {
      id: 5,
      title: "How can I comment on your articles?",
      desc: "By logging in.",
    },
    {
      id: 6,
      title: "How can I subscribe to your newsletter?",
      desc: "By regularly following my page.",
    },
  ],
  "FAQ for Portfolio": [
    {
      id: 1,
      title: "Which technologies do you work with?",
      desc: [
        "JavaScript",
        "TypeScript",
        "Python",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
        "Firebase",
        "Docker",
        "Kubernetes",
        "Tailwind CSS",
        "Redis",
      ],
    },
    {
      id: 2,
      title: "How can I contact you for job offers?",
      desc: "You can send an email to utkutoygunbektasoglu@gmail.com.",
    },
    {
      id: 3,
      title: "Do you contribute to open source projects?",
      desc: "Yes, you can follow me on GitHub for that.",
    },
    {
      id: 4,
      title: "Do you work freelance?",
      desc: "Yes.",
    },
    {
      id: 5,
      title: "Which projects have you completed in the past?",
      desc: "You can follow me on GitHub for that.",
    },
    {
      id: 6,
      title: "How can I get updates on your new projects?",
      desc: "You can follow me on GitHub or send an email to utkutoygunbektasoglu@gmail.com.",
    },
  ],
};



const Sss = () => {
  const [activeId, setActiveId] = useState(null);
  const [activeIdP, setActiveIdP] = useState(null);

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const toggleItemPortfolio = (id) => {
    setActiveIdP(activeIdP === id ? null : id);
  };
  return (
    <div className="text-black flex items-center justify-center h-full mt-44 gap-12 lg:flex-row flex-col">
      <div className="bg-slate-200 md:w-[500px] flex flex-col gap-5 p-6 rounded-lg h-[500px] overflow-y-auto">
        <h1 className="sm:text-xl text-sm text-center font-bold font-heading">
        FAQ Questions for the Blog
        </h1>
        {optionData["FAQ for Blog"].map((item) => (
          <div key={item.id} className="border-b pb-2">
            <h1
              className="flex items-center justify-between cursor-pointer font-semibold sm:text-lg text-sm"
              onClick={() => toggleItem(item.id)}
            >
              {item.title}
              <span>{activeId === item.id ? <Minus /> : <Plus />}</span>
            </h1>
            {activeId === item.id && (
              <div className="text-gray-700 mt-2">
                {Array.isArray(item.desc) ? (
                  <ul className="list-disc ml-5 sm:text-md text-sm">
                    {item.desc.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="sm:text-md text-sm"> {item.desc}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-slate-200 md:w-[500px] flex flex-col gap-5 p-6 rounded-lg h-[500px] overflow-y-auto">
        <h1 className="sm:text-xl tex-sm text-center font-bold font-heading">
        FAQ Questions for the Portfolio
        </h1>
        {optionData["FAQ for Portfolio"].map((item) => (
          <div key={item.id} className="border-b pb-2">
            <h1
              className="flex items-center justify-between cursor-pointer font-semibold sm:text-lg tex-sm"
              onClick={() => toggleItemPortfolio(item.id)}
            >
              {item.title}
              <span>{activeIdP === item.id ? <Minus /> : <Plus />}</span>
            </h1>
            {activeIdP === item.id && (
              <div className="text-gray-700 mt-2">
                {Array.isArray(item.desc) ? (
                  <ul className="list-disc ml-5 sm:text-md text-sm">
                    {item.desc.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="sm:text-md text-sm"> {item.desc}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sss;
