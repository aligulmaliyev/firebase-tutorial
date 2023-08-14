import { useEffect, useState } from "react";
import "./App.css";
import {
  getDocs,
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./config/firebase";
import Auth from "./components/Auth";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const movieCollectionRef = collection(db, "movies");

  const [movieList, setMovieList] = useState<any[]>([]);

  //new movie states
  const [title, setTitle] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<number>(0);
  const [receivedAnOscar, setReceivedAnOscar] = useState<boolean>(false);

  const [updatedTitle, setUpdatedTitle] = useState<string>("");

  // File upload
  const [fileUpload, setFileUpload] = useState<any>(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredDate = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredDate);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title,
        releaseDate,
        receivedAnOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, {
        title: updatedTitle,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {}
  };
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="app">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date..."
          onChange={(e) => setReleaseDate(e.target.valueAsNumber)}
        />
        <input
          type="checkbox"
          checked={receivedAnOscar}
          onChange={(e) => setReceivedAnOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files?.[0])}
        />
        <button onClick={uploadFile}>Update File</button>
      </div>
    </div>
  );
}

export default App;
