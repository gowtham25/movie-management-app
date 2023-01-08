import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_DIRECTORS } from "../queries/directorQueries";
import { ADD_DIRECTOR } from "../mutations/directorMutations";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [mailId, setMailId] = useState("");
  const [age, setAge] = useState("");

  const [addDirector] = useMutation(ADD_DIRECTOR, {
    variables: { name, age: parseInt(age), mailId },
    update(cache, { data: { addDirector } }) {
      const { directors } = cache.readQuery({ query: GET_DIRECTORS });
      cache.writeQuery({
        query: GET_DIRECTORS,
        data: {
          directors: [...directors, addDirector],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || mailId === "" || age === "") {
      return alert("Please fill in all fields");
    }

    addDirector(name, age, mailId);
    setName("");
    setMailId("");
    setAge("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Director</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="mailId"
                    value={mailId}
                    onChange={(e) => setMailId(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="text"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
