import TourListPublic from '../components/public/TourListPublic';
import useSeo from '../seo/useSeo';

const Home = () => {
  useSeo({
    titulo: 'Arte Pedras Tur — Passeios e Turismo em Foz do Iguaçu',
    descricao:
      'Agência de turismo credenciada em Foz do Iguaçu. Cataratas, Itaipu, Macuco Safari, Marco das Três Fronteiras e transfers, com reserva direta pelo WhatsApp.',
    caminho: '/',
  });

  return (
    <>
      <section className="py-5 text-center bg-light">
</section>
      <TourListPublic />
    </>
  );
};

export default Home;
