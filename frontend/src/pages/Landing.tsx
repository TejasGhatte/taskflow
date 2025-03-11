import { useNavigate } from 'react-router-dom';

const LandingPage= () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to TaskFlow</h1>
      </header>
      <main className="max-w-lg text-center">
        <p className="mb-8 text-lg text-gray-600">
          A simple and efficient way to manage your daily tasks.
          Keep track of what needs to be done and stay organized.
        </p>
        <button 
          className="px-6 py-3 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </button>
      </main>
    </div>
  );
};

export default LandingPage;