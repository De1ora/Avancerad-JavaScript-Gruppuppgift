import { useState } from "react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";
import { Trash2 } from "lucide-react";

export function CreateForm({ onClose, addBlog }) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState('');
    const [submittedTitle, setSubmittedTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const navigate = useNavigate();
    /*const [blogs, setBlogs] = useState([]);

    Load existing blogs from localStorage when component mounts
    useEffect(() => {
        const stored = localStorage.getItem("blogs");
        if (stored) setBlogs(JSON.parse(stored));
    }, [])*/

    const changeAuthor = (e) => setAuthor(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
    
    // So AI-image does not generate on title change
    const handleTitleBlur = () => {
        const trimmed = title.trim();

        if (trimmed && trimmed !== submittedTitle) {
            const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(trimmed)}`;
            setSubmittedTitle(trimmed);
            setImageUrl(url);
            setImageError(false);
            setImageLoading(true); // Generating image..."
        } else if (!trimmed) {
            setSubmittedTitle("");
            setImageUrl("");
            setImageError(false);
            setImageLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new blog post object
        const newBlog = {
            id: uuidv4(),
            author,
            title,
            content,
            image: imageUrl,
            timeStamp: new Date().toISOString()
        }

        console.log("Form submitted");
        addBlog(newBlog); //Prop från App

        if (onClose) {onClose();}

        // Navigate to a new route based on the author
        navigate(`/${newBlog.author}`);

        /*Update blogs state and save to localStorage
        const updateBlogs = [...blogs, newBlog];
        setBlogs(updateBlogs);
        localStorage.setItem("blogs", JSON.stringify(updateBlogs));*/

        // Clear form inputs after submission
        setAuthor("");
        setTitle("");
        setContent("");
        setImageUrl("");
        setSubmittedTitle("");
        setImageError(false);
    };

    return (
        <div className="bg-gray-100 p-6 border-b flex">
            <form onSubmit={handleSubmit}  className={`transition-all duration-300 ${submittedTitle ? "w-2/3" : "w-full"}`}>
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
                        onChange={handleTitleChange} 
                        onBlur={handleTitleBlur}
                    />
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

            {submittedTitle && (
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <div style={{ maxWidth: "50%" }} className="relative"> {/*Relative for positioning of button*/}
                       {!imageError && (
                            <img
                            src={imageUrl}
                            alt={submittedTitle}
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageError(true);
                                setImageLoading(false);
                            }}
                            className="rounded-lg shadow-md opacity-95"
                            />
                        )}

                        {!imageError && !imageLoading && ( //Show button when image is loaded
                            <button
                            onClick={() => {
                                setImageUrl("");
                                setSubmittedTitle("");
                            }}
                            className="absolute top-2 right-2 bg-white shadow-md border border-gray-300 rounded-full p-1 text-gray-700 hover:bg-red-600 hover:border-black text-black transition-colors"
                            title="Remove image"
                            >
                            <Trash2 className="w-5 h-5" />
                            </button>
                        )}

                        {imageLoading && (
                            <p className="mt-2 text-sm text-gray-500 text-center">Generating image…</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}