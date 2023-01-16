import Navbar from "./Navbar";
import Fogo from "./Fogo";

export default function RegularLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-yellow-100">
        {children}
      </main>
      <footer className="bg-dourado-900 p-1 px-4 text-dourado-50 text-end">
        <ul className="flex items-center justify-between text-[12px]">
          <li>
            © 2023 Equipe de Desenvolvimento de Sistemas
          </li>
          <li>
            <a href="http://devs.mesquita.rj.gov.br/" target="_blank"><Fogo className="inline" role="" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" /></a> Subsecretaria de Tecnologia da Informação — Prefeitura Municipal de Mesquita
          </li>
          <li>
            Rua Arthur de Oliveira Vecchi, 120 - Centro - Mesquita - RJ - CEP: 26553-080
          </li>
          <li>
            <a href="https://lgpd.mesquita.rj.gov.br/?page_id=43" target="_blank">Política de Privacidade</a>
          </li>
        </ul>
      </footer>
    </div>
  )
}