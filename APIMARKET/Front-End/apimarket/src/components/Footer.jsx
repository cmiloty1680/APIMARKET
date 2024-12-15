import { Zap } from 'lucide-react'


function Footer() {
    return ( <>
   <footer className="w-full bg-black py-3 px-4">
      <div className="container mx-auto flex justify-center items-center gap-2 text-gray-400 text-sm">
        <Zap size={16} className="text-gray-400" />
        <p>© {new Date().getFullYear()} APIMARKET. Todos los derechos reservados.</p>
      </div>
    </footer>
    </> );
}

export default Footer;