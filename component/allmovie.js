function MovieAll({ title }) {
    const query = `MATCH (movie:Movie {title: $title}) RETURN movie`
    const params = { title } // Movie title passed as a prop

    const { loading, first } = useReadCypher(query, params)

    if ( loading ) return (<div>Loading...</div>)
    if ( error ) return (
        <div className="error">{error.message}</div>
    )
    // Get `m` from the first row
    const movie = first.get('movie')

    return (
        <div>
            {movie.properties.title}
            was released in
            {movie.properties.year}
        </div>
    )
}
export default MovieAll;