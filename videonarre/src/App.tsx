import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { darkTheme, lightTheme } from "./theme.ts";
import { Home } from "./router/home";
import Genre from "./router/Genre.tsx";
import Watch from "./router/Watch.tsx";
import Series from "./router/Series.tsx";
import Season from "./router/Season.tsx";

const GlobalStyle = createGlobalStyle`
  body{
    width: 100vw;
    height: 80%;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.bgColor};
    text-align: center;
  };
  button{
    background-color: ${(props) => props.theme.btnColor};
    border-radius:5px;
    color: ${(props) => props.theme.bgColor};
    &.themeBtn{
      margin-left: 10px;
    }
  };
  h1{
    color:${(props) => props.theme.h1Color};
    &:hover{
      color:${(props) => props.theme.hoverColor};
    }
  };
  h2{
    color:${(props) => props.theme.h2Color};
  };
  p{
    color:${(props) => props.theme.spanColor};
    font-weight: bold;
  }
  span{
    color:${(props) => props.theme.spanColor};
  };
  a{
    display: inline-block;
    text-decoration: none;
    padding: 0 10px 0 10px;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <button className="themeBtn" onClick={toggleDark}>
          Toggle Dark
        </button>
        <Link to="/genre/00">
          <h1>00</h1>
        </Link>
        <Link to="/genre/ent">
          <h1>Entertainment</h1>
        </Link>
        <Link to="/genre/movie">
          <h1>Movie</h1>
        </Link>
        <Link to="/genre/ani">
          <h1>Animation</h1>
        </Link>
        <Link to="/genre/drama">
          <h1>Drama</h1>
        </Link>
        <Routes>
          <Route path="/" Component={Home} element={<Home />} />
          <Route path="/watch/:id" Component={Watch} element={<Watch />} />
          <Route path="/genre/:genreId" Component={Genre} element={<Genre />} />
          <Route path="/series/:title" Component={Series} element={<Series />} />
          <Route path="/season/:title/:season" Component={Season} element={<Season />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
