

// Рендер карточек
class CardModel {
    constructor(src, title, check, arrow, parentSelector) {
        this.src = src;
      
        this.arrow = arrow;
        this.title = title;
        this.check = check;
        this.parent = document.querySelector(parentSelector);
        this.currentIndex = 0;
        this.element = null;
       
    }

    render() {
         this.element = document.createElement('div');
      

        this.element.className = 'mainModel';
        this.element.innerHTML = `
                <div class="modelImages">

                    <img class = "imgNone" src="${this.src}">
                   
                    
                </div>        
               
                <div class="mainModelText_1">
                    ${this.title}
                </div>

                <div class="mainModelText_2">
                    ${this.check}

                    <button class="arrow">
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

getCatalog('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({ img, title, check, arrow }) => {
            new CardModel(img, title, check, arrow, '.main_second_model').render();
            const buttonToUrl  = document.querySelectorAll('.arrow');
    
                
            buttonToUrl.forEach((button)=>{
            button.addEventListener("click", function() {
                       
                        window.location.href = "catalog.html";
                        console.log('click')
                    });
            })
                 

        });


    });

    // форма

    const  form = document.querySelector('.main_fours_form'),
            ModalForm = document.querySelector('.mainFormModel'),
            ModalFormText = document.querySelector('.mainFormModelText');

    const message ={
        loading: "Загрузка...",
        Success: "Спасибо, мы скоро с Вами свяжемся",
        fail: "Упс, что-то пошло не так"
    }
 
        form.addEventListener('submit', (e)=>{

            e.preventDefault();

            ModalForm.style.display = 'block';


            let stattusMessage = document.createElement('div');
            stattusMessage.classList.add('status');
            stattusMessage.textContent = message.loading;
            ModalFormText.append(stattusMessage);
            ModalForm.append(ModalFormText);
           
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);
            console.log(json);
            request.send(json);


            request.addEventListener('load', ()=>{
                if(request.status === 200){
                    console.log(request.response);
                    stattusMessage.textContent = message.Success;
                    form.reset();
                    setTimeout(()=>{
                        stattusMessage.remove()
                        ModalForm.style.display = 'none';
                    },3000);
                   
                }else{
                    stattusMessage.textContent = message.fail;
                }
            });



        });





function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' 
    });
}


const speech = document.querySelector('.main_first_button_1') 
if (speech) {
    speech.addEventListener('click', scrollToBottom);
}

const buttonCatalog = document.querySelector('.main_first_button')

buttonCatalog.addEventListener("click", function() {
                       
    window.location.href = "catalog.html";
    console.log('click')
});
        
          

      

      
          

          



          



   