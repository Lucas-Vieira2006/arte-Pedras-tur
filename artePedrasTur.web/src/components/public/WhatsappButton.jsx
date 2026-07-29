import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';


const WhatsAppButton = () => {

  const phoneNumber = '5545991142748';
  const message = 'Olá! Vim pelo site e gostaria de saber mais sobre os passeios.';

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Falar no WhatsApp"
    >
    <FaWhatsapp size={36} />
    </a>
  );
};

export default WhatsAppButton;