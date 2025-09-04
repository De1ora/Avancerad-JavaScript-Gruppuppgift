import { useState } from 'react'

const fallbackImage = '/no-image.png';

const AiImage = ({title}) => {

    const [hasError, setHasError] = useState(false);

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(title)}`;

    return (
        <img
      src={hasError ? fallbackImage : imageUrl}
      alt={hasError ? "No image available" : title}
      onError={() => setHasError(true)}
      />
    );
};

export default AiImage;