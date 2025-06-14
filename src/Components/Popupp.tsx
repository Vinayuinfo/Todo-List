import Image from "next/image";

interface PropsType {
  setIsOpen: (open: boolean) => void;
  view: {
    image: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userAgent: string;
    role: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
    };
  };
}

const Popupp: React.FC<PropsType> = ({ setIsOpen, view }) => {
  if (!view) return null;
  return (
    <div className="">
      <div className="popup-overlay fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 m-6 sm:m-0 rounded-2xl shadow-lg max-w-xl w-full">
          <div>
            <Image
              src={view?.image}
              height={40}
              width={40}
              className="rounded-full"
              alt={view?.username || "Profile image"}
            />
          </div>
          <div className="mb-4 font-semibold text-lg">{`${view.firstName} ${view.lastName}`}</div>
          <div className="mb-4">{view.username}</div>
          <div className="mb-4">{view.email}</div>
          <div className="mb-4">{view.phone}</div>
          <div className="mb-4">{`${view.address.address},${view.address.city},${view.address.state},Postal code-${view.address.postalCode}`}</div>
          <div className="mb-4">{view.userAgent}</div>
          <div
            className={`${
              view.role === "admin" ? "text-red-500" : "text-black"
            }`}
          >
            {view.role}
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              console.log(view);
            }}
            className="cursor-pointer mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popupp;
