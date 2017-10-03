class Model {
      constructor() {
            this.index = 0;
            this.cont = 0;
            this.men = 0;
            this.gamers = [
                  {
                        name: "Jim Hoskins",
                        score: 31,
                        id: 1
                  },
                  {
                        name: "Andree Hoskins",
                        score: 35,
                        id: 2
                  },
                  {
                        name: "Alena Hoskins",
                        score: 42,
                        id: 3
                  },
            ];
            this.inputValue = null;
            this.callback = null;
      }

      subscribe(render) {
            this.callback = render;
      }

      notify() {
            this.callback();
      }

      getScore() {
            return this.score[this.index];
      }
      addGamerAt(newGamer, index) {
            this.gamers.push({
                  name: newGamer,
                  score: 0,
                  id: this.cont + 1,
            });
            this.index++;
            this.notify();
      }
      updateTodo(index, player) {
            this.name[index] = player;
            this.notify();
      }

      increment(id) {
            this.gamers[id].score++;
            this.notify();
      }

      decrement(id) {
            this.gamers[id].score--;
            this.notify();
      }

      addPoint(id){
            let total = this.gamers.reduce((prev, cur) => prev + cur.score, 0);
            return total;
      }
}

const ScoreBoard = ({ title, model }) => {

      let playerList = model.gamers.map((option, index) => {
            return (<div className="player">
                  <div className="player-name col-md-10">{option.name}</div>
                  <div className="player-score counter">
                        <button className="counter-action decrement" onClick={() => model.decrement(index)}>-</button>
                        <div className="counter-score">{option.score}</div>
                        <button className="counter-action increment" onClick={() => model.increment(index)}>+</button>
                  </div>
            </div>

            )
      });
      return (
            <div className="scoreboard">
                  <header>
                        <div className="header">
                              <div className="col-md-10">
                                    <table className="stats"><tbody>
                                          <tr>
                                                <td>PLAYERS:</td>
                                                <td>{model.gamers.length}</td>
                                          </tr>
                                          <tr>
                                                <td>TOTAL POINTS:</td>
                                                <td>{model.addPoint()}</td>
                                          </tr>
                                    </tbody></table>
                              </div>
                              <div className="stopwatch">
                                    <h2>STOPWATH</h2>
                                    <div className="stopwatch-time">0</div>
                                    <button>start</button>
                                    <button>reset</button>
                              </div>
                        </div>
                  </header>
                  {playerList}
                  <div className="add-player-form">
                        <form
                              onSubmit={e => {
                                    e.preventDefault();
                                    model.addGamerAt(model.inputValue);
                              }}
                        >
                              <input type="text" placeholder="enter name" onChange={e => (model.inputValue = e.target.value)} />
                              <input type="submit" value="Add Player" />
                        </form>
                  </div>
            </div>
      );
}


let model = new Model();
let counter = 1;

let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <ScoreBoard title="TodoApp" model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);

render(); 