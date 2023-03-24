import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get(process.env.REACT_APP_API_URL + userId ? "/posts?userId="+userId : "/posts").then((res) => {
      return res.data;
    })
  );
    

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data?.slice().reverse().map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
