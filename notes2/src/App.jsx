import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const normalizeNotes = (response) => {
    if (Array.isArray(response)) {
      return response;
    }

    return Array.isArray(response?.data) ? response.data : [];
  };

  const safeNotes = Array.isArray(notes) ? notes : [];

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(normalizeNotes(response));
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = safeNotes.find((n) => n.id === id);
    if (!note) {
      return;
    }

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(
          safeNotes.map((note) => (note.id !== id ? note : returnedNote)),
        );
      })
      .catch(() => {
        // console.log(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(safeNotes.concat(returnedNote));
      setNewNote('');
    });
  };

  const deleteNote = (id) => {
    const note = safeNotes.find((n) => n.id === id);
    if (!note) {
      return;
    }

    noteService.delNote(note.id).then(() => {
      setNotes(safeNotes.filter((note) => note.id !== id));
    });
  };

  const handleNoteChange = (e) => {
    // console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? safeNotes
    : safeNotes.filter((note) => note.important);

  return (
    <div className="noteApp">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show{showAll ? ' important' : ' all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
}
