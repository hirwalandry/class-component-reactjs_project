import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: joi.number().min(0).max(10).required().label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToModelView(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToModelView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
