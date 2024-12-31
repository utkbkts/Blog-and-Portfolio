const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-white">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-16 h-16 text-yellow-500 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600">
          We&lsquo;re working on this page. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default Contact;
