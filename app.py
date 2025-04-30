from flask import Flask, render_template, request
import wikipedia

app = Flask(__name__)
wikipedia.set_lang("pt")

@app.route('/', methods=['GET', 'POST'])
def index():
    resultado = ""
    titulo = ""
    link = ""
    
    if request.method == 'POST':
        consulta = request.form['consulta']
        try:
            resultados = wikipedia.search(consulta)
            if resultados:
                pagina = wikipedia.page(resultados[0])
                titulo = pagina.title
                resultado = wikipedia.summary(resultados[0], sentences=3)
                link = pagina.url
            else:
                resultado = "Nenhum resultado encontrado."
        except wikipedia.exceptions.DisambiguationError as e:
            resultado = "Sua busca é ambígua. Seja mais específico."
        except Exception as err:
            resultado = "Erro ao buscar: " + str(err)
    
    return render_template('index.html', resultado=resultado, titulo=titulo, link=link)
