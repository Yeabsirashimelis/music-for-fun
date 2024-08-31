import styled from "@emotion/styled";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../custom-components/Title";
import Button from "../custom-components/Button";
import Header from "../custom-components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "../slices/formSlice";
import Spinner from "../components/Spinner";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

function EditMusicForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevData = useSelector((state) => state.music.music);
  const formData = useSelector((state) => state.addMusic);
  const loading = useSelector((state) => state.music.loading);

  useEffect(() => {
    dispatch({ type: "fetchSelectedMusicData", payload: id });
    dispatch(resetForm());
  }, [dispatch, id]);

  // Reset form on unmount
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  // Update formData with prevData when prevData changes
  useEffect(() => {
    if (prevData) {
      dispatch(
        updateField({ field: "musicTitle", value: prevData.musicTitle })
      );
      dispatch(
        updateField({ field: "description", value: prevData.description })
      );
      dispatch(updateField({ field: "album", value: prevData.album }));
      dispatch(updateField({ field: "genre", value: prevData.genre }));
      dispatch(updateField({ field: "duration", value: prevData.duration }));
      dispatch(updateField({ field: "color1", value: prevData.color1 }));
      dispatch(updateField({ field: "color2", value: prevData.color2 }));
      dispatch(
        updateField({ field: "headerColor", value: prevData.headerColor })
      );
      dispatch(updateField({ field: "vibe", value: prevData.vibe }));
      dispatch(updateField({ field: "artist", value: prevData.artist }));
    }
  }, [prevData, dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { image, ...updatedData } = formData;
    dispatch({ type: "updateMusic", payload: { id, data: updatedData } });
    navigate(`/music/${id}`);
  }

  return (
    <div>
      <Header>
        <Title>Edit Music</Title>
        <Link to="/">
          <Button>
            <FontAwesomeIcon icon={faArrowCircleLeft} /> Home
          </Button>
        </Link>
      </Header>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
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
                value={formData.musicTitle || ""}
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
                value={formData.description || ""}
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
                value={formData.album || ""}
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
                value={formData.genre || ""}
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
                value={formData.duration || ""}
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
                value={formData.color1 || "#000000"}
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
                value={formData.color2 || "#000000"}
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
                value={formData.headerColor || "#000000"}
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
                value={formData.vibe || ""}
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
                value={formData.artist || ""}
                onChange={handleChange}
              />
            </EachField>

            <ButtonContainer>
              <Button disabled={loading} type="submit">
                {loading ? "Updating info..." : "Update music info"}
              </Button>
            </ButtonContainer>
          </form>
        </FormContainer>
      )}
    </div>
  );
}

export default EditMusicForm;
