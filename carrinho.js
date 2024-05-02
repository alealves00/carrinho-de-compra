// Define um array de objetos, onde cada objeto representa uma camisa com suas propriedades
const json = [
    {
       id: 1,
       name: "camisa nike",
       descriçao: "camisa preta 100% algodão",
       price: 20,
       imageUrl: "https://avatars.mds.yandex.net/i?id=7e4fe0aa9f947a1c750267f6891e14d2685e4901-10698321-images-thumbs&n=13"
    },
    {
       id: 2,
       name: "camisa puma",
       descriçao: "camisa polo branca",
       price: 40,
       imageUrl: "https://avatars.mds.yandex.net/i?id=4495aca7c175f6e10ae199c4d7c95ad3e6424912-5229005-images-thumbs&n=13"
    },
    {
        id: 3,
        name: "camisa lacoste",
        descriçao: "camisa polo preta",
        price: 80,
        imageUrl: "https://avatars.mds.yandex.net/i?id=652bbf86d37a8c31f115067bd9220df77040692d-10471613-images-thumbs&n=13"
     },
     {
        id: 4,
        name: "camisa adidas",
        descriçao: "camisa branca 100% algodão",
        price: 20,
        imageUrl: "https://avatars.mds.yandex.net/i?id=fc1a22effcaf8b205c3b181fec255588fc0d4dd7-9225598-images-thumbs&n=13"
     }
 ];
   
   //Inicializa um array vazio para armazenar os itens do carrinho

   let cart = [];
 
   //Funções para selecionar elementos do DOM

   const seleciona = (elemento) => document.querySelector(elemento);
   const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

   //Função para preencher os dados das camisas na página

   const preencheDadosDasCamisas = (camisaItem, item, index) => {
    camisaItem.setAttribute('data-key', index);
    camisaItem.querySelector('.camisa-item--img img').src = item.imageUrl;
    camisaItem.querySelector('.camisa-item--name').innerHTML = item.name;
    camisaItem.querySelector('.camisa-item--desc').innerHTML = item.descriçao;
    camisaItem.querySelector('.camisa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
   };

   //Função para preencher os dados do modal com as informações da camisa selecionada
   
   const preencheDadosModal = (item) => {
    seleciona('.camisabig img').src = item.imageUrl;
    seleciona('.conteudo h1').innerHTML = item.name;
    seleciona('.camisaInfo--desc').innerHTML = item.descriçao
    seleciona('.camisaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
   };
   
   //Adiciona os itens do array json à página e configura os eventos de clique

 json.forEach((item, index) => {
  let camisaItem = document.querySelector('.models .camisa-item').cloneNode(true);
  seleciona('.camisa-area').append(camisaItem);
  preencheDadosDasCamisas(camisaItem, item, index);
  camisaItem.querySelector('.camisa-item a').addEventListener('click', (e) => {
      e.preventDefault();
      let chave = pegarKey(e);
      mostrarJanela();
      preencheDadosModal(item);
      preencherTamanhos(chave);
      seleciona('.camisaInfo--qt').innerHTML = quantCamisa;
      mudarQuantidade(); 
  });
 });

 // Funções para mostrar e ocultar o modal
 
 seleciona('.fechar').addEventListener('click', ocultarJanela);
 
 function mostrarJanela() {
  document.querySelector('.janela ').style.display = 'block'; // Exibe a janela flutuante
 }
 
 function ocultarJanela() {
  document.querySelector('.janela').style.display = 'none'; // Oculta a janela flutuante
 }

 //Função para obter a chave do item clicado
 
 const pegarKey = (e) => {
  let key = e.target.closest('.camisa-item').getAttribute('data-key'); // identifica qual é a camisa q foi clicada
  quantCamisa = 1; 
  modalKey = key
  return key;
 }

//Função para preencher os tamanhos disponíveis no modal

 const preencherTamanhos = () => {
  let tamanhos = selecionaTodos('.camisaInfo--size');
  tamanhos.forEach((size, sizeIndex) => {
       size.classList.remove('selected');
       if (sizeIndex === 1) {
           size.classList.add('selected');
       } // aqui determina onde ficaria o selected 
       size.addEventListener('click', () => {
           tamanhos.forEach(size => size.classList.remove('selected'));
           size.classList.add('selected');
       }); //  esse evento é pra quando eu escolher outro tamanho o selected 
  });
 }

 // Função para alterar a quantidade de itens no modal
 
//  const mudarQuantidade = () => {
//     const qtMais = seleciona('.camisaInfo--qtmais');
//     const qtMenos = seleciona('.camisaInfo--qtmenos');

//     // Verifica se os event listeners já foram adicionados
//     if (!qtMais.dataset.listenerAdded) {
//         qtMais.addEventListener('click', () => {
//             quantCamisa++;
//             seleciona('.camisaInfo--qt').innerHTML = quantCamisa;
//             // Atualiza a quantidade no carrinho aqui, se necessário
//         });
//         qtMais.dataset.listenerAdded = true;
//     }
//     if (!qtMenos.dataset.listenerAdded) {
//         qtMenos.addEventListener('click', () => {
//             if(quantCamisa > 1) {
//                 quantCamisa--;
//                 seleciona('.camisaInfo--qt').innerHTML = quantCamisa;
//                 // Atualiza a quantidade no carrinho aqui, se necessário
//             }
//         });
//         qtMenos.dataset.listenerAdded = true;
//     }
// }

const mudarQuantidade = () => {
    let quantCamisa = 1; // sem isso da um erro de duplicagem 
    seleciona('.camisaInfo--qtmais').addEventListener('click', () => {
        quantCamisa++
        seleciona('.camisaInfo--qt').innerHTML = quantCamisa
    })
    seleciona('.camisaInfo--qtmenos').addEventListener('click', () => {
        if(quantCamisa > 1) {
            quantCamisa--
            seleciona('.camisaInfo--qt').innerHTML = quantCamisa	
        }
    })
}

// funçoes para abrir o carrinho

 const adicionarNoCarrinho = () => {
    seleciona('.camisaInfo--addButton').addEventListener('click', () => {
    let size = seleciona('.camisaInfo--size.selected').getAttribute('data-key')
    let price = seleciona('.camisaInfo--actualPrice').innerHTML.replace(/[^0-9.]/g, '');
    let identificador = json[modalKey].id+'t'+size
    let key = cart.findIndex( (itemm) => itemm.identificador === identificador )
    if(key > -1) {
        cart[key].qt += quantCamisa
    } else {
        let camisa = {
            identificador,
            id: json[modalKey].id,
            size, 
            qt: quantCamisa,
            price: parseFloat(price)
        }
        cart.push(camisa)
    }
   
    mostrarCart();
    ocultarJanela();
    atualizarCarrinho();
})
}

// funçoes para abrir o carrinho

const mostrarCart = () => {
    if(cart.length > 0) {
	    seleciona('aside').classList.add('show')
    }
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
        }
    })
}

    //Função para atualizar o carrinho na interface do usuário

