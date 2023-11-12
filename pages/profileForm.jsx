import MyForm from "./components/MyForm";
export default function profileForm() {
  return (
    <div className="bg-white">
      <a href="#" className="block mx-auto pt-10 max-w-sm p-6 bg-gray-100 border border-gray-200 rounded-lg shadow">
        <h1 className = "text-4xl">Register</h1>
        <div className="m-8">
          <MyForm />
        </div>
      </a>
      <a href="http://localhost:3000/home" className="block mx-auto pt-10 max-w-sm p-6 bg-gray-100 border border-gray-200 rounded-lg shadow">Click to skip</a>
    </div>
  );
}