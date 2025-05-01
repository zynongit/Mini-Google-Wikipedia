document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let consulta = document.getElementById('consulta').value;

    if (consulta) {
fetch(`https://cors-anywhere.herokuapp.com/https://pt.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${consulta}&utf8=1`)
            .then(response => response.json())
            .then(data => {
                let resultados = data.query.search;
                let resultHTML = '';

                if (resultados.length > 0) {
                    resultados.forEach(result => {
                        let titulo = result.title;
                        let resumo = result.snippet;
                        let link = `https://pt.wikipedia.org/?curid=${result.pageid}`;
                        resultHTML += `
                            <div class="result-item">
                                <h3>${titulo}</h3>
                                <p>${resumo}...</p>
                                <a href="${link}" target="_blank">Ler mais</a>
                            </div>
                        `;
                    });
                } else {
                    resultHTML = '<p>Nenhum resultado encontrado.</p>';
                }

                document.getElementById('result').innerHTML = resultHTML;
            })
            .catch(err => {
                console.error('Erro ao buscar:', err);
                document.getElementById('result').innerHTML = '<p>Erro ao buscar resultados. Tente novamente.</p>';
            });
    }
});
