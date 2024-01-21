'use client';
import { useRef, useState } from 'react';

export default function ContentPicker({ label, name }) {
  const [pickedContent, setPickedContent] = useState();
  const contentInput = useRef();

  function handlePickClick() {
    contentInput.current.click();
  }

  function handleContentChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedContent(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedContent({
        data: fileReader.result,
        type: file.type.split('/')[0], // 'image' or 'video'
      });
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium text-lg">{label}</label>
      <div className="flex items-start gap-6 mb-4">
        <div className="w-40 h-40 border-2 border-gray-400 flex justify-center items-center text-center text-gray-400 relative">
          {!pickedContent && <p className="m-0 p-4">No content picked yet.</p>}
          {pickedContent && pickedContent.type === 'image' && (
            <img src={pickedContent.data} alt="The content selected by the user." className="max-w-full max-h-full object-cover" />
          )}
          {pickedContent && pickedContent.type === 'video' && (
            <video src={pickedContent.data} alt="The content selected by the user." className="max-w-full max-h-full" controls />
          )}
        </div>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg, video/mp4, video/webm, video/avi"
          name={name}
          ref={contentInput}
          onChange={handleContentChange}
          // required
          className="hidden"
        />
        <button
          type="button"
          onClick={handlePickClick}
          className="border-0 py-2 px-6 bg-gray-400 rounded cursor-pointer hover:bg-gray-500"
        >
          Pick an Image/Video
        </button>
      </div>
    </div>
  );
}
