import React, { useState, useMemo, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import * as loanws from "../../services/loanws";

// Design
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from '@mui/material/Tooltip';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css"
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
  bookBox: {
    width: "120px",        // Aumentando a largura da box
    height: "450px",       // Ajustando a altura da box
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    // margin: "0 20px",      // Ajustando o espaçamento lateral entre os itens
    cursor: "pointer",
    // border: "1px solid #ccc",
    borderRadius: "4px",
    bgcolor: "#D3D3D3"
  },
  bookImage: {
    maxHeight: "90%",
    width: "100%",          // A imagem ocupará toda a largura da box
    height: "auto",         // A altura será ajustada automaticamente para manter a proporção
    objectFit: "contain",   // A imagem se ajustará dentro da box, sem cortar e mantendo as proporções
    borderRadius: "4px",
  },

  bookTitle: {
    paddingTop: "10px",
    fontSize: "16px",
    // fontWeight: "bold",
  },
  dialogContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogImage: {
    width: "30%",
    marginRight: "20px",
  },
  dialogText: {
    width: "65%",
  },
  dialogButton: {
    margin: "10px",
  },
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchMethod, setSearchMethod] = useState("titulo");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const userData = JSON.parse(sessionStorage.getItem("usuario") || {})
  console.log({ userData: userData })

  useEffect(() => {
    let filteredBooks = books;

    if (searchValue.trim() !== "") {
      if (searchMethod === "id") {
        filteredBooks = filteredBooks.filter((book) => book.isbn.includes(searchValue));
      } else if (searchMethod === "titulo") {
        filteredBooks = filteredBooks.filter((book) => book.titulo.toLowerCase().includes(searchValue.toLowerCase()));
      }
    }

    setSearchResults(filteredBooks);
    console.log({ sessionStorage: sessionStorage })
  }, [searchMethod, searchValue, books]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await bookws.getLivros();
        setBooks(fetchedBooks);
        setSearchResults(fetchedBooks);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data); // Assuma que a API retorna uma lista de usuários
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchMethodChange = (event) => setSearchMethod(event.target.value);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
  };

  const handleRequestBook = async () => {
    if (!selectedBook) return;

    // const payload = {
    //   livroId: parseInt(selectedBook.id),
    //   userId: parseInt(userData.id),
    // };

    console.log({selectedBook})
    const loanData = {
      livroId: parseInt(selectedBook.id),
      clienteId: parseInt(userData.id),
    };

    try {
      const result = await loanws.solicitarEmprestimo(loanData);
      alert(result);  // Exibe a mensagem de sucesso
      loanws.listarEmprestimos();
      window.location.reload();
    } catch (error) {
      alert("Erro ao solicitar empréstimo.");
    }
  }


  // const userData = JSON.parse(sessionStorage.getItem("usuario") || {})
  // console.log({ userData: userData })

  const sliderSettings = {
    useCSS: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
        >
          <Box display="flex" justifyContent="center" alignItems="center" m={3}>
            {/* <FormControl fullWidth>
              <InputLabel shrink
                sx={{
                  color: '#393536',
                  '&.Mui-focused': { color: '#393536' },
                }}> Método</InputLabel>
              <Select
                label="Método"
                value={searchMethod}
                onChange={handleSearchMethodChange}
                sx={style.select}
                displayEmpty
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="titulo">Título</MenuItem>
              </Select>
            </FormControl> */}
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

          <Box sx={{ width: "90%", mt: 4 }}>
            {searchResults.length > 0 ? (
              <Slider {...sliderSettings} >
                {searchResults.map((book, index) => (
                  <Box
                    key={index}
                    sx={style.bookBox}
                    onClick={() => handleBookClick(book)}
                  >
                    {/* Mostrar imagem do livro */}
                    <img
                      src={book.imgURL && book.imgURL.trim() !== "" ? `/assets/${book.imgURL}.jpg` : "/assets/images.png"} // Substitua com o caminho correto da imagem
                      alt={book.titulo}
                      style={style.bookImage}
                    // style={{
                    //   width: "100%",
                    //   height: "auto",
                    //   objectFit: "cover", // Faz a imagem cobrir toda a área da box sem distorção
                    //   borderRadius: "4px",
                    // }}
                    />
                    {/* Exibir o título do livro abaixo da imagem */}
                    <Typography sx={style.bookTitle}>{book.titulo}</Typography>
                  </Box>
                ))}
              </Slider>
            ) : (
              <Typography>Nenhum resultado encontrado.</Typography>
            )}
          </Box>

          {/* Caixa de diálogo */}
          <Dialog open={Boolean(selectedBook)} onClose={handleCloseDialog}>
            {selectedBook && (
              <>
                <DialogTitle>{selectedBook.titulo}</DialogTitle>
                <DialogContent sx={style.dialogContent}>
                  {/* Imagem do livro */}
                  <img
                    src={selectedBook.imgURL && selectedBook.imgURL.trim() !== "" ? `/assets/${selectedBook.imgURL}.jpg` : "/assets/images.png"}
                    alt={selectedBook.titulo}
                    style={style.dialogImage}
                  />
                  {/* Detalhes do livro */}
                  <Box sx={style.dialogText}>
                    <Typography variant="h6">Autor: {selectedBook.autor}</Typography>
                    <Typography>Editor(a): {selectedBook.editora}</Typography>
                    <Typography>Ano de Publicação: {selectedBook.anoPublicacao}</Typography>
                    <Typography>ISBN: {selectedBook.isbn}</Typography>
                    <Typography>Disponível: {selectedBook.disponivel ? "Sim" : "Não"}</Typography>
                    {selectedBook.tipo === "Fisico" && (
                      <Typography>Quantidade: {selectedBook.quantidade}</Typography>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} sx={style.dialogButton}>Voltar</Button>
                  <Button onClick={handleRequestBook} sx={style.dialogButton} variant="contained">
                    Solicitar
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </Box>
      )}
    </PageWrapper>
  );
}
