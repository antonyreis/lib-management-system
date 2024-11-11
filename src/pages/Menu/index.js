// React
import React, { useState, useMemo, useEffect } from "react";

// Design
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

// Internal
import PageWrapper from "../../structure/PageWrapper";
import * as bookws from "../../services/bookws";

const style = {
  grid: Object.assign({}, window.app_config?.style?.box ?? {}, {
    bgcolor: "#c6c4c4",
  }),
  textfield: {
    width: "700px",
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#393536',
      },
      '&:hover fieldset': {
        borderColor: '#393536',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#393536',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#393536',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#393536',
    },
    '& .Mui-disabled': {
      color: '#393536',
    },
    marginRight: "5px"
  },
  searchButton: {
    bgcolor: "#393536",
    width: 150,
    margin: "20px",
  },
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await bookws.getLivros();
        setBooks(fetchedBooks);
        setSearchResults(fetchedBooks)
      } catch (error) {
        console.error("Erro ao buscar livros", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    const results = books.filter(book =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <PageWrapper>
      {({ width, height }) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={width}
          height={height}
          sx={style.grid}
          // p={4}
        >
          <Box display="flex" justifyContent="center" alignItems="center" m={3}>
            <TextField
              label="Título"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={style.textfield}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={style.searchButton}>
              Buscar
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              maxHeight: "500px",
              overflowY: "auto",  
              width: "95%",
              justifyContent: "center",
              // alignItems:"center",
            }}
            // mb={4}
            // p={1}
          >
            <Grid container maxWidth={"80%"} spacing={4}>
              {searchResults.length > 0 ? (
                searchResults.map((book, index) => (
                  <Grid item key={index}>
                    <Box
                      p={2}
                      border="1px solid #ccc"
                      borderRadius="4px"
                      bgcolor="#fff"
                      sx={{
                        width: "180px",
                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">{book.titulo}</Typography>
                      <Typography>Autor: {book.autor}</Typography>
                      <Typography>Editora: {book.editora}</Typography>
                      <Typography>Ano de Publicação: {book.anoPublicacao}</Typography>
                      <Typography>Disponivel: {book.disponivel ? "Sim" : "Não"}</Typography>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography>Nenhum resultado encontrado.</Typography>
              )}
            </Grid>
            </Box>
          </Box>
      )}
        </PageWrapper>
      );
}
