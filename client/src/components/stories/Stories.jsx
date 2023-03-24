import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useSelector } from "react-redux";

const Stories = () => {
    const { user } = useSelector(state => state.userState);

    const { isLoading, error, data } = useQuery(["stories"], () =>
        makeRequest.get(process.env.REACT_APP_API_URL +"/stories").then((res) => {
            return res.data;
        })
    );

    //TODO Add story using react-query mutations and use upload function.

    return (
        <div className="stories">
            <div className="story">
                <img src={ user.profilePic} alt={user.profilePic} />
                <span>{user.name}</span>
                <button>+</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((story) => (
                        <div className="story" key={story.id}>
                            <img src={story.img} alt="" />
                            <span>{story.name}</span>
                        </div>
                    ))}
        </div>
    );
};

export default Stories;
