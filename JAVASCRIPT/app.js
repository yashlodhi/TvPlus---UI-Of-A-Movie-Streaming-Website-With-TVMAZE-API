// https://www.omdbapi.com/?t=pokemon&apikey=5001b86d
// TMDB = d170b89569a0f5f6e085a0052a0e5b84
// IMDB = k_dm8mowd8   ,    2nd apikey : k_v7ang381

let Video = document.querySelector('video');
let WatchNow = document.querySelector('#WatchNow');
Video.currentTime=8;
Video.volume=0;
let isPlaying = true;
let videoJobFinished = false ;
WatchNow.addEventListener('click',()=>{
  if(!videoJobFinished){
    if(isPlaying)
        {
            Video.pause();
            isPlaying = false ;
        }
    else
        {
            Video.play();
            Video.volume = 0.7 ; 
            isPlaying = true ;
        }
  }
})
 
 
let genreList = [
    {
      id: 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]



let trendingMoviesList = [] ;
let newReleasesMoviesList = [] ;
let topRatedMoviesList = [] ; 
let ResultAreaMoviesList = [] ; 

async function getTrendingShows() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getNewReleases() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTopRated() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesByGenre(genre) {
    // try{
    //     const response = await fetch();
    //     const jsonData = await response.json();
    //     return jsonData.results ; 
    // }
    // catch(error){
    //     console.log(error)
    // }
}
async function getMoviesByLang(lang) {
    // try{
    //     const response = await fetch();
    //     const jsonData = await response.json();
    //     return jsonData.results ; 
    // }
    // catch(error){
    //     console.log(error)
    //     console.log("THE DAIDLY LIMIT OF 100 API CALLS MIGHT HAVE REACHED") ; 
    // }
}
async function getMoviesForKids(cartoonTitle) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=`+cartoonTitle.toLowerCase()+"&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTVShowsForKids(cartoonTitle) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=`+cartoonTitle.toLowerCase()+"&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesBySearch(query) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=`+query.toLowerCase()+"&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTVShowsBySearch(query) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=`+query.toLowerCase()+"&api_key=d170b89569a0f5f6e085a0052a0e5b84");
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}

async function renderMoviesPoster(getMovies,List,n){
    List.push(...(await getMovies()));
    let moviesScrollArea = document.querySelectorAll('.Movies_List')[n]
    for(let i=0;i<List.length;i++)
    {
        let image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original" + List[i].poster_path ;
        image.id = `${i}` ; 
        moviesScrollArea.appendChild(image);
        
    }
}
renderMoviesPoster(getTrendingShows,trendingMoviesList,0);
renderMoviesPoster(getNewReleases,newReleasesMoviesList,1);
renderMoviesPoster(getTopRated,topRatedMoviesList,2);


let title = document.querySelector('#Title')
let language = document.querySelector('#Language')
let year = document.querySelector('#Year')
let rating = document.querySelector('#Rating')
let genre = document.querySelector('#Genre')
let description = document.querySelector('#Description')
let background = document.querySelector('#Movie_Video_Image div')
let genreArray , j ; 
let background_image_src ; 
let items = document.getElementsByClassName("Movies_List");
let search = document.querySelector("#Search_Box");

for(let i=0;i<3;i++){
    items[i].addEventListener("wheel", function (e) {
        if (e.deltaY > 0) items[i].scrollLeft -= 350;
        else items[i].scrollLeft += 350;
    })
}

function ContentDisplay(parentArea,List){
  parentArea.addEventListener('click',function(e){
        let id = e.target.id ;
        if(id!=="")
        {
            id = parseInt(id);
            console.log(List)
            ResultArea.style.transition = "0.2s"; 
            ResultArea.style.height = "0%";
            ResultArea.innerHTML="";
            search.value = "";
            if(List[id].hasOwnProperty("name")){
              title.innerText =  List[id].name ;
              year.innerText =  List[id].first_air_date.slice(0,4) ;
            }
            else{
              title.innerText =  List[id].title ;
              year.innerText =  List[id].release_date.slice(0,4) ;
            }
            language.innerText =  List[id].original_language ;
            rating.innerText =  List[id].vote_average ; 
            genreArray = List[id].genre_ids ; 
            let genreStrings = "" ; 
            for(let i in genreArray)
            {
                for( j in genreList )
                {
                    if(genreArray[i] == genreList[j].id)
                    {
                        genreStrings += (genreList[j].name + ' , ')
                        break ; 
                    }
                }
            }
            genre.innerText =  genreStrings.slice(0,-2)
            description.innerText =  List[id].overview ;
            if(!List[id].backdrop_path)
            {
              background.innerHTML= `<img width="100" height="50" src=""><p id="p"></p>`;
              background.style.backgroungColor = "black"
            }
            else{
              background_image_src = `${'https://image.tmdb.org/t/p/original'+List[id].backdrop_path}`
              background.innerHTML = `<img src=${background_image_src}><p id="p"></p>`;
            }
            videoJobFinished = true ; 
            window.scrollTo(0, 0);
        }
    })
}

ContentDisplay(items[0],trendingMoviesList)
ContentDisplay(items[1],newReleasesMoviesList)
ContentDisplay(items[2],topRatedMoviesList)



let logoAndName = document.querySelector("#Logo_Name") ; 
let sidebarMoviesCategories = document.querySelectorAll(".Movies_Categories_List") ; 
let ResultArea = document.querySelector("#ResultArea") ;

logoAndName.addEventListener('click',()=>{
  ResultArea.style.transition = "0.2s"; 
  ResultArea.style.height = "0%";
  ResultArea.innerHTML="";
} ) 

// sidebarMoviesCategories[0].addEventListener('click',async function(e){
//   if(e.target.localName==='li'){
//     ResultArea.innerHTML="";
//     keyword = e.target.innerText ;
//     ResultArea.style.transition = "1s"
//     ResultArea.style.height = "100%" ; 
//     let List = [] ; 
//     List.push(...(await getMoviesByGenre(keyword)))
//     console.log(List)
//     for(let i=0;i<List.length;i++)
//     {
//         let image = document.createElement('img');
//         image.src = List[i].image ;
//         image.id = `${i}` ; 
//         ResultArea.appendChild(image);        
//     }
//   }
// })
// sidebarMoviesCategories[1].addEventListener('click',async function(e){
//   if(e.target.localName==='li'){
//     ResultArea.innerHTML="";
//     keyword = e.target.innerText ;
//     ResultArea.style.transition = "1s"
//     ResultArea.style.height = "100%" ; 
//     let List = await getMoviesByLang(keyword) ; 
//     for(let i=0;i<List.length;i++)
//     {
//         let image = document.createElement('img');
//         image.src = List[i].image ;
//         image.id = `${i}` ; 
//         ResultArea.appendChild(image);       
//     }
//   }
// })


sidebarMoviesCategories[2].addEventListener('click',async function(e){
  if(e.target.localName==='li'){
    ResultArea.innerHTML="";
    keyword = e.target.innerText ;
    ResultArea.style.transition = "1s"
    ResultArea.style.height = "100%" ; 
    window.scrollTo(0, 0); 
    ResultAreaMoviesList = [] ; 
    ResultAreaMoviesList.push(...(await getTVShowsForKids(keyword))) ;
    ResultAreaMoviesList.push(...(await getMoviesForKids(keyword))) ;
    for(let i=0;i<ResultAreaMoviesList.length;i++)
    {
      if(ResultAreaMoviesList[i].poster_path)
      {
        let image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original"+ResultAreaMoviesList[i].poster_path;
        image.id = `${i}` ; 
        ResultArea.appendChild(image);
      }
    }
  }
  ContentDisplay(ResultArea,ResultAreaMoviesList)
})


search.addEventListener('change', async function(e){
  let query = search.value
  if(query){
    ResultAreaMoviesList = [] ; 
    ResultAreaMoviesList.push(...(await getTVShowsBySearch(query))) 
    ResultAreaMoviesList.push(...(await getMoviesBySearch(query))) 
    ResultArea.innerHTML="";
    ResultArea.style.transition = "1s"
    ResultArea.style.height = "100%" ;
    window.scrollTo(0, 0); 
    for(let i=0;i<ResultAreaMoviesList.length;i++)
    {
      if(ResultAreaMoviesList[i].poster_path)
      {
        let image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original"+ResultAreaMoviesList[i].poster_path;
        image.id = `${i}` ; 
        ResultArea.appendChild(image);
      }
    }
  }
  ContentDisplay(ResultArea,ResultAreaMoviesList)
})