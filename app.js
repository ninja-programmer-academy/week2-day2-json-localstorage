const giphyKey = "J1noCVxuNpIkjrmWc9LZUCtzfUezIF8D";
const form = document.getElementById("nameform");

//helper function to retrieve gif
function gif(q) {

    //returns a promise
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    return new Promise(function(resolve, reject) {
        
        let urlVars = {
            "api_key": giphyKey,
            tag: q,
        }

        //loop keys and create a url query
        let query = Object.keys(urlVars)
            .map(key => `${key}=${urlVars[key]}`)
            .join('&');

        fetch("https://api.giphy.com/v1/gifs/random?"+query)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                resolve(result.data.image_original_url);
            });
    });
}

//set our submit function as async
//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
form.addEventListener("submit", async () => {
    event.preventDefault();

    const input = form.getElementsByTagName("input")[0];
    const helloDiv = document.getElementById("hello");
    //use await to keep code synchronous
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    const gifUrl = await gif(input.value);
    helloDiv.innerHTML = "<img src=\""+gifUrl+"\"/>"

    const nameAndGif = {
        name: input.value,
        gifUrl: gifUrl
    }
    
    //convert nameAndGif to JSON
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const jsonData = JSON.stringify(nameAndGif);

    //save item to localStorage
    //ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("saved_state",jsonData);

    //TODO: retrieve item from local storage and prefill everything
});