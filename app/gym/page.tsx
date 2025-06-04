const GymPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> You can quickly access Stonks Gym from the user menu in the top navigation.
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-4">Stonks Gym</h1>
      <p className="mb-4">
        Welcome to the Stonks Gym! Here you can train your investment skills and become a master of the market.
      </p>

      {/* Add more content here, such as training modules, exercises, and progress tracking. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Module 1: Basic Investing</h2>
          <p className="text-gray-700">
            Learn the fundamentals of investing, including stocks, bonds, and mutual funds.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Start Module
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Module 2: Risk Management</h2>
          <p className="text-gray-700">Understand and manage the risks associated with investing.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Start Module
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Module 3: Advanced Strategies</h2>
          <p className="text-gray-700">Explore advanced investment strategies for maximizing returns.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Start Module
          </button>
        </div>
      </div>
    </div>
  )
}

export default GymPage
