import logo from './assets/logo.png';

export default function Header() {
  return (
    <nav className="bg-gray-800 shadow-md py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          </a>
          <h1 className="text-[#e23d71] font-bold text-xl tracking-wide">GQL PROJECT</h1>
        </div>
      </div>
    </nav>
  );
}
