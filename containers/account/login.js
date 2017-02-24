import { connect } from "react-redux";
import { doLogin } from "../../actions/account";
import { showLoadding, hideLoadding } from "../../actions";
import LoginView from "../../views/account/login";



let mapStateToProps = (state) => {
    return {
        loaading: state.loaading,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (phone, password) => dispatch(doLogin(phone, password)),
        showLoadding: () => dispatch(showLoadding()),
        hideLoadding: () => dispatch(hideLoadding)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);