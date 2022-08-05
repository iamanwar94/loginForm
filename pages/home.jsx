import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import uuid from "react-uuid";

const theme = createTheme();

const notesData = { id: uuid(), title: "", body: "" };

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState(notesData);
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users"));
    setUserData(data);
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("notes"));
    setNotes(data);
  }, []);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewNote({ ...newNote, [name]: value });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (newNote.title && newNote.body) {
      setNotes([...notes, newNote]);
      setNewNote(notesData);
      setShowForm(!showForm);
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      alert("please add title and body first");
    }
  };

  const dltClickHandler = (id) => {
    const filteredNotes = notes.filter((filteredNotes, i) => {
      return i !== id;
    });
    setNotes(filteredNotes);
  };

  // function Cards() {
  //   return (
  //     <Card sx={{ maxWidth: 345, marginTop: 4 }}>
  //       <CardActionArea>
  //         <CardContent>
  //           <Typography gutterBottom variant="h5" component="div">
  //             Lizard
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             Lizards are a widespread group of squamate reptiles, with over
  //             6,000 species, ranging across all continents except Antarctica
  //           </Typography>
  //         </CardContent>
  //       </CardActionArea>
  //       <CardActions>
  //         <Button size="small" color="primary">
  //           Delete
  //         </Button>
  //       </CardActions>
  //     </Card>
  //   );
  // }

  // const Notes = () => {
  //   const [newNote, setNewNote] = useState(notesData);
  //   const [notes, setNotes] = useState([]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     setNewNote({ ...newNote, [name]: value });
  //   };

  //   const handleCreate = (e) => {
  //     e.preventDefault();

  //     if (newNote.title && newNote.body) {
  //       setNotes([...notes, newNote]);
  //       console.log(notes);
  //       setNewNote(notesData);
  //       setShowForm(!showForm);
  //     } else {
  //       alert("please add title and body first");
  //     }
  //   };

  //   return (
  //     <Box component="form" noValidate onSubmit={handleCreate} sx={{ mt: 3 }}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={12} sm={12}>
  //           <TextField
  //             name="title"
  //             required
  //             fullWidth
  //             id="title"
  //             label="Notes Title"
  //             autoFocus
  //             value={newNote.title}
  //             onChange={handleChange}
  //           />
  //         </Grid>
  //         <Grid item xs={12} sm={12}>
  //           <TextField
  //             required
  //             fullWidth
  //             id="body"
  //             label="Write your notes here"
  //             name="body"
  //             value={newNote.body}
  //             onChange={handleChange}
  //             multiline
  //             rows={6}
  //           />
  //         </Grid>
  //       </Grid>
  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="contained"
  //         sx={{ mt: 3, mb: 2 }}
  //       >
  //         Create
  //       </Button>
  //     </Box>
  //   );
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome {userData.firstName + " " + userData.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            onClick={() => setShowForm(!showForm)}
          >
            Add Notes
          </Button>

          {showForm && (
            //input notes starts from here
            <Box
              component="form"
              noValidate
              onSubmit={handleCreate}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Notes Title"
                    autoFocus
                    value={newNote.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="body"
                    label="Write your notes here"
                    name="body"
                    value={newNote.body}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
            //input notes ends here
          )}
        </Box>
      </Container>
      {/* cards starts from here */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {notes?.map((notesData, i) => (
          <Card sx={{ maxWidth: 345, margin: 2 }} key={i}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {notesData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notesData.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={(i) => dltClickHandler(i)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      {/* cards ends from here */}

      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
          onClick={() => router.push("/signin")}
        >
          Logout
        </Button>
      </Box>
    </ThemeProvider>
  );
}
