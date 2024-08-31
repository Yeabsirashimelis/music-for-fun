import styled from "@emotion/styled";
import { faArrowCircleLeft, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Title from "../custom-components/Title";
import Button from "../custom-components/Button";
import Header from "../custom-components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField, updateImage } from "../slices/formSlice";
import toast from "react-hot-toast";

const FormContainer = styled.div`
  padding: 2rem;
  margin-top: 32px;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid gray;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const EachField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: whitesmoke;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid gray;
  border-radius: 0.375rem;
`;

const ColorPreview = styled.div`
  width: 100%;
  height: 2rem;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  background-color: ${(props) => props.color};
  border: 2px solid green;
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border: 1px solid gray;
  border-radius: 0.375rem;
  background-color: #f9f9f9;
  cursor: pointer;
  color: #333;
`;

const ImagePreviewContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 16rem;
  object-fit: cover;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

function AddMusicForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.addMusic);

  const loading = useSelector((state) => state.music.loading);

  // For the image preview
  const [preview, setPreview] = useState("");

  // Reset form on unmount
  useEffect(() => {
    return () => {
      dispatch(resetForm());
      setPreview(""); // Reset the image preview as well
    };
  }, [dispatch]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateImage(file));
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "submitForm", payload: formData });
    const error = useSelector((state) => state.music.error);
    console.log(error);

    if (!error) setPreview(""); // Reset the image preview
  }

  return (
    <div>
      <Header>
        <Title>Add Music</Title>

        <Link to="/">
          <Button>
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Home
          </Button>
        </Link>
      </Header>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <EachField>
            <Label htmlFor="musicTitle">Music Title</Label>
            <InputField
              type="text"
              id="musicTitle"
              name="musicTitle"
              placeholder="Enter the Music Title"
              required
              value={formData.musicTitle}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="description">Description</Label>
            <InputField
              type="text"
              id="description"
              name="description"
              placeholder="Enter the description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="album">Album</Label>
            <InputField
              type="text"
              id="album"
              name="album"
              placeholder="Enter the album name"
              required
              value={formData.album}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="genre">Genre</Label>
            <InputField
              type="text"
              id="genre"
              name="genre"
              placeholder="Enter the genre"
              required
              value={formData.genre}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="duration">Duration</Label>
            <InputField
              type="text"
              id="duration"
              name="duration"
              placeholder="Enter the duration (e.g., 3:36)"
              required
              value={formData.duration}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="color1">Primary Color</Label>
            <InputField
              type="color"
              id="color1"
              name="color1"
              required
              value={formData.color1}
              onChange={handleChange}
            />
            {formData.color1 && <ColorPreview color={formData.color1} />}
          </EachField>

          <EachField>
            <Label htmlFor="color2">Secondary Color</Label>
            <InputField
              type="color"
              id="color2"
              name="color2"
              required
              value={formData.color2}
              onChange={handleChange}
            />
            {formData.color2 && <ColorPreview color={formData.color2} />}
          </EachField>

          <EachField>
            <Label htmlFor="headerColor">Header Color</Label>
            <InputField
              type="color"
              id="headerColor"
              name="headerColor"
              required
              value={formData.headerColor}
              onChange={handleChange}
            />
            {formData.headerColor && (
              <ColorPreview color={formData.headerColor} />
            )}
          </EachField>

          <EachField>
            <Label htmlFor="vibe">Vibe</Label>
            <InputField
              type="text"
              id="vibe"
              name="vibe"
              placeholder="Enter the vibe (e.g., catchy)"
              required
              value={formData.vibe}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="artist">Artist Name</Label>
            <InputField
              type="text"
              id="artist"
              name="artist"
              placeholder="Enter the artist name"
              required
              value={formData.artist}
              onChange={handleChange}
            />
          </EachField>

          <EachField>
            <Label htmlFor="artistPhoto">Artist Photo</Label>
            <FileInputContainer>
              <input
                type="file"
                id="artistPhoto"
                name="artistPhoto"
                accept="image/*"
                required
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label htmlFor="artistPhoto" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faImage} /> Upload Photo
              </label>
            </FileInputContainer>
            {preview && (
              <ImagePreviewContainer>
                <PreviewImage src={preview} alt="Artist Preview" />
              </ImagePreviewContainer>
            )}
          </EachField>

          <ButtonContainer>
            <Button disabled={loading} type="submit">
              {loading ? "Submitting" : "Submit"}
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </div>
  );
}

export default AddMusicForm;
