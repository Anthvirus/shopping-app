export default function Header({ toggleCart, itemNo }) {
  return (
    <div className="flex bg-gray-100 p-4 rounded-xl items-center relative">
      <div className="text-3xl font-extrabold ml-12 flex items-center relative">
        <div className="w-10 h-10 rounded-full bg-green-200 absolute -left-5 top-0"></div>
        <div className="w-10 h-10 rounded-full bg-green-200 absolute left-0 top-0"></div>
        <h1 className="z-10">Le Store.</h1>
      </div>

      <button
        aria-label="Toggle Cart"
        className="ml-auto mr-12 cursor-pointer delay-200 hover:scale-110 transition-all relative"
        onClick={toggleCart}
      >
        {itemNo > 0 && (
          <div className="bg-gray-500 text-white rounded-full h-5 w-5 text-xs absolute -top-2 -right-2 z-10 flex justify-center items-center">
            {itemNo}
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#121929"
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
        </svg>
      </button>
    </div>
  );
}
