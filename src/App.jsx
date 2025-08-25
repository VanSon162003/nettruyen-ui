import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ComicDetail from "./pages/ComicDetail";
import ChapterDetail from "./pages/ChapterDetail";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/comic/:slug" element={<ComicDetail />} />
                    <Route
                        path="/comic/:comicSlug/chapter/:chapterId"
                        element={<ChapterDetail />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
