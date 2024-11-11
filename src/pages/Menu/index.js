// React
import React, { useState, useMemo, useEffect } from "react";

// Design
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Internal
import PageWrapper from "../../structure/PageWrapper";

// Sample list of books
const books = [
  { titulo: "Dom Quixote", autor: "Miguel de Cervantes", editora: "Planeta", anoPublicacao: 1605, ISBN: "1234567890", tipo: "fisico" },
  { titulo: "1984", autor: "George Orwell", editora: "Companhia das Letras", anoPublicacao: 1949, ISBN: "2345678901", tipo: "ebook" },
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien", editora: "HarperCollins", anoPublicacao: 1937, ISBN: "3456789012", tipo: "fisico" },
  // Adicione mais livros como desejar
];

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

export default function Home({ pageOptions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(books);
  }, []);

  const handleSearch = () => {
    const results = books.filter(book =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log({sessionStorage: sessionStorage})
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
          p={4}
        >
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
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

          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {searchResults.length > 0 ? (
              searchResults.map((book, index) => (
                <Grid item key={index}>
                  <Box
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="4px"
                    bgcolor="#fff"
                  >
                    <Typography variant="h6">{book.titulo}</Typography>
                    <Typography>Autor: {book.autor}</Typography>
                    <Typography>Editora: {book.editora}</Typography>
                    <Typography>Ano de Publicação: {book.anoPublicacao}</Typography>
                    <Typography>ISBN: {book.ISBN}</Typography>
                    {/* <Typography>Tipo: {book.tipo}</Typography> */}
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>Nenhum resultado encontrado.</Typography>
            )}
          </Grid>
        </Box>
      )}
    </PageWrapper>
  );
}
