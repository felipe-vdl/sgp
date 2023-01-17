import Fogo from './Fogo';

export default function Footer() {
  return (
    <footer className="bg-indigo-500/50 py-1 px-4 text-indigo-100 center shadow-inner shadow-indigo-500/50">
      <ul className="flex items-center justify-between text-center text-[11px]">
        <li className='hover:text-white'>
          © 2023 Equipe de Desenvolvimento de Sistemas
        </li>
        <li className='hover:text-white'>
          <a href="http://devs.mesquita.rj.gov.br/" target="_blank"><Fogo className="inline" role="" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" /></a> Subsecretaria de Tecnologia da Informação — Prefeitura Municipal de Mesquita
        </li>
        <li className='hover:text-white'>
          Rua Arthur de Oliveira Vecchi, 120 - Centro - Mesquita - RJ - CEP: 26553-080
        </li>
        <li className='hover:text-white'>
          <a href="https://lgpd.mesquita.rj.gov.br/?page_id=43" target="_blank">Política de Privacidade</a>
        </li>
      </ul>
    </footer>
  )
}