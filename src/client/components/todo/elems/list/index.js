import Component, { PropTypes } from 'lib/component';
import TodoItem from '../item';
import TodoListModel from './model';
import styles from './styles.css';

export default class TodoList extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = { todoItems: {} };
  }

  /**
   * @override
   */
  componentDidMount() {
    this._model.load();
  }

  /**
   * @override
   */
  componentDidUpdate() {
    this._model.save();
  }

  /**
   * @override
   */
  render() {
    let items = this.state.todoItems;
    let state = this.props.query.state;
    let todoItems = Object.keys(items).map(id => {
      let item = items[id];
      let isCompleted = item.isCompleted;
      let isVisible = !state ||
        state === 'active' && !isCompleted ||
        state === 'completed' && isCompleted;

      return (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          isCompleted={isCompleted}
          isVisible={isVisible}
        />
      );
    });

    return (
      <ul className={this._styles.todoList}>
        {todoItems}
      </ul>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
TodoList.propTypes = {
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
TodoList.defaultProps = {
  styles,
  model: TodoListModel,
  title: 'todos'
};
