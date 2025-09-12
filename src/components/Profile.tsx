import { motion, useScroll, useTransform } from 'framer-motion'

const Profile = () => {
  const isMobile = window.matchMedia('(max-width: 500px)').matches;
  const { scrollY } = useScroll();

  // Main container animation
  const textX = useTransform(scrollY, [0, isMobile ? 600 : 900], [-100, 0]);
  const textOpacity = useTransform(scrollY, [0, 900], [0, 1]);

  // Text reveal animations
  const profileTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // const bulletPoints = [
  //   "Atuação em todas as etapas do desenvolvimento de software, desde a concepção e design de soluções até a implementação, testes e deploy.",
  //   "Colaboração com equipes multidisciplinares (designers, product managers) para entender as necessidades do negócio e entregar soluções de alta qualidade.",
  //   "Criação de novas funcionalidades e componentes reutilizáveis em React e React Native.",
  //   "Implementação de layouts responsivos e interfaces de usuário intuitivas.",
  //   "Integração de APIs RESTful (Node.js, Express) para comunicação entre front-end e back-end.",
  //   "Desenvolvimento de testes unitários e de integração para garantir a qualidade do código.",
  //   "Correção de bugs e implementação de melhorias em aplicações existentes.",
  //   "Monitoramento de aplicações em produção e resolução de problemas.",
  //   "Atualização de dependências e tecnologias utilizadas.",
  //   "Criação e manutenção de banco de dados PostgreSQL.",
  //   "Otimização de queries para melhorar o desempenho do banco de dados.",
  //   "Configuração e gerenciamento de pipelines de deploy (Heroku, Appcenter).",
  // ]
  return (
    <motion.div
      style={{ x: textX, opacity: textOpacity }}
      className='min-h-svh flex flex-col justify-center items-center min-[1300px]:flex-row text-md'
    >
      <div className='flex flex-col md:min-h-svh min-[1300px]:w-1/2 md:justify-center items-center p-10'>
        <img
          className='w-40 h-40 rounded-full mx-auto'
          src={"/math.png"}
          alt="a picture of Matheus"
          onClick={() => window.open('https://github.com/matheAlves', '_blank')}
        />
        <section className='text-white indent-5 tracking-wider justify-center text-start md:text-justify text-pretty flex flex-col mt-5'>
          {[0, 1, 2, 3].map((index) => (
            <motion.p
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={profileTextVariants}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-5"
            >
              {/* Keep your existing paragraphs, just wrap them in motion.p */}
              {index === 0 && "Desenvolvedor full stack web e mobile."}
              {index === 1 && "Atualmente, estou cursando Ciência da Computação na Universidade La Salle, e sou formado no curso de desenvolvimento web full stack da Trybe, onde desenvolvi projetos que incluem, entre outras, tecnologias como JavaScript, React, Redux, Node.Js, Docker, Express, TypeScript, MySQL, MongoDB e Python, além de conceitos como SOLID, REST, padrões de projeto, raspagem de dados, algoritmos e estruturas de dados."}
              {index === 2 && "Um antigo entusiasta da tecnologia, desde onde ela nos diverte até onde facilita as nossas vidas."}
              {index === 3 && "Antes do desenvolvimento de software, atuei por 6 anos na área da educação como instrutor de inglês, e tive a oportunidade de trabalhar e estudar em Dublin, na Irlanda, onde residi por 1 ano e meio."}
            </motion.p>
          ))}
        </section>
      </div>

      {/* <section className='md:w-1/2 md:min-h-svh text-white p-10 indent-5 tracking-wider justify-center text-pretty text-start md:text-justify flex flex-col leading-relaxed'>
        <ul className='list-disc list-inside space-y-2'>
          {bulletPoints.map((item, index) => (
            <motion.li
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={profileTextVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="holographic">{item}</span>
            </motion.li>
          ))}
        </ul>
      </section> */}
    </motion.div>
  );
};

export default Profile;