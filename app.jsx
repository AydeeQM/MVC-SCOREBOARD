class Model {
      constructor() {
            this.index = 0;
            this.name = ["Jim Hoskins", "Andree Hoskins", "Alena Hoskins"];
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
            this.name.push(newGamer);
            this.index++;
            this.notify();
      }
      updateTodo(index, player) {
            this.name[index] = player;
            this.notify();
      }
}

const ScoreBoard = ({ title, model }) => {
      let playerList = model.name.map((option, index) => {
            return (<div className="player">
                  <div className="player-name col-md-10">{option}</div>
                  <div className="player-score counter">
                        <div className="counter-action decrement">-</div>
                        <div className="counter-score">0</div>
                        <div className="counter-action increment">+</div>
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
                                                <td></td>
                                          </tr>
                                          <tr>
                                                <td>TOTAL POINTS:</td>
                                                <td></td>
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