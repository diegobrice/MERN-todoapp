import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

class CreateNote extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: res.data[0].username,
    });
    const id = this.props.match.params.id;
    if (id) {
      const { data } = await axios.get(`http://localhost:4000/api/notes/${id}`);
      this.setState({
        title: data.title,
        content: data.content,
        userSelected: data.author,
        date: new Date(data.date),
        editing: true,
        _id: id,
      });
      console.log(res.data);
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDateChange = (date) => {
    this.setState({ date });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.editing) {
      await axios.put(
        `http://localhost:4000/api/notes/${this.state._id}`,
        newNote
      );
    } else {
      await axios.post("http://localhost:4000/api/notes", newNote);
    }
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>{this.state.editing ? "Editar Nota" : "Crear Nota"}</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                onChange={this.onInputChange}
                value={this.state.userSelected}
              >
                {this.state.users.map((user) => (
                  <option value={user} key={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Titulo"
                name="title"
                value={this.state.title}
                required
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                placeholder="Contenido"
                value={this.state.content}
                required
                onChange={this.onInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <DatePicker
                locale="es"
                dateFormat="dd/MM/yyyy"
                className="form-control"
                selected={this.state.date}
                onChange={this.onDateChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {this.state.editing ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateNote;
