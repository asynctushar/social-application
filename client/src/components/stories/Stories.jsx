import "./stories.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UpdateStories from "../updateStories/UpdateStories";
import { setError } from "../../redux/slices/appSlice";
import axios from "axios";

const Stories = () => {
    const { user } = useSelector(state => state.userState);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [stories, setStories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getStories = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/story', { withCredentials: true });

                setStories(data.stories);
            } catch (err) {
                dispatch(setError(err.response.data.message));
            }
        }

        getStories();
    }, [])

    return (
        <div className="stories">
            <div className="story">
                <img src={user.coverPic?.url} alt={user.coverPic?.url} />
                <span>{user.name}</span>
                <button onClick={() => setOpenUpdate(true)}>+</button>
            </div>
            {stories?.map((story) => (
                <div className="story" key={story?._id}>
                    <img src={story.image?.url} alt={story.image?.url} />
                    <span>{story.userId?.name}</span>
                </div>
            ))}
            {openUpdate && <UpdateStories setOpenUpdate={setOpenUpdate} setStories={setStories} />}

        </div>
    );
};

export default Stories;
