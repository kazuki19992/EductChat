import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

const SIGNUP_LINK_STYLE = {
    display: "inline-block",
    marginLeft: 10
};


export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: [],
        };

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e){
        this.setState({email: e.target.value});
    }

    handleOnChangePassword(e){
        this.setState({password: e.target.value});
    }

    // ログイン処理
    handleOnSubmit(e){
        const {email, password} = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();

        if(!email.length){
            // emailが空(未入力)の場合
            isValid = false;
            errors.push("Email欄に入力してください！未入力はダメだよ！！");
        }
        
        if(!password.length){
            // passwordが空(未入力)の場合
            isValid = false;
            errors.push("Password欄に入力してください！未入力はダメだよ！！");
        }

        if(!isValid){
            // 入力チェックでひっかかったらエラーを表示
            this.setState({errors});
            return;
        }

        // Firebaseのログイン処理
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            // 次回ログイン簡略化のためにLocalStrageに値を保存するよ
            localStorage.userEmail = email;
            localStorage.userPassword = password;

            // チャットルーム一覧画面へ遷移
            hashHistory.push("/rooms");
        }).catch(() => {
            // Firebaseでログインエラーとなった場合
            this.setState({eroors: ["メールアドレスかパスワードが間違ってないかな？確認してね！"]});
        });
    }

    render(){
        return (
            <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                
                {/* メールアドレス入力 */}
                <div className="form-group">
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        onChange={this.handleOnChangeEmail}
                        value={this.state.email}
                    />
                </div>

                {/* パスワード入力 */}
                <div className="form-group">
                    <label>パスワード</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={this.handleOnChangePassword}
                        value={this.state.password}
                    />
                </div>

                {/* ログインボタン */}
                <div className="form-group">
                    <button className="btn btn-large btn-default"><i class="fas fa-door-open"></i> おかえりなさい！</button>
                    <div style={SIGNUP_LINK_STYLE}>
                        <Link to="/signup">新しくEductChatをはじめる！</Link>
                    </div>
                </div>
            </form>
        );
    }
}
