(function() {

    function loadHomepage() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/contents?type=Event');
        xhr.onreadystatechange = renderHomepage;
        xhr.send(null);
    }

    function renderHomepage(event) {
        const DONE = 4;
        const OK = 200;
        let xhr = event.currentTarget;
        let html = '';

        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                const evnts = window.JSON.parse(xhr.responseText).data;
                console.log(evnts);
                if(evnts.length === 0){
                    html = '<p><strong>there have not been any events added, <a href="/admin">go add some at /admin</a></strong></p>';
                } else {
                    html = evnts.map(function(evnt) {
                        return `
                            <article>
                                <h3>${evnt.title || 'unknown'} from ${evnt.start || 'unknown'} to ${evnt.finish || 'unknown'}</h3>
                                <p>location: ${evnt.location || 'unknown'}</p>
                                <h6>description:</h6>
                                <div>${evnt.description || 'none'}
                            </article>
                        `;
                    }).join();
                }
            } else {
                html = '<p><strong>the /api endpoint did not respond correctly :-(</strong></p>';
            }

            document.querySelector('#main').innerHTML = html;
        }
    }

    document.addEventListener("DOMContentLoaded", loadHomepage);
})();
