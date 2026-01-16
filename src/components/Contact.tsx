import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { styles } from '@/styles';
import ComputerCanvas from './Computer'

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  interface EmailFormElements extends HTMLFormControlsCollection {
    user_name: HTMLInputElement;
    user_email: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  interface EmailForm extends HTMLFormElement {
    readonly elements: EmailFormElements;
  }

  const sendEmail = (e: React.FormEvent<EmailForm>) => {
    e.preventDefault();
    setLoading(true);
    const elements = formRef.current?.elements as EmailFormElements;
    const { user_name, user_email, message } = elements;
    if (!user_name.value || !user_email.value || !message.value) {
      toast.error('por favor, preencha todos os campos', {
        duration: 5000,
      });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current ?? '', EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          toast.success('obrigado, sua mensagem foi recebida com sucesso! entrarei em contato assim que possível.', {
            duration: 5000,
          });
          formRef.current?.reset();
          setLoading(false);
        },
        () => {
          toast.error('houve um erro ao enviar a mensagem, tente novamente mais tarde.', {
            duration: 5000,
          });
          setLoading(false);
        },
      );
  };


  return (

    <motion.div className='min-h-svh flex flex-col items-center justify-between sm:justify-around bg-black-100 p-8 rounded-2xl relative overflow-hidden'>
      <h1
        className="text-primary font-monumentBlack text-4xl md:text-5xl lg:text-5xl holographic-text mb-1"
      >contato</h1>
      <div
        className='flex w-full h-[40rem] flex-col md:flex-row justify-center relative md:left-40'
      >
        <form className='md:w-[500px] flex flex-col justify-between text-white' ref={formRef} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            className={`${styles.opacity} h-10 p-2 mb-1`}
            placeholder="nome"
          />
          <input
            type="email"
            name="user_email"
            className={`${styles.opacity} h-10 p-2 mb-1`}
            placeholder="email"
          />
          <textarea
            name="message"
            className={`${styles.opacity} h-32 p-2 grow resize-none`}
            placeholder="mensagem"
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.opacity} h-10 transition-all duration-300 relative overflow-hidden
              ${loading ? 'cursor-not-allowed opacity-70' : 'hover:opacity-80'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="ml-2">enviando...</span>
              </div>
            ) : (
              'enviar'
            )}
          </button>
        </form>
        <ComputerCanvas />
      </div>


      <footer className="absolute bottom-0 text-center holographic-text">
        <p className="text-primary text-[8px] md:text-xs">artwork: <a href="https://www.domcake.net/">DOMCAKE</a> · <a href="https://eyeondesign.aiga.org/">AIGA Eye on Design</a> · <a href='https://sketchfab.com/SketchyB0t_3D_Fabrication'>SketchyBot</a></p>

        <p className="text-primary text-[8px] md:text-xs">web development: © 2026 · Matheus Alves</p>
      </footer>
    </motion.div>

  );
};

export default Contact;
