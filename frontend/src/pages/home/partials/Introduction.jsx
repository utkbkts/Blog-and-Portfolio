import { motion } from "framer-motion";

const Introduction = () => {
  const textTitle =
    "Yenilik ve yaratıcılığı harmanlayan projelerim, düşüncelerim ve fikirlerimden oluşan özenle seçilmiş koleksiyonumu keşfedin. İlham almak, iş birliği yapmak veya sadece merakınızı gidermek için buradaysanız, içeriğe dalın ve yolculuğumu benzersiz kılan detayları keşfedin.";

  return (
    <div className="text-center p-6 flex flex-col gap-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          staggerChildren: 0.2,
        }}
        className="font-bold text-4xl mb-4 "
      >
        Yaratıcı Alanıma Hoş Geldiniz
      </motion.h1>
      <motion.h1
        transition={{ duration: 1 }}
        className=" text-[18px]  text-center "
      >
        {textTitle.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Introduction;
