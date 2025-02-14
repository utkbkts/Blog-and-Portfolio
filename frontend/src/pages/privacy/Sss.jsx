import { useState } from "react";
import { Minus, Plus } from "lucide-react";
const optionData = {
  "Blog için SSS Soruları": [
    {
      id: 1,
      title: "Blogun konusu nedir?",
      desc: "Aslında her şey hakkında yazıyorum, bildiğim programlama dilleri var. Bu konular hakkında yazıyorum ya da bilmediğim konuları araştırıp bilgimi toplu halde aktarıyorum.",
    },
    {
      id: 2,
      title: "Yeni içerikler ne sıklıkla yayınlanıyor?",
      desc: "Haftada bir blog yazısı paylaşmaya çalışıyorum.",
    },
    {
      id: 3,
      title: "Yazılarınızı nasıl seçiyorsunuz?",
      desc: "Genellikle dokümantasyon bilgileri, Udemy videoları ve YouTube videolarından faydalanıyorum.",
    },
    {
      id: 4,
      title: "Konuk yazar olabilir miyim?",
      desc: "Amacım kişisel bir blog ve portfolyo sayfası oluşturmak, ancak gelecekte her şey değişebilir. Sonuçta dünya değişiyor, değil mi? :)",
    },
    {
      id: 5,
      title: "Makalelerinize nasıl yorum yapabilirim?",
      desc: "Giriş yaparak.",
    },
    {
      id: 6,
      title: "Bülteninize nasıl abone olabilirim?",
      desc: "Sayfamızı düzenli olarak takip ederek.",
    },
  ],
  "Portfolyo için SSS Soruları": [
    {
      id: 1,
      title: "Hangi teknolojilerle çalışıyorsunuz?",
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
      title: "İş teklifleri için sizinle nasıl iletişime geçebilirim?",
      desc: "utkutoygunbektasoglu@gmail.com adresine e-posta gönderebilirsiniz.",
    },
    {
      id: 3,
      title: "Açık kaynak projelere katkıda bulunuyor musunuz?",
      desc: "Evet, bunun için beni GitHub'dan takip edebilirsiniz.",
    },
    {
      id: 4,
      title: "Freelance çalışıyor musunuz?",
      desc: "Evet.",
    },
    {
      id: 5,
      title: "Daha önce hangi projeleri tamamladınız?",
      desc: "Bunun için beni GitHub'dan takip edebilirsiniz.",
    },
    {
      id: 6,
      title: "Yeni projeleriniz hakkında nasıl bilgi alabilirim?",
      desc: "Bunun için beni GitHub'dan takip edebilir veya utkutoygunbektasoglu@gmail.com adresine e-posta gönderebilirsiniz.",
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
          Blog için SSS Soruları
        </h1>
        {optionData["Blog için SSS Soruları"].map((item) => (
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
          Portfolyo için SSS Soruları
        </h1>
        {optionData["Portfolyo için SSS Soruları"].map((item) => (
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
