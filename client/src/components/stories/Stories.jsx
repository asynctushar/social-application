import "./stories.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Stories = () => {
    const { user } = useSelector(state => state.userState);

    useEffect(() => {
        const getStories = async () => {

        }

        getStories();
    }, [])

    return (
        <div className="stories">
            <div className="story">
                <img src={user.profilePic} alt={user.profilePic} />
                <span>{user.name}</span>
                <button>+</button>
            </div>
            {/* {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((story) => (
                        <div className="story" key={story.id}>
                            <img src={story.img} alt="" />
                            <span>{story.name}</span>
                        </div>
                    ))} */}
        </div>
    );
};

export default Stories;
