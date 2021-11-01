function SearchBar({ submit }) {
  const handleSubmitSearch = (e) => {
    e.preventDefault()
      
      const { currentTarget = {} } = e
      const fields = Array.from(currentTarget?.elements)
      console.log(fields);
      const fieldsQuery = fields.find((field) => field.name === 'query')

      const value = fieldsQuery.value || ''
      const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`

      submit(endpoint)
  }

  return (
    <form onSubmit={handleSubmitSearch} className="flex h-10 mt-10">
      <input 
        className="outline-none border border-blue-200 p-3 mr-2 rounded-2xl shadow-xl focus:border-blue-500" 
        type="search" 
        name="query" 
      />
      <button 
        className="bg-green-500 border border-blue-200 p-2 text-white font-light text-sm rounded-xl shadow-xl hover:scale-105 active:scale-100 transform duration-200"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
