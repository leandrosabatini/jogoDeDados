function generateDadoNumber() {
    var number;

    do {
        number = (Math.random() * 10).toFixed();
    } while (number > 6 || number < 1);

    return parseInt(number);
}

class Tabuleiro extends React.Component{
    constructor (props){
        super (props);

        this.state = {
            dado1: {
                value: ''
            },
            dado2: {
                value: ''
            },
            valorSomaInserido: '',
            historico: [],
            qtdAcertos: 0,
            qtdErros: 0,
        };
    }

    lancarDados() {
        var valueDado1 = generateDadoNumber();
        var valueDado2 = generateDadoNumber();
        this.setState({
            dado1: {
                value: valueDado1
            },
            dado2: {
                value: valueDado2
            }
        })

        var historico = this.state.historico;

        historico.push({
            dado1: valueDado1,
            dado2: valueDado2,
            somaInformada: this.state.valorSomaInserido,
            acertou: valueDado1 + valueDado2 == this.state.valorSomaInserido
        });

        if (valueDado1 + valueDado2 == this.state.valorSomaInserido) {
            this.setState({
                qtdAcertos: this.state.qtdAcertos + 1
            })
        } else {
            this.setState({
                qtdErros: this.state.qtdErros + 1
            })
        }
    }

    render (){
        return (
            <div>
                <div className="dado-container">
                    <label>Dado 1:</label><br />
                    <div className="dado">
                        {this.state.dado1.value}
                    </div>
                </div>

                <div className="dado-container">
                    <label>Dado 2:</label><br />
                    <div className="dado">
                        {this.state.dado2.value}
                    </div>
                </div>

                <div className="dado-container">
                    <label>Resultado da soma:</label><br />
                    <input type="number" min="1" max="6" onChange={(event) => {this.setState({valorSomaInserido: event.target.value})}} />
                </div>

                <br /><br />
  
                <button onClick={() => {this.lancarDados()}}>Lançar dados</button>

                <div className="listaJogadas">
                    <br />
                    <table className="listaAcertos">
                        <tr>
                            <th>Acertos</th>
                            <th>Erros</th>
                        </tr>
                        <tr>
                            <td>{this.state.qtdAcertos}</td>
                            <td>{this.state.qtdErros}</td>
                        </tr>
                    </table> 
                    <br />
                    <br />
                    Histórico de jogadas: 
                    <br />
                    <br />
                    <table>
                        <tr>
                            <th>Dado 1</th>
                            <th>Dado 2</th>
                            <th>Soma informada</th>
                            <th>Acertou</th>
                        </tr>
                        {this.state.historico.map((jogada, i) => {
                            return (
                                <tr>
                                    <td>{jogada.dado1}</td>
                                    <td>{jogada.dado2}</td>
                                    <td>{jogada.somaInformada}</td>
                                    <td>{jogada.acertou ? 'sim' : 'não'}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        );
    }
}

class Jogo extends React.Component {
    render () {
        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Jogo />,
    document.getElementById("root")
);
