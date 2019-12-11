import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
    margin: "0 auto",
    padding: 30
};

const CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            photoURL: "",
            errors: []
        };
        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnChangeName = this.handleOnChangeName.bind(this);
        this.handleOnChangePhotoURL = this.handleOnChangePhotoURL.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChangeEmail(e) {
            this.setState({ email: e.target.value });
    }

    handleOnChangePassword(e) {
            this.setState({ password: e.target.value });
    }

    handleOnChangeName(e) {
            this.setState({ name: e.target.value });
    }

    handleOnChangePhotoURL(e) {
            this.setState({ photoURL: e.target.value });
    }

  // サインアップ処理
    handleOnSubmit(e) {
        const { email, password, name, photoURL } = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();

        if(!email.length){
            isValid = false;
            errors.push("Email欄に入力してください！未入力はダメだよ！！");
        }

        if(!password.length){
            isValid = false;
            errors.push("Password欄に入力してください！未入力はダメだよ！！");
        }

        if(!name.length){
            isValid = false;
            errors.push("あなたの名前を教えて！教えてくれないのはダメだよ！");
        }

        if (!isValid) {
            // 入力チェックにひっかかった場合はエラー表示
            this.setState({ errors });
            return;
        }
        // Firebaseの新規アカウント作成処理
        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            // ユーザ情報を更新する
            return newUser.updateProfile({
                displayName: name,
                photoURL
            });
        }).then(() => {
            // チャットルーム一覧画面へ遷移する
            hashHistory.push("/rooms");
        }).catch(err => {
            // Firebaseでエラーが発生した場合、エラーメッセージを表示する
            this.setState({ errors: [err.message] });
        });
    }

    render() {
        return (
            <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />

                <div classname="form-group">
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleOnChangeEmail}
                    />
                </div>

                <div classname="form-group">
                    <label>パスワード</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleOnChangePassword}
                    />
                </div>

                <div classname="form-group">
                    <label>あなたの名前</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="user name"
                        value={this.state.name}
                        onChange={this.handleOnChangeName}
                    />
                </div>

                <div classname="form-group">
                    <label>画像のURL</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Photo URL"
                        value={this.state.photoURL}
                        onChange={this.handleOnChangePhotoURL}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-large btn-primary">EductChatをはじめる！！</button>
                    <Link to="/login">
                        <button
                            type="button"
                            style={CANCEL_BUTTON_STYLE}
                            className="btn btn-large btn-default"
                        >キャンセル</button>
                    </Link>
                </div>
            </form>
        );
    }
}
