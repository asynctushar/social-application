import "./home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import Navbar from "../../components/navbar/Navbar";
import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";

const Home = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <div className="home">
                        <Stories />
                        <Share />
                        <Posts />
                    </div>
                </div >
                <RightBar />
            </div>
        </>
    )
}

export default Home