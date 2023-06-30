// https://www.omdbapi.com/?t=pokemon&apikey=5001b86d
// d170b89569a0f5f6e085a0052a0e5b84
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTcwYjg5NTY5YTBmNWY2ZTA4NWEwMDUyYTBlNWI4NCIsInN1YiI6IjY0OWQ5MTMzMDkxZTYyMDEwYzEwZmE0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FqiirS2Y6aTaCFlvRvHL05pY8WOk0yyc2a0QgH70c2c


let Video = document.querySelector('video');
let WatchNow = document.querySelector('#WatchNow');
Video.currentTime=8;
Video.volume=0;
let isPlaying = true;
WatchNow.addEventListener('click',()=>{
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
})




let trendingMoviesList = [] ;
let newReleasesMoviesList = [] ;
let topRatedMoviesList = [] ; 

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

async function renderMoviesPoster(getMovies,List,n){
    List = await getMovies();
    let moviesScrollArea = document.querySelectorAll('.Movies_List')[n]
    for(let i=0;i<List.length;i++)
    {
        let image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original" + List[i].poster_path ;
        image.id = `${i}` ; 
        moviesScrollArea.appendChild(image);
        console.log(List)
        
    }
}

renderMoviesPoster(getTrendingShows,trendingMoviesList,0);
renderMoviesPoster(getNewReleases,newReleasesMoviesList,1);
renderMoviesPoster(getTopRated,topRatedMoviesList,2);
console.log(trendingMoviesList[0])



let title = document.querySelector('#Title')
let language = document.querySelector('#Language')
let year = document.querySelector('#Year')
let rating = document.querySelector('#Rating')
let genre = document.querySelector('#Genre')
let description = document.querySelector('#Description')
let background = document.querySelector('#Movie_Video_Image div')


let items = document.getElementsByClassName("Movies_List");

for(let i=0;i<3;i++){
    items[i].addEventListener("wheel", function (e) {
            if (e.deltaY > 0) items[i].scrollLeft -= 250;
            else items[i].scrollLeft += 250;
        })
    items[i].addEventListener('click',function(e){
        console.log(e);
    })
 }

items[0].addEventListener('click',function(e){
    let id = e.target.id ; 
    if(id!=="")
    {
        id = parseInt(id);
        console.log(trendingMoviesList[id]) ;       
        language.innerText =  trendingMoviesList[id].original_language ;
        year.innerText =  trendingMoviesList[id].release_date.slice(0,4) ; 
        rating.innerText =  trendingMoviesList[id].vote_average ; 
        // genre.innerText =  trendingMoviesList[id].
        description.innerTxext =  trendingMoviesList[id].overview ;
        // background.
    }
})

