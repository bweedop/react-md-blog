import React from "react";
import parse from "html-react-parser";
import showdown from "showdown";

const Promise = require("bluebird");

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPath: this.props.postPath,
      author: "",
      date: "",
      post: ""
    };
  }

  componentDidMount() {
    const fs = Promise.promisifyAll(require("fs"));
    const converter = new showdown.Converter({ metadata: true });

    console.log(this.props.postPath);

    fs.readFileAsync(this.state.postPath, "utf8").then((data) => {
      const html = converter.makeHtml(data);
      const metadata = converter.getMetadata();
      this.setState((state) => ({
        author: state.author + metadata.author,
        date: state.date + metadata.date,
        post: state.post + html
      }));
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.author}</p>
        <p>{this.state.date}</p>
        {parse(this.state.post)}
      </div>
    );
  }
}
