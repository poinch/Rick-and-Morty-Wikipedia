function SearchBar({ submit }) {
  return (
    <form onSubmit={submit} className="flex h-10 mt-10">
      <input 
        className="outline-none border border-blue-200 p-3 mr-2 rounded-2xl focus:border-blue-500" 
        type="search" 
        name="query" 
      />
      <button 
        className="bg-green-500 border border-blue-200 p-2 text-white font-light text-sm rounded-xl hover:scale-105 active:scale-100 transform duration-200"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
