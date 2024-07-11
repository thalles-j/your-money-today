document.addEventListener('DOMContentLoaded', function(){
    const apiKey = ""
    const seletorMoeda = document.getElementById("coin")
    const result = document.getElementById("result")
    const selectSpan = document.getElementById("selectSpan")

    seletorMoeda.addEventListener('change', function(){
        const seletorValue = seletorMoeda.value;

        if (seletorValue === 'dollar')
        {
            console.log("lindo")
        }
        else
        {
            console.log("feio")
        }


    })



});