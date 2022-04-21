import Axios from "axios";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 const [tutorial, setTutorial] = useState([]);

  const addTutorial = (e) => {
    e.preventDefault()
    // console.log(title, description);
    Axios.post("http://localhost:8080/api/tutorials", {
      title: title,
      description: description,
      published: true,
    }).then(
      ()=>{
        setTutorial([...tutorial,{
          title: title,
          description: description
        }])
      }
    )
  };

const showTutorial = ()=>{
  Axios.get("http://localhost:8080/api/tutorials").then((response) => {
      setTutorial(response.data);
    });
};

  return (
    <>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <h3 className="navbar-brand mx-3">Tutorials</h3>
      </nav>

      <form className="container">
        <div className="mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="inputPassword3"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            cols="5"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={addTutorial}>
          Add Tutorial
        </button>
        <button className="btn btn-primary mx-3" onClick={showTutorial}>
          Show Tutorials
        </button>
      </form>
    {/* -------------------------------------------- */}
      <div className="container my-3">
     
        {tutorial.map(
          (val, key)=>{
            return (
              <div
              className="card text-dark bg-light mb-3 my-3"
              style={{ maxWidth: "18rem" }}>
                <div className="card-header d-flex">{val.title}
                <FaTrash className="d-flex justify-content-end"/>
                </div>
                <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{val.description}</p>
                </div>
               </div>
            )
          }
          )}
      
      </div>
      {/* -------------------------------------------- */}
    </>
  );
}

export default App;
