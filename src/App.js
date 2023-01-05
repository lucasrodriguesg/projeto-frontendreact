import React from "react";
import styled from "styled-components";
import Home from "./Components/Home";
import Carrinho from "./Components/Carrinho";

const CardProduto = styled.div`
  height: 65vh;
  width: 18vw;
  padding: 0px 0px 20px 0px;
  box-shadow: 1px 1px 5px #4daecd;
  border-radius: 9px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  overflow: hidden;
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    width: 65vw;
  }

  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
const ProdutoImg = styled.img`
  width: 100%;
  height: 75%;
`;
const MainPrincipal = styled.div`
 background:linear-gradient(rgba(250,0,0,0.5),transparent);
  background-color: purple;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FooterPrincipal = styled.div`
  background-color:purple;
  height: 12vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
    background-color: #4daecd;
    height: 16vh;
  }
`;


class App extends React.Component {
  state = {
    produtos: [
      {
        id: 1,
        name: "Camisa AstroDev Botão",
        price: 150,
        imagemURL: <ProdutoImg src="/img/CamisaAstroDevBotao.png" />,
        quantidade: 1,
      },
      {
        id: 2,
        name: "Camisa AstroDev Rock",
        price: 80,
        imagemURL: <ProdutoImg src="/img/CamisaAstroDevRock.png" />,
        quantidade: 1,
      },
      {
        id: 3,
        name: "Camisa Homer Astronauta",
        price: 80 ,
        imagemURL: <ProdutoImg src="/img/CamisaHomerAstronauta.png" />,
        quantidade: 1,
      },
      {
        id: 4,
        name: "Casaco Astronauta Ziper",
        price:180,
        imagemURL: <ProdutoImg src="/img/CasacoAstronauta.png" />,
        quantidade: 1,
      },
      {
        id: 5,
        name: "Camisa AstroDev Balão",
        price: 100,
        imagemURL: <ProdutoImg src="/img/CamisaAstroDevBalão.png" />,
        quantidade: 1,
      },
      {
        id: 6,
        name: "Camisa ET Voador",
        price: 85,
        imagemURL: <ProdutoImg src="/img/CamisaEtVoador.png" />,
        quantidade: 1,
      },
      {
        id: 7,
        name: "Boné Nave Espacial",
        price: 50,
        imagemURL: <ProdutoImg src="/img/BoneNaveEspacial.png" />,
        quantidade: 1,
      },
      {
      id: 8,
      name: "Colar Espaço Redondo",
      price: 35,
      imagemURL: <ProdutoImg src="/img/ColarEspaço.png" />,
      quantidade: 1,
    },
    {
      id: 9,
      name: "EcoBag Nave Espacial",
      price: 45,
      imagemURL: <ProdutoImg src="/img/EcoBagNaveEspacial.png" />,
      quantidade: 1,
    },
    ],
    filtro: "",
    query: "",
    minPrice: "",
    maxPrice: "",
    order: 1,
    pagina: false,
    produtosNoCarrinho: [],
    adicionados: false,
    quantidadeProdutos: 0,
  };

  
  adicionaProduto = (produtoId) => {
    this.setState({
      adicionados: false,
      quantidadeProdutos: this.state.quantidadeProdutos + 1,
    });

    const prod = this.state.produtos.filter((p) => {
      return p.id === produtoId;
    });
    const novaProduto = prod[0];

    const novoProdutoIndex = this.state.produtosNoCarrinho.findIndex((p) => {
     return p.id === produtoId;
    }) 
    if (novoProdutoIndex === -1){
      const novoProdutoAdicionado = [
        ...this.state.produtosNoCarrinho,
        novaProduto,
      ];
      console.log(novoProdutoAdicionado)
      this.setState({ produtosNoCarrinho: novoProdutoAdicionado });
    } else { 
        const copiaCarrinho = [...this.state.produtosNoCarrinho]
        copiaCarrinho[novoProdutoIndex].quantidade++
        this.setState({ produtosNoCarrinho: copiaCarrinho });
    }

    
  };

  removerProduto = (id) => {
    const novosProdutosNoCarrinho = this.state.produtosNoCarrinho
      .map((produto) => {
        if (produto.id === id) {
          return {
            ...produto,
            quantidade: produto.quantidade - 1,
          };
        }
        return produto;
      })
      .filter((produto) => produto.quantidade > 0);

    this.setState({
      produtosNoCarrinho: novosProdutosNoCarrinho,
    });
  };

  renderizaCarrinho = () => {
    this.setState({ pagina: true });
  };

  renderizaPaginaFalse = () => {
    this.setState({ pagina: false });
  };

  updateQuery = (ev) => {
    this.setState({
      query: ev.target.value,
    });
  };

  updateMinPrice = (ev) => {
    this.setState({
      minPrice: ev.target.value,
    });
  };

  updateMaxPrice = (ev) => {
    this.setState({
      maxPrice: ev.target.value,
    });
  };
  updateOrder = (ev) => {
    this.setState({
      order: ev.target.value,
    });
  };

  render() {
    let componenteCarrinho;

    if (this.state.adicionados) {
      componenteCarrinho = this.adicionaProduto;
    }

    if (this.state.pagina) {
      return (
        <Carrinho
          produtos={this.state.produtosNoCarrinho}
          removerProduto={this.removerProduto}
          renderizaPaginaFalse={this.renderizaPaginaFalse}
        />
      );
    }

    const novoArrayDeProdutos = this.state.produtos
      .filter((prod) => {
        return prod.name.toLowerCase().includes(this.state.query.toLowerCase());
      })
      .filter((prod) => {
        return this.state.minPrice === "" || prod.price >= this.state.minPrice;
      })
      .filter((prod) => {
        return this.state.maxPrice === "" || prod.price <= this.state.maxPrice;
      })
      .sort((cres, dec) => {
        return this.state.order * (cres.price - dec.price);
      })
      .map((produto) => {
        return (
          <CardProduto>
            {produto.imagemURL}
            <p>{produto.name}</p>
            <p>R${produto.price},00</p>
            <button onClick={() => this.adicionaProduto(produto.id)}>
              Adicionar ao carrinho
            </button>
          </CardProduto>
        );
      });

    return (
      <div>
        <Home
          query={this.state.query}
          updateQuery={this.updateQuery}
          minPrice={this.state.minPrice}
          updateMinPrice={this.updateMinPrice}
          maxPrice={this.state.maxPrice}
          updateMaxPrice={this.updateMaxPrice}
          order={this.state.order}
          updateOrder={this.updateOrder}
          renderizaCarrinho={this.renderizaCarrinho}
          quantidadeProdutos={this.state.quantidadeProdutos}
        ></Home>
        <MainPrincipal>{novoArrayDeProdutos}</MainPrincipal>

        <FooterPrincipal>
        <h3>Feito por Lucas Rodrigues Guimarães - Ammal B</h3>
        </FooterPrincipal>
      </div>
    );
  }
}
export default App;
