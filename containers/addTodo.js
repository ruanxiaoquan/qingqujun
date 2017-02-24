import { connect } from "react-redux";
import { addTodo } from "../actions";
import AddTodo from "../views/addTodo";

let mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addTodo: text => dispatch(addTodo(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
