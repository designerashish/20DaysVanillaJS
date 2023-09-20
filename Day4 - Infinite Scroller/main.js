const input = document.getElementById('filter');
const container = document.getElementById("posts-container");
const loader = document.querySelector(".loader");

let limit = 5;
let page = 1;


//fetch post from API
async function getPost() {
   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
   const data = await res.json()
   return data;
}

//show post in DOM
async function showPost(){
    const posts = await getPost();
    
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `<div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>`;

      container.appendChild(postEl);
    });

}

// showLoader and fetch more post
 function showLoader() {
    loader.classList.add('show');

    setTimeout(() => {
    loader.classList.remove("show");
    
    setTimeout(() => {
        page++;
        showPost();
    }, 300);    
    }, 1000);
 }


//show initial post
showPost()

window.addEventListener('scroll', function(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoader();
    }

})

input.addEventListener('input', function(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post=>{
          const title = post.querySelector('.post-title').innerText.toUpperCase();
          const body = post.querySelector(".post-body").innerText.toUpperCase();  
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = "none"; 
        }
    })
})