const atualizarCarrinho = () => {
    seleciona('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0) {
        seleciona('aside').classList.add('show');
        let subtotal = cart.reduce((total, item) => total + item.price * item.qt, 0);
        let desconto = subtotal * 0; // Supondo que o desconto seja 0%
        let total = subtotal - desconto;
        let cartItems = cart.map(item => {
            let camisaItem = json.find(camisa => camisa.id === item.id);
            let cartItem = seleciona('.models .cart--item').cloneNode(true);
            let camisaSizeName = item.size;
            let camisaName = `${camisaItem.name} (${camisaSizeName})`;
            cartItem.querySelector('img').src = camisaItem.imageUrl;
            cartItem.querySelector('.cart--item-nome').innerHTML = camisaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = item.qt;
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                item.qt++;
                atualizarCarrinho();
            });
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(item.qt > 1) {
                    item.qt--;
                } else {
                    let index = cart.indexOf(item);
                    if(index > -1) {
                        cart.splice(index, 1);
                    }
                }
                atualizarCarrinho();
            });
            return cartItem;
        });
        seleciona('.cart').innerHTML = '';
        cartItems.forEach(item => seleciona('.cart').append(item));

        seleciona('.subtotal').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        seleciona('.desconto ').innerHTML = `R$ ${desconto.toFixed(2)}`;
        seleciona('.total ').innerHTML    = `R$ ${total.toFixed(2)}`;
    } else {
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
};
const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        seleciona('.menu-closer').classList.remove('show')
        seleciona('aside').classList.remove('show')
    })
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
    })
}
   adicionarNoCarrinho()
   mudarQuantidade()
   atualizarCarrinho()
   finalizarCompra()
   fecharCarrinho()