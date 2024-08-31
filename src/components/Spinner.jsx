import { ClipLoader } from "react-spinners";

const override = { display: "block", margin: "100px auto" };

function Spinner({ loading }) {
  return (
    <ClipLoader
      color="rgb(75, 0, 130)"
      loading={loading}
      cssOverride={override}
      size={150}
      arial-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Spinner;
