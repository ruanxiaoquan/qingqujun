import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import TodoList from "../views/todoList";

let mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        todoClick: id => dispatch(toggleTodo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
