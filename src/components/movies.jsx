import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { paginate } from "./utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumns: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genre = [{ name: "All Genres", _id: 0 }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genre: genre });
  }
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlerDelete = async (movy) => {
    const orginalState = this.state.movies;
    const movies = orginalState.filter((m) => m._id !== movy._id);

    this.setState({ movies });
    try {
      await deleteMovie(movy._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("the movie had been deleted!");

      this.setState({ movies: orginalState });
    }
  };
  handlePagination = (page) => {
    this.setState({ currentPage: page });
  };
  handleSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumns) => {
    this.setState({ sortColumns });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumns,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumns.path], [sortColumns.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumns, searchQuery } = this.state;
    const { user } = this.props;
    if (count === 0) {
      return <p>there is no movies in database left</p>;
    }
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div style={{ padding: 20 }}>
        <div className="row">
          <div className="col-4">
            <ListGroup
              allGenre={this.state.genre}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleSelect}
            />
          </div>
          <div className="col">
            {user && (
              <button className="btn btn-primary">
                <Link
                  to="/movies/new"
                  className=" text-white"
                  style={{ marginBottom: 20 }}
                >
                  NewMovie
                </Link>
              </button>
            )}
            <p>there movie left is: {totalCount}</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumns={sortColumns}
              onLike={this.handleLike}
              onDelete={this.handlerDelete}
              onSort={this.handleSort}
            />
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
