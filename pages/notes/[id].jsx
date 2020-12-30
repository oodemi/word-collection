/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";

export default (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { note } = props;

  return (
    <div sx={{ variant: "containers.page" }}>
      <h1>Note: {note.id} </h1>
      <p>{note.title}</p>
    </div>
  );
};

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(`http://localhost:3000/api/note/${params.id}`);

  // so much power!
  if (!response.ok) {
    res.writeHead(302, { Location: "/notes" });
    res.end();
    return { props: {} };
  }

  const { data } = await response.json();

  if (data) {
    return {
      props: { note: data },
    };
  }
}
