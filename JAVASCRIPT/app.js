let API_KEY = "1bcc3e586b53706545459c2722ca737e" ; // TOOK NEW API KEY ON 22-9-2024
// let API_KEY = "dXOg5i_q8g403p0agqX77GgDeBwb-TQt" ; 
let Video = document.querySelector('video') ;
let WatchNow = document.querySelector('#WatchNow') ;
Video.currentTime=8 ;
Video.volume=0 ;
let isPlaying = true ;
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
 
 
let genreListForMovies = [
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
let genreListForTvShows = [
    {
      "id": 10759,
      "name": "Action & Adventure"
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
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Science Fiction & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
let languageList = [
  {
    LongName : 'English' , 
    ShortName : 'en'
  } , 
  {
    LongName : 'French' , 
    ShortName : 'fr'
  } , 
  {
    LongName : 'Hindi' , 
    ShortName : 'hi'
  } , 
  {
    LongName : 'Japanese' , 
    ShortName : 'ja'
  } ,
  {
    LongName : 'Korean' , 
    ShortName : 'ko'
  }  
]




let trendingMoviesList = [] ;
let newReleasesMoviesList = [] ;
let topRatedMoviesList = [] ; 
let ResultAreaMoviesList = [] ; 

async function getTrendingShows() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
      
    }
}
async function getNewReleases() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTopRated() {
    try{
        const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesByGenre(genre_id) {
    try{
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres="+genre_id+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTvShowsByGenre(genre_id) {
    try{
        const response = await fetch("https://api.themoviedb.org/3/discover/tv?with_genres="+genre_id+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesByLang(lang) {
    try{
        const response = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&with_original_language="+lang+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTVShowsByLang(lang) {
    try{
        const response = await fetch("https://api.themoviedb.org/3/discover/tv?include_adult=false&with_original_language="+lang+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesForKids(cartoonTitle) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=`+cartoonTitle.toLowerCase()+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTVShowsForKids(cartoonTitle) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=`+cartoonTitle.toLowerCase()+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getMoviesBySearch(query) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=`+query.toLowerCase()+"&api_key="+API_KEY);
        const jsonData = await response.json();
        return jsonData.results ; 
    }
    catch(error){
        console.log(error)
    }
}
async function getTVShowsBySearch(query) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=`+query.toLowerCase()+"&api_key="+API_KEY);
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
let genreArray ; 
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
  parentArea.onclick = function(e){
        let id = e.target.id ;
        id = parseInt(id);
        if(id>=0)
        {
            ResultArea.style.transition = "0.2s"; 
            ResultArea.style.height = "0%";
            ResultArea.innerHTML="";
            search.value = "";
            language.innerText =  List[id].original_language ;
            if(List[id].vote_average>3){
              rating.innerText =  List[id].vote_average.toPrecision(2)+"/10" ; 
            }else {
              rating.innerText =  'N/A' ; 
            }

            genreArray = List[id].genre_ids ; 
            let genreStrings = "" ; 
            if(List[id].hasOwnProperty("name")){
              title.innerText =  List[id].name ;
              year.innerText =  List[id].first_air_date.slice(0,4) ;
              for(let i in genreArray)
              {
                for(let j in genreListForTvShows )
                {
                    if(genreArray[i] == genreListForTvShows[j].id)
                    {
                        genreStrings += (genreListForTvShows[j].name + ' , ')
                        break ; 
                    }
                }
              }
            }
            else{
              title.innerText =  List[id].title ;
              year.innerText =  List[id].release_date.slice(0,4) ;
              for(let i in genreArray)
              {
                for(let j in genreListForMovies )
                {
                    if(genreArray[i] == genreListForMovies[j].id)
                    {
                        genreStrings += (genreListForMovies[j].name + ' , ')
                        break ; 
                    }
                }
              }
            }
            genre.innerText =  genreStrings.slice(0,-2)

            description.innerText =  List[id].overview ;

            if(!List[id].backdrop_path)
            {
              background.innerHTML= `<img id="BlackImage" src="IMAGES_AND_VIDEO/Play.png">`;
              background.style.backgroungColor = "black"
            }
            else{
              background_image_src = `${'https://image.tmdb.org/t/p/original'+List[id].backdrop_path}`
              background.innerHTML = `<img src=${background_image_src}><p id="p"></p>`;
            }

            videoJobFinished = true ;  
            description.scrollTo(0, 0) ; 
            window.scrollTo(0, 0) ; 
          }
    }
}

ContentDisplay(items[0],trendingMoviesList)
ContentDisplay(items[1],newReleasesMoviesList)
ContentDisplay(items[2],topRatedMoviesList)



let logoAndName = document.querySelector("#Logo_Name") ; 
let sidebarMoviesCategories = document.querySelectorAll(".Movies_Categories_List") ; 
let ResultArea = document.querySelector("#ResultArea") ;
let sidebar = document.querySelector("#Sidebar") ; 
let menu = document.querySelector("#Menu") ; 
let isMenuOpen = false ; 

logoAndName.addEventListener('click',()=>{
  ResultArea.style.transition = "0.2s"; 
  ResultArea.style.height = "0%";
  ResultArea.innerHTML="";
} ) 

sidebarMoviesCategories[0].addEventListener('click',async function(e){
  if(e.target.localName==='li'){
    sidebar.classList.remove("Sidebar_With_Menu") ; 
    menu.classList.remove("TurnedMenu") ; 
    isMenuOpen = false ;
    ResultArea.innerHTML="";
    keyword = e.target.innerText ;
    ResultArea.style.transition = "1s"
    ResultArea.style.height = "100%" ; 
    window.scrollTo(0, 0); 
    ResultAreaMoviesList = [] ; 

    let genre_id ; 
    for( let i=0 ; i < genreListForMovies.length ; i++ ) {
      if(genreListForMovies[i].name.search(keyword)>=0 )
        {
          genre_id = genreListForMovies[i].id;
            break;
        }
    }
    if(genre_id) ResultAreaMoviesList.push(...(await getMoviesByGenre(genre_id))) ; 
    for( let i=0 ; i < genreListForTvShows.length ; i++ ) {
      if(genreListForTvShows[i].name.search(keyword)>=0 )
        {
          genre_id = genreListForTvShows[i].id;
            break;
        }
    }
    if(genre_id) ResultAreaMoviesList.push(...(await getTvShowsByGenre(genre_id))) ;

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

sidebarMoviesCategories[1].addEventListener('click',async function(e){
  if(e.target.localName==='li'){
    sidebar.classList.remove("Sidebar_With_Menu") ; 
    menu.classList.remove("TurnedMenu") ; 
    isMenuOpen = false ;
    ResultArea.innerHTML="";
    keyword = e.target.innerText ;
    ResultArea.style.transition = "1s"
    ResultArea.style.height = "100%" ; 
    window.scrollTo(0, 0); 
    ResultAreaMoviesList = [] ; 
    for( let i=0 ; i < languageList.length ; i++ )
    {
      if(keyword==languageList[i].LongName)
      {
        keyword = languageList[i].ShortName ; 
        break ; 
      }
    }
    ResultAreaMoviesList.push(...(await getMoviesByLang(keyword))) ;
    ResultAreaMoviesList.push(...(await getTVShowsByLang(keyword))) ;
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


sidebarMoviesCategories[2].addEventListener('click',async function(e){
  if(e.target.localName==='li'){
    sidebar.classList.remove("Sidebar_With_Menu") ; 
    menu.classList.remove("TurnedMenu") ; 
    isMenuOpen = false ;
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
    sidebar.classList.remove("Sidebar_With_Menu") ; 
    menu.classList.remove("TurnedMenu") ; 
    isMenuOpen = false ;
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
    if(ResultAreaMoviesList.length==0){
      let inform = document.createElement('div') ; 
      inform.innerHTML = `No Result Found For <b>${query}</b><p>The show you are looking for could have some other spelling !</p><p>Click the logo at the top to go back to home.</p>` ; 
      inform.id = 'Inform' ; 
      ResultArea.appendChild(inform) ;
    }
  }
  ContentDisplay(ResultArea,ResultAreaMoviesList)
})


window.addEventListener('click',(e)=>{
  if(e.target.id !== "Menu"){
  sidebar.classList.remove("Sidebar_With_Menu")
  menu.classList.remove("TurnedMenu");
  isMenuOpen = false ; 
  }
})

menu.addEventListener('click' , function(){
  if(isMenuOpen)
  {
    sidebar.classList.remove("Sidebar_With_Menu") ;
    menu.classList.remove("TurnedMenu") ; 
    isMenuOpen = false ;
  }
  else{
    sidebar.classList.add("Sidebar_With_Menu") ; 
    menu.classList.add("TurnedMenu") ; 
    isMenuOpen = true ;
  }
} )

