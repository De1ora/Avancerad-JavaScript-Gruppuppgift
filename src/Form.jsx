import { useState, useEffect } from "react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";

export function CreateForm({ onClose }) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState("/no-image.png");
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);

    // Load existing blogs from localStorage when component mounts
    useEffect(() => {
        const stored = localStorage.getItem("blogs");
        if (stored) setBlogs(JSON.parse(stored));
    }, [])

    const changeAuthor = (e) => setAuthor(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new blog post object
        const newBlog = {
            id: uuidv4(),
            author,
            title,
            content,
            image,
            timeStamp: new Date().toISOString()
        }

        console.log("Form submitted");

        if (onClose) {onClose();}

        // Navigate to a new route based on the author
        navigate(`/${newBlog.author}`);

        // Update blogs state and save to localStorage
        const updateBlogs = [...blogs, newBlog];
        setBlogs(updateBlogs);
        localStorage.setItem("blogs", JSON.stringify(updateBlogs));

        // Clear form inputs after submission
        setAuthor("");
        setTitle("");
        setContent("");
        setImage("");
    };

    return (
        <div className="bg-gray-100 p-6 border-b">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-4">
                    <label className="block font-medium text-lg">Create a new blog post</label>
                </div>

                <label className="block mx-6 mb-2 font-medium">
                    Title:
                    <Input
                        type="text"
                        placeholder="Title"
                        className="mb-2"
                        value={title}
                        onChange={handleTitleChange} />
                </label>

                {/* Author selection with Avatar */}
                <label className="block mx-6 mb-2 font-medium">
                    Author:
                    <div className="flex items-center gap-2 mt-1">
                        {/* Avatar for selected author */}
                        {author && (
                            <Avatar>
                                <AvatarImage src={`https://github.com/${author}.png`} alt={author} />
                                <AvatarFallback>
                                    <Github className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                        )}

                        {/* Dropdown */}
                        <select
                            className="border rounded ml-2"
                            value={author}
                            onChange={changeAuthor}
                        >
                            <option disabled value="">Please choose:</option>
                            <option value="AthirK">Athir</option>
                            <option value="JoLundan">Johanna</option>
                            <option value="De1ora">Lisa</option>
                            <option value="rydalund">Magnus</option>
                        </select>
                    </div>
                </label>

                <label className="block mx-6 mb-2 font-medium">
                    Content:
                    <Textarea value={content} onChange={handleContentChange} />
                </label>

                <div className="flex gap-2">
                    <Button type="submit">Create Post</Button>
                    {onClose && (
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}