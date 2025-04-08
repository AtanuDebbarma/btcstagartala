export const TopBar = () => (
  <div className="bg-gray-900 text-white py-2 px-4">
    <div className="flex flex-wrap justify-between items-center">
      <div></div>
      <div className="flex items-center space-x-3 mt-2 md:mt-0">
        <a
          href="#"
          className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-3 py-1 rounded text-sm">
          <span className="animate-blink"> ADMISSIONS - APPLY</span>
        </a>
        <a href="#" className="hover:text-blue-300 text-sm">
          NOTICE
        </a>
        <a href="#" className="hover:text-blue-300 text-sm">
          ADMIN
        </a>
      </div>
    </div>
  </div>
);
