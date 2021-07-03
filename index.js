   fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendData(data) {
        var mainContainer = document.getElementById('usersList');
        
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("h4");
            var li2 = document.createElement('p');
            var btn = document.createElement('button');


            li.innerHTML =  data[i].name;
            li2.innerHTML = data[i].email;
            btn.innerHTML = 'Get User’s Posts';

            li.classList.add('name');
            li2.classList.add('email');
            btn.classList.add('btn');


            btn.dataset.userId = data[i].id;
            btn.addEventListener('click', (event) => getPosts(event))

            mainContainer.appendChild(li);
            mainContainer.appendChild(li2);
            mainContainer.appendChild(btn);


        }

    }

    function cleanPosts() {
        var users = document.querySelectorAll('.item ul');
        for(var i = 0; i < users.length; i++) {
            if(users[i]) {
                users[i].style.display = 'none';
            }
        }
    }

    function getPosts(event) {

        var userId = event.target.dataset.userId;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(json => renderPosts(json, event.target))
    }

    function renderPosts(posts, target) {
        var postsList = target.childNodes[1];

        cleanPosts();

        if(postsList){
            postsList.style.display = 'block';
        } else {
            var list = document.createElement("ul");

            for (var i = 0; i < posts.length; i++) {

                var item = document.createElement("li");
                var liTitle = document.createElement("strong");
                var liBody = document.createElement("p");

                liTitle.innerHTML = posts[i].title;
                liBody.innerHTML = posts[i].body;

                item.appendChild(liTitle);
                item.appendChild(liBody);
                list.appendChild(item);
            }

            target.appendChild(list);
        }
    }

// const usersList = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await response.json();

//   const users = data.map((user) => {
//     return `<p>Name: ${user.name}
//             Email: ${user.email}</p>
//              <button class='button' >Get User’s Posts</button>

//       `;
//   });

//   document.querySelector('#usersList').insertAdjacentHTML('afterbegin', users);
// };

// usersList();

// const userPostList = async (userid) => {

//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?userId=${userid}`
//   );
//   const data = await response.json();
//   const myPosts = document
//     .querySelector('#usersList')
//     .insertAdjacentHTML('afterbegin', data);
//   return myPosts;

// };
// const button = document.querySelector('button');

// button.addEventListener('click', (event) => {
//   button.textContent = console.log(event.detail);;
// });
