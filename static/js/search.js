(() => {
    // DOM Elements
    const queryInput = document.getElementById("query-input");
    const searchButton = document.getElementById("search-button");
    const languageSelector = document.getElementById("language-select");
    const searchCount = document.getElementById("search-count");
    const searchResults = document.getElementById("search-results");
    const searchResultItem = document.getElementById("search-result-item");
    const searchResultFailure = document.getElementById("search-result-failure");
    const searchMoreButton = document.getElementById("search-more-button");
    const postSearchContainer = document.getElementById("post-search-container");
    const loader = document.getElementById("loader");
    const root = document.getElementById("root");

    // Input params
    const inputParams = {
        q: '',
        lang: 'en'
    }

    // Axios params
    const params = {
        q: '',
        lang: 'en',
        sort_by: 'relevancy',
        page: '1',
        page_size: '10',
        media: 'True'
    }

    const init = () => {
        inputParams.q = queryInput.value;
        inputParams.lang = languageSelector.value;
    }

    // Setters
    const setQuery = (e) => {
        inputParams.q = e.target.value;
    }
    const setLanguage = (e) => {
        inputParams.lang = e.target.value
    }

    // Axios API call instance
    const instance = axios.create({
        baseURL: 'https://newscatcher.p.rapidapi.com/v1/search_free',
        timeout: 3000,
        headers: {
            'x-rapidapi-key': 'j1AUgtihjSmshA4MaHOUS9qE9Aoqp1W2K9CjsnHEMzVDdXDbEm',
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com'
        },

        method: 'GET',
    });

    const setParamsForAPI = () => {
        params.q = inputParams.q ? inputParams.q: params.q;
        params.lang = inputParams.lang ? inputParams.lang: params.lang;
    }

    // Fresh Searches
    const searchOnButtonClick = (e) => {
        setParamsForAPI();
        search();
    }

    const searchOnEnter = (e) => {
        if (e.key === 'Enter' || e.code === 'Enter') {
            setParamsForAPI();
            search()
        }
    }

    // Makes API call and sets to DOM
    const search = async (settings) => {
        // Clear previous search
        if(!(settings && settings.more)) searchResults.innerHTML = "";

        // Search more button
        postSearchContainer.innerHTML = "";
        
        if (!params.q) { console.log("No query"); return; }
        var options = {
            params: params
        };

        postSearchContainer.appendChild(loader.content.cloneNode(true))
        try {
            const response = await instance.request(options);
            postSearchContainer.innerHTML = "";
            renderSearchResults(response.data);
        } catch (error) {
            let _searchResultFailure = searchResultFailure.content.cloneNode(true);
            _searchResultFailure.querySelector(".search-failure").textContent = data.status ? data.status: "Search failed"; 
            postSearchContainer.appendChild(_searchResultFailure);
            return;
        }
    }

    const renderSearchResults = (data) => {
        console.log(data);

        // Fail check
        if(!data.articles || data.articles.length === 0) {
            let _searchResultFailure = searchResultFailure.content.cloneNode(true);
            _searchResultFailure.querySelector(".search-failure").textContent = data.status ? data.status: "No matches for your search"; 
            searchResults.appendChild(_searchResultFailure);
            return;
        }

        // Dress up dom with new search results
        let _searchResultItem;
        data.articles.forEach(article => {
            _searchResultItem = searchResultItem.content.cloneNode(true);
            _searchResultItem.querySelector(".title").textContent = article.title
            _searchResultItem.querySelector(".title").href = article.link
            _searchResultItem.querySelector(".url").textContent = article.link
            _searchResultItem.querySelector(".url").href = article.link
            _searchResultItem.querySelector(".summary").textContent = article.summary
            _searchResultItem.querySelector(".publishedDate").textContent = article.published_date
            if(article.media) {
                _searchResultItem.querySelector(".media").src = article.media
                _searchResultItem.querySelector(".media").classList.remove("hide")
            } else if (article.media_content){
                _searchResultItem.querySelector(".media").src = article.media_content
                _searchResultItem.querySelector(".media").classList.remove("hide")
            }
            

            searchResults.appendChild(_searchResultItem);
        });

        searchCount.innerHTML = `${data.total_hits} results`;
        
        if(data.page !== data.total_pages){
            let _searchMoreButton = searchMoreButton.content.cloneNode(true);
            _searchMoreButton.querySelector(".search-more-button").addEventListener("click", searchMore);
            postSearchContainer.appendChild(_searchMoreButton);
        }
        


        // Just a little vanity
        root.classList.remove("empty");
    }

    // Search more
    const searchMore = () => {
        postSearchContainer.innerHTML = "";
        params.page = parseInt(params.page) + 1;
        search({more: true});
    }

    // Event bindings
    // Param setters
    queryInput.addEventListener("input", setQuery);
    languageSelector.addEventListener("change", setLanguage);

    // Executes function
    searchButton.addEventListener("click", searchOnButtonClick);
    queryInput.addEventListener("keypress", searchOnEnter);

    init();

})(document, window)