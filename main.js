

async function Main(query){

    try{
        const search_q = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`)
        console.log(search_q)
        
        let json_q = await search_q.json()
        //console.log(json_q)
        if(json_q.length > 1){

            //console.log('high')
            json_q.forEach((el,inde) => {
                let html = `<div class="collection">${json_q[inde].title}</div><br>`
                main_html.insertAdjacentHTML('beforeend',html)
            });

        }else{
            let search_woeid = json_q[0].woeid

            const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${search_woeid}`)
            let json = await res.json()
            
            let today = json.consolidated_weather[0]
            let min_temp = Math.round(today.min_temp)
            let max_temp = Math.round(today.max_temp)
            let icon = today.weather_state_abbr
            let state = today.weather_state_name

            console.log(`${min_temp} and ${max_temp}`)
            console.log(json.title)

            city_display(json.title,icon,state)
            temp_display(min_temp,max_temp)
        }
        
    }
    catch(error){
        alert(error)
    }
}


let city_html =  document.querySelector('.city')
let main_html = document.querySelector('.main')
let temp_html = document.querySelector('.temp')
let btn = document.getElementById('btn')

btn.addEventListener('click',()=>{
    main_html.innerHTML = ''
    city_html.innerHTML = ''
    temp_html.innerHTML = ''
    let value = document.getElementById('w_input')
    //console.log(value.value)
    Main(value.value)
    document.getElementById('w_input').value = ''
})

function city_display(city,ico,about){
    let html = `City : ${city}   <img src="https://www.metaweather.com/static/img/weather/ico/${ico}.ico"> <br> ${about}`
    city_html.innerHTML = html
}

function temp_display(min,max){
    let html = `Minimum Temperature : ${min}°celcius <br> Maximum Temperature : ${max}°celcius`
    temp_html.innerHTML = html
}

main_html.addEventListener('click',(event)=>{
    main_html.innerHTML = ''
    let new_q = event.target.innerHTML
    Main(new_q)
})




