/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";

const IndexPage = (props) => {
  const { isConnected } = props;



  return (
    <div sx={{ height: `calc(100vh - 60px)` }}>
      <div
        sx={{
          variant: "containers.page",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        {isConnected ? "Connected!" : "Connection failed :("}
      </div>
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
