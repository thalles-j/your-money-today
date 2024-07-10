document.addEventListener('DOMContentLoaded', function(){
    const apiKey = ""
    const seletorMoeda = document.getElementById("coin")
    const result = document.getElementById("result")

    seletorMoeda.addEventListener('change', function(){
        const seletorValue = seletorMoeda.value;

        if (seletorValue === 'dollar'){
            result.innerHTML = ' ok'
        }


    })


});