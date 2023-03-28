import './updateStories.scss';
import { useState } from "react";
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/slices/appSlice";

const UpdateStories = ({ setOpenUpdate, setStories }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
            e.preventDefault();
            if (!image) return dispatch(setError("Please upload image"));

            const formData = new FormData();
            formData.append('image', image);

            try {
                setIsLoading(true);
                const { data } = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/story", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });

                setIsLoading(false);
                setOpenUpdate(false);
                setStories(data.stories);
            } catch (err) {
                console.log(err)
                setIsLoading(false);
                dispatch(setError(err.response.data.message));
            }
    }
    return (
        <div className="update-stories">
            <div className="wrapper">
                <h1>Updoad Story</h1>
                <form onSubmit={handleUpdate}>
                    <div className="files">
                        <label htmlFor="image">
                            <span>Story Image</span>
                            <div className="imgContainer">
                                <img
                                    src={image ? URL.createObjectURL(image) : ""}
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            style={{ display: "none" }}
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <button disabled={isLoading}>Upload</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};

export default UpdateStories;
