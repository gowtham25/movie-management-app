import { useQuery } from "@apollo/client";
import DirectorsRow from "./DirectorsRow";
import Spinner from "./Spinner";
import { GET_DIRECTORS } from "../queries/directorQueries";

const Directors = () => {
  const { loading, error, data } = useQuery(GET_DIRECTORS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  console.log(data);
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.directors.map((director) => {
              return <DirectorsRow key={director.id} director={director} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Directors;
