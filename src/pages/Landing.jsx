import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center space-y-6">
        <h1 className="text-2xl font-bold">Utility Operations Portal</h1>
        <p className="text-gray-600">Select your role</p>

        <div className="space-y-4">
          <Link
            to="/customer"
            className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Customer
          </Link>

          <Link
            to="/tech"
            className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Technician
          </Link>
        </div>
      </div>
    </div>
  );
}
