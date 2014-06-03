/** @jsx React.DOM */

Cosmos.components.Tetris = React.createClass({
  /**
   * The Tetris game was originally designed and programmed by Alexey Pajitnov.
   * It was released on June 6, 1984 and has since become a world-wide
   * phenomenon. Read more about the game at http://en.wikipedia.org/wiki/Tetris
   */
  mixins: [Cosmos.mixins.PersistState],
  children: {
    well: function() {
      return {
        component: 'Well',
        onTetriminoLanding: this.onTetriminoLanding
      };
    }
  },
  start: function() {
    /**
     * Start or restart a Tetris session from scratch.
     */
    this.refs.well.reset();
    this.insertRandomTetriminoInWell();
    this.resume();
  },
  pause: function() {
    this.refs.well.stopAnimationLoop();
  },
  resume: function() {
    this.refs.well.startAnimationLoop();
  },
  render: function() {
    return (
      <div className="tetris">
        {this.loadChild('well')}
      </div>
    );
  },
  componentDidMount: function() {
    $(window).on('keydown', this.onKeyDown);
    $(window).on('keyup', this.onKeyUp);
  },
  componentWillUnmount: function() {
    $(window).off('keydown', this.onKeyDown);
    $(window).off('keyup', this.onKeyUp);
  },
  onKeyDown: function(e) {
    switch (e.keyCode) {
    case Tetris.KEYS.DOWN:
      this.refs.well.setState({dropAcceleration: true});
      break;
    case Tetris.KEYS.UP:
      this.refs.well.rotateTetrimino();
      break;
    case Tetris.KEYS.LEFT:
      this.refs.well.moveTetriminoToLeft();
      break;
    case Tetris.KEYS.RIGHT:
      this.refs.well.moveTetriminoToRight();
    }
  },
  onKeyUp: function(e) {
    if (e.keyCode == Tetris.KEYS.DOWN) {
      this.refs.well.setState({dropAcceleration: false});
    }
  },
  onTetriminoLanding: function(linesCleared) {
    this.insertRandomTetriminoInWell();
  },
  insertRandomTetriminoInWell: function() {
    this.refs.well.loadTetrimino(this.getRandomTetriminoType());
  },
  getRandomTetriminoType: function() {
    return _.sample(_.keys(Tetris.SHAPES));
  }
});
