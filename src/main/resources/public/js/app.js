function SearchWord() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const data = new FormData(event.target);
        const word = data.get("word");
  
        const options = {
            method: 'GET',
        };
  
        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;
  
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {
                data = {
  
                    word: data[0].word,
                    phonetic: data[0].phonetic,
                    partOfSpeech: data[0].meanings[0].partOfSpeech,
                    meanings: data[0].meanings,
                    audio: data[0].phonetic[0].audio,
  
                  };
                
                const template = document.getElementById('results-template').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
  });;
  }
  
  function antonym(){
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const data = new FormData(event.target);
        const word = data.get("word");
  
        const options = {
            method: 'GET',
        };
  
        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;
  
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {
                data = {
  
                  word: data[0].word,
                  phonetic: data[0].phonetic,
                  partOfSpeech: data[0].meanings[0].partOfSpeech,
                  meanings: data[0].meanings,
                  audio: data[0].phonetic[0].audio,
        };
              
               const template = document.getElementById('antonyms-results').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
        });;
  
  }
  
  function synonyms(){
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const data = new FormData(event.target);
        const word = data.get("word");
  
        const options = {
            method: 'GET',
        };
  
        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;
  
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {
                data = {
  
                    word: data[0].word,
                    phonetic: data[0].phonetic,
                    partOfSpeech: data[0].meanings[0].partOfSpeech,
                    meanings: data[0].meanings,
                    audio: data[0].phonetic[0].audio
                
                
                };
              
                const template = document.getElementById('synonyms-results').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
  });;
    
  }
  
  // tag::router[]
  window.addEventListener('load', () => {
  const app = $('#app');
  
  const defaultTemplate = Handlebars.compile($('#default-template').html());
  const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
  const synonymsTemplate = Handlebars.compile($('#synonyms-template').html());
  const antonymsTemplate = Handlebars.compile($('#antonyms-template').html());
  
  const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
      const html = defaultTemplate();
      app.html(html);
    }
  });
  
  router.add('/dictionary', async () => {
    html = dictionaryTemplate();
    app.html(html);
    SearchWord();
  });
  
  
  router.add('/synonyms', async () => {
    html = synonymsTemplate();
    app.html(html);
    synonyms();
  });
  
  router.add('/antonyms', async () => {
    html = antonymsTemplate();
    app.html(html);
    antonym();
  });
  
  
  
  router.addUriListener();
  
  $('a').on('click', (event) => {
    event.preventDefault();
    const target = $(event.target);
    const href = target.attr('href');
    const path = href.substring(href.lastIndexOf('/'));
    router.navigateTo(path);
  });
  
  router.navigateTo('/');
  });
  // end::router[]