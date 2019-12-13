import React from "react";
import Message from "./Message";
import NewMessage from "./NewMessage";
import firebase from "firebase/firebase-browser";

const ROOM_STYLE = {
    padding: "10px 30px"
};

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            messages: [],
        };
        this.db = firebase.database();
        this.handleMessagePost = this.handleMessagePost.bind(this);
    }

    componentDidMount() {
        const { roomId } = this.props.params;
        // コンポーネント初期化時にチャットルームの詳細情報を取得
        this.fetchRoom(roomId);
    }

    componentWillReceiveProps(nextProps) {
        const { roomId } = nextProps.params;
        if (roomId === this.props.params.roomId) {
            // チャットルームのIDに変更がなければ何もしない
            return;
        }
        if (this.stream) {
            // メッセージの監視を解除
            this.stream.off();
        }
        // stateの再初期化
        this.setState({ messages: [] });
        // チャットルーム詳細の再取得
        this.fetchRoom(roomId);
    }

    componentDidUpdate() {
        setTimeout(() => {
            // 画面下端へスクロール
            this.room.parentNode.scrollTop = this.room.parentNode.scrollHeight;
        }, 0);
    }

    componentWillUnmount() {
        if (this.stream) {
            // メッセージの監視を解除
            this.stream.off();
        }
    }

    // メッセージの投稿処理
    handleMessagePost(message) {
        const newItemRef = this.fbChatRoomRef.child("messages").push();
        // Firebaseにログインしているユーザーを投稿ユーザーとして利用
        this.user = this.user || firebase.auth().currentUser;
        return newItemRef.update({
            writtenBy: {
                uid: this.user.uid,
                displayName: this.user.displayName,
                photoURL: this.user.photoURL,
            },
            time: Date.now(),
            text: message,
        });
    }

    fetchRoom(roomId) {
        // Firebaseデータベースからチャットルーム詳細データの参照を取得
        this.fbChatRoomRef = this.db.ref("/chatrooms/" + roomId);
        this.fbChatRoomRef.once("value").then(snapshot => {
            const { description } = snapshot.val();
            this.setState({ description });
            window.document.title = description;
        });
        this.stream = this.fbChatRoomRef.child("messages").limitToLast(10);
        // チャットルームのメッセージ追加を監視
        this.stream.on("child_added", item => {
            const { messages } = this.state || [];
            // 追加されたメッセージをstateにセット
            messages.push(Object.assign({ key: item.key }, item.val()));
            this.setState({ messages });
        });
    }

    render() {
        const { messages } = this.state;
        return (
            <div style={ROOM_STYLE} ref={room => this.room = room}>
                <div className="list-group">
                    {messages.map(m => <Message key={m.key} message={m} /> )}
                </div>
                <NewMessage onMessagePost={this.handleMessagePost} />
            </div>
        );
    }
}
