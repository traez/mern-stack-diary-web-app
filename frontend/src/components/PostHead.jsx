import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../styles/styles.module.scss";

const PostHead = ({ post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch(
      `/api/posts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const body = await response.text();
    const json = JSON.parse(body);

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
      console.log("post deleted", json);
    }
  };

  return (
    <li>
      <span className={styles.postHeadHeader}>
        <h2>
          <Link to={`/api/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </span>
      <div>{ format(new Date(post.date), 'MMMM d, y') }</div>
      <p>{post.content.substring(0, 200) + " ..."}</p>
    </li>
  );
};

export default PostHead;
