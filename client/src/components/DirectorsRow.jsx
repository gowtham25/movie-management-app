import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_DIRECTOR } from "../mutations/directorMutations";
import { GET_DIRECTORS } from "../queries/directorQueries";

const DirectorsRow = ({ director }) => {
  const [deleteDirector] = useMutation(DELETE_DIRECTOR, {
    variables: { id: director.id },
    // refetchQueries: [{query: GET_DIRECTORS}]
    update(cache, { data: { deleteDirector } }) {
      const { directors } = cache.readQuery({
        query: GET_DIRECTORS,
      });
      console.log(directors, directors.filter(director => director.id !== deleteDirector.id), deleteDirector)
      cache.writeQuery({
        query: GET_DIRECTORS,
        data: {
          directors: directors.filter(director => director.id !== deleteDirector.id),
        },
      });
    },
  });
  return (
    <tr>
      <td>{director.name}</td>
      <td>{director.age}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteDirector}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default DirectorsRow;
