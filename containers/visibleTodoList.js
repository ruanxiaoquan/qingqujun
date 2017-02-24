import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import TodoList from "../components/todoList";

const getVisibleToads = (todos, filter) => {
    switch (filter) {
        case "SHOW_ALL":
            return todos;
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed);
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
    }
}


const mapStateToProps = (state) => {
    return {
        todos: getVisibleToads(state.todos, state.visiblityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

export default VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);