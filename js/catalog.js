document.addEventListener('DOMContentLoaded', (event) => {
    const  choiseManWoman = document.querySelector('.choice_allStuff'),
           header = document.querySelector('.header'),
           footer = document.querySelector('.footer');
        

            
          
            history.pushState({ page: 'choise' }, null, '#choise');
          
    let cardcounter = 0;
    

    // рендер карточек
     
    
  class CardModel {
      constructor(src,   title, check, arrow, id, parentSelector) {
          this.src = src;
          this.arrow = arrow;
          this.title = title;
          this.check = check;
          this.parent = document.querySelector(parentSelector);
          this.currentIndex = 0;
          this.element = null;
          this.id = id;
          this.count = cardcounter++;
         
      }
  
      render() {

          this.element = document.createElement('div');
          this.element.className = `mainModel ${this.id}`;
          this.element.id= `${this.count}`

          this.element.innerHTML = `

                  <div class="modelImages">
  
                      <img class = "imgNone" src="${this.src}">
                    
                      
                  </div>        
                 
                  <div class="mainModelText_1">
                      ${this.title}
                  </div>
  
                  <div class="mainModelText_2">
                      <span>${this.check}</span>
  
                      <button class="arrow"  id='${this.count}'>
                          ${this.arrow}
                      </button>  
  
                  </div>
  
          `;
  
          this.parent.appendChild(this.element);
         
      };
    
  };
  
  const getCatalog = async (url) => {
         
          const res = await fetch(url);
  
          if (!res.ok) {
              throw new Error(`Could not fetch ${url}, status ${res.status}`);
          }
  
          return await res.json();
  };



  getCatalog('http://localhost:3000/man_card')
  .then(data => {
      data.forEach(({ img,  title, check, arrow, id }) => {
          new CardModel(img, title, check, arrow, id, '.choice_allStuff').render();
      });

      AddBasketGoods()
    });

    



//       поиск товаров

const things = document.querySelectorAll('.mainModel');
const searchInputStuff = document.getElementById('searchInputStuff');



const searchGoods = function(inputElement, productSelector) {

  inputElement.addEventListener('input', function () {
      const searchQuery = this.value.toLowerCase();
      const products = document.querySelectorAll(productSelector);
      products.forEach(function (product) {
          const productName = product.querySelector('.mainModelText_1').textContent.toLowerCase();
          if (productName.includes(searchQuery)) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  });
};

 searchGoods(searchInputStuff, '.choice_allStuff .mainModel');



// фильтр товаров

const panels = document.querySelectorAll('.choise__stuff a');

panels.forEach((panel) => {
    panel.addEventListener('click', (event) => {
        filterProductsByCategory(event.target.id);
    });
});

function filterProductsByCategory(id) {
    const things = document.querySelectorAll('.mainModel');

    things.forEach((goodsTS) => {
        if (goodsTS.id === id) {
            goodsTS.style.display = 'block';
        } else {
            goodsTS.style.display = 'none';
        }
    });
}



const AllGood = document.querySelector('.goods');
    AllGood.addEventListener('click', ()=>{
        function filterProducts() {
            const things = document.querySelectorAll('.mainModel');
            things.forEach((goodsTS) => {
                if (goodsTS.classList.contains('mainModel')) {
                    goodsTS.style.display = 'block';
                } else {
                    goodsTS.style.display = 'none';
                }
        
            });
        }
        filterProducts()
        
    })

//   корзина

const mainDiv = document.querySelector('body .main');
const body = document.querySelector('body')
let newBasket = document.createElement('div');
newBasket.classList.add('product')

newBasket.innerHTML = `
    <div class = 'bascekt_zero'>Корзина пустая</div>
    <a href="catalog.html" class="button_backToStuff">Назад к покупкам</a>
 `

newBasket.style.display = 'none'

function addBlockBascket(category) {
  
  mainDiv.parentNode.insertBefore(newBasket, mainDiv.nextSibling);
  const previousBlock = document.querySelector(category);
  previousBlock.style.display = 'none';
  recalculateTotalPrice() 

}

function recalculateTotalPrice() {
    let totalPrice = 0;  
    const basketItems = newBasket.querySelectorAll('.Basket_Items');
    basketItems.forEach(item => {
        const pricePerItem = parseFloat(item.querySelector('.Basket_price_stuff').textContent.trim());  
        const itemCount = parseInt(item.querySelector('.counter').textContent.trim(), 10);             
        totalPrice += pricePerItem * itemCount;
    });

    const totalElement = newBasket.querySelector('.count_order');
    if (totalElement) {
        totalElement.textContent = totalPrice.toFixed(2) + 'BYN';
    }
}

const basket = document.getElementById('basketstuff');

basket.addEventListener('click', () => {
 
    console.log('click')
    choiseManWoman.style.display = 'none';
  footer.style.display = 'none';
  newBasket.style.display = 'flex';
  addBlockBascket('.choice_allStuff');
  history.pushState({ page: 'basket' }, null, '#basket');



});


let stuffInBasket;
let counterEl;




async function AddBasketGoods() {


    
    const buttonBasket = document.querySelectorAll('.arrow');
   

    buttonBasket.forEach((button) => {

      
    button.addEventListener('click', (e) => {
 
          const clickedCard = e.target.closest('.mainModel');
          console.log(clickedCard)

          const productId = "product-" + clickedCard.id;
          console.log(productId)

          const productinfo = {
              id: clickedCard.id,
              imgSrc: clickedCard.querySelector('.imgNone').getAttribute('src'),
              title: clickedCard.querySelector('.mainModelText_1').innerText,
              price: clickedCard.querySelector('.mainModelText_2 span').textContent,
              count: 1
          };

         
          stuffInBasket = newBasket.querySelector(`#${productId}`);

        if (stuffInBasket && stuffInBasket.querySelector('.counter')) {

          

              counterEl = parseInt(stuffInBasket.querySelector('.counter').textContent, 10);
              counterEl++;
              stuffInBasket.querySelector('.counter').innerText = counterEl;
              recalculateTotalPrice();

        } else {
           
              const cartItemHTML = `
              <div class="Basket_Items" id="${productId}">
                  <div class="Basket_img">
                      <img class="imgNone" src=${productinfo.imgSrc}>
                  </div>        

                  <div class = "Basket_block">
                      <div class="Basket_name_stuff">
                          ${productinfo.title}
                      </div>
                      <div class="Basket_price_stuff">
                          ${productinfo.price}
                      </div>
                      <div class = "Basket_count_stuff">
                          <button class="Basket_buton_plus" >+</button>
                          <div class="counter">1</div>
                          <button class="Basket_buton_minus">-</button>
                      </div>
                  
                  </div>
                  
              </div>
              `;

              newBasket.insertAdjacentHTML('beforeend', cartItemHTML);

            function replaceButtonsAndAddEvent(buttonClass, action) {

                const buttons = newBasket.querySelectorAll(buttonClass);
            
               
                buttons.forEach((button) => {
                    const clone = button.cloneNode(true);
                    button.parentNode.replaceChild(clone, button);
                });
            
              
                const updatedButtons = newBasket.querySelectorAll(buttonClass);
            
                
                updatedButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        const container = event.target.closest('.Basket_Items');
                        if (container) {
                            let counterEl = +container.querySelector('.counter').textContent;
                            counterEl = action === 'increment' ? ++counterEl : --counterEl;
                            container.querySelector('.counter').innerText = counterEl;
                            recalculateTotalPrice();
                         
                        }if( container.querySelector('.counter').innerText == "0"){
                            container.remove();

                           
                            if (!newBasket.querySelector('.Basket_Items')) {
                                newBasket.querySelector('.goods_purchase').remove()
                                 newBasket.innerHTML = `
                                    <div class = 'bascekt_zero'>Корзина пустая</div>
                                    <a href="catalog.html" class="button_backToStuff">Назад к покупкам</a>
                                `
                            } else {
                             
                            }
                        }
                    });
                });
            }
            
        
            replaceButtonsAndAddEvent('.Basket_buton_plus', 'increment');
            replaceButtonsAndAddEvent('.Basket_buton_minus', 'decrement');
            
            
        }
         
        
         
            if(newBasket.querySelector('.Basket_Items') && !newBasket.querySelector('#uniqueProductDesignId')){

                
            
                const productDesign  = `

                    <div id="uniqueProductDesignId" class = "goods_purchase">
                
                        <div class = "order">
                            <div class = "text_order">
                               Ваш заказ                       
                            </div>

                            <div class= "order_counter" >
                                <div class = "count_order_text">
                                    Количество: 
                                </div>

                                <div class ="count_order" >
                                
                                </div>
                            </div>
                            
                     

                            <div class = "order_phone">
                                <div class = "order_phone_text">Your phone number: </div>  
                                <input required  name="phone" type="phone" class="order_phone_input" >
                            </div>
                                
                
                            <div class = "button_order_make">
                                <button class = "button_order">
                                    Купить
                                </button>
                            </div>
                        </div>
                        
                    </div>
                `
                newBasket.insertAdjacentHTML('afterbegin', productDesign);  
             
            }  

        const postData = async (url, data) => {
            try {
                let response = await $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data)
                });
                return response;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };

    
        
        $(document).ready(function() {
            function displayEmptyBasketMessage() {
                $(newBasket).html(`
                    <div class = 'bascekt_zero'>Корзина пустая</div>
                    <a href="catalog.html" class="button_backToStuff">Назад к покупкам</a>
                `);
            }
        
          
            if ($(newBasket).find('.Basket_Items').length === 0) {
                displayEmptyBasketMessage();
            }else if($(newBasket).find('.Basket_Items').length !== 0){
                $(newBasket).find('div:contains("Корзина пустая"), .button_backToStuff').remove();

            }
            
           
            

            $(newBasket).find('.button_order').off('click').on('click', async function(e) {
                e.preventDefault();
            
                const inputPhone = $('.order_phone_input').val();
            
                let orderItems = [];
                $('.Basket_Items').each(function() {
                    const title = $(this).find('.Basket_name_stuff').text().trim();
                    const count = parseInt($(this).find('.counter').text(), 10);
                    const total = parseFloat($('.count_order').text());
            
                    orderItems.push({ title, count, total });
                });
            
                const combinedTitle = orderItems.map(item => item.title).join(', ');
                const combinedCount = orderItems.map(item => `${item.count}:${item.title}`).join(', ');
        
                const jsonData = {
                    inputPhone,
                    orderItems: {
                        title: combinedTitle,
                        count: combinedCount,
                        total:parseFloat($('.count_order').text())
                        
                    }
                };
            
                try {
                    const data = await postData('http://localhost:3000/order', jsonData);
                    console.log(data);
                    
                    alert('Заказ готов, скоро Вам позвонят');
                    displayEmptyBasketMessage();

                } catch (error) {
                    console.log('Error:', error);
                }
            });
        });
        
    });

     
  });

}


});

