import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { doLogin } from "../../actions/account"; 
import LoginView from "../../views/account/login";

let mapStateToProps = (state) => { 
    return {
        account: state.account
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (phone, password) => dispatch(doLogin(phone, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);