window.addEventListener('load', () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setMilliseconds(null)
    now.setSeconds(null)
  
    document.getElementById('loadingDate').value = now.toISOString().slice(0, -1);

    document.getElementById('total').addEventListener("focus", (e)=>{
        e.preventDefault();

    const weight = document.getElementById("weight").value;
    const rate = document.getElementById("rate").value;
    document.getElementById('total').value = weight * rate;
    });
});


// const total = document.getElementById('total');

// function calculate(e) {
//     e.preventDefault();

//     const weight = document.getElementById("weight").value;
//     const rate = document.getElementById("rate").value;
//     total.value = weight * rate;
// }

// document.getElementById('total').addEventListener("focus", ()=>{
//     e.preventDefault();

//     const weight = document.getElementById("weight").value;
//     const rate = document.getElementById("rate").value;
//     document.getElementById('total').value = weight * rate;
// });