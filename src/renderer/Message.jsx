import React from "react";
import Avatar from "./Avatar";

const MEDIA_BODY_STYLE = {
    color: "#888",
    fontSize: ".9em"
};

const TIME_STYLE = {
    marginLeft: 5
};

const TEXT_STYLE = {
    whiteSpace: "normal",
    wordBreak: "break-word"
};

export default function Message(props) {
    const { text, time, writtenBy } = props.message;
    const localeString = new Date(time).toLocaleString();
    return (
        <div className="list-group-item">
            <div className="media-object pull-left">
                <Avatar user={writtenBy} />
            </div>
            <div className="media-body">
                <div style={MEDIA_BODY_STYLE}>
                    <span>{writtenBy.displayName}</span>
                    <span style={TIME_STYLE}>{localeString}</span>
                </div>
                <p style={TEXT_STYLE}>{text}</p>
            </div>
        </div>
    );
}
