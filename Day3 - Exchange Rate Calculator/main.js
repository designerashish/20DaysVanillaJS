const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const swapbtn = document.getElementById("swap");
const rate = document.getElementById("rate");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");


//fetch exchange rates and update the DOM
function calculate(){
    const val_one = currencyEl_one.value;
    const val_two = currencyEl_two.value;

    fetch(`https://open.er-api.com/v6/latest/${val_one}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);

        const rates = data.rates[val_two];    

        rate.innerText = `1 ${val_one} = ${rates} ${val_two}`;  
        
        amount_two.value = (amount_one.value*rates).toFixed(2); 
      });
}

// Event Listeners

currencyEl_one.addEventListener('change', calculate);
amount_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);
swapbtn.addEventListener('click', function(){
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
 currencyEl_two.value = temp; 
 calculate(); 
})
calculate();