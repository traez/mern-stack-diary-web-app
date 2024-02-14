import { useForm } from "react-hook-form";
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from "../styles/styles.module.scss";

const PostForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const onSubmit = async data => {
    const post = {
        date: data.date,
        title: data.title,
        content: data.content
    };

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const body = await response.text();
        const newPost = JSON.parse(body);

        if (!response.ok) setError('something went wrong', { type: 400 });

        if (response.ok) {
            reset( { title: '', date: '', content: '' });
            dispatch({ type: 'CREATE_POST', payload: newPost });
            console.log('new post created', newPost);
        }
    } catch (err) {
        console.log(err);
    }
};

  return (
    <>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3> Create a post </h3>
        </div>
        <input
          type="text"
          {...register("title", { required: "required field" })}
          placeholder="Title"
        />
        <p>{errors.title?.message}</p>
        <input
          type="date"
          {...register("date", { required: "required field" })}
        />
        <p>{errors.date?.message}</p>
        <textarea
          rows="25"
          className={styles.content}
          {...register("content", { required: "required field" })}
          placeholder="enter diary content"
        />
        <p>{errors.content?.message}</p>
        <button type="submit" value="submit">
          {" "}
          POST{" "}
        </button>
      </form>
    </>
  );
};

export default PostForm;
