import React from "react";

export class Section extends React.Component {
  render() {
    const decorators = this.props.decorators;
    const content = this.props.content;
    const spans = buildSpans(decorators, content).map((span, index) => {
      return <span key={index} className={span.className}>{span.content}</span>;
    });
    return (<p>{spans}</p>);
  }
}

Section.propTypes = {
  decorators: React.PropTypes.array.isRequired,
  content: React.PropTypes.string.isRequired
};

function buildSpans(decorators, content) {
  const result = [];
  let currentSpan;
  for (let index = 0; index < content.length; index++) {
    if (!currentSpan || isDecoratorChange(decorators, index)) {
      currentSpan = changeSpan(decorators, index);
      result.push(currentSpan);
    }
    currentSpan.content += content.substring(index, index + 1);
  }
  if (!currentSpan) {
    result.push({
      className: "",
      decoratorIds: "",
      content: "\x01"
    });
  }

  return result;
}

function isDecoratorChange(decorators, offset) {
  let result = false;
  decorators.some(decorator => {
    if ((offset === decorator.start) || (offset === decorator.end)) {
      result = true;
      return true;
    }
    return false;
  });
  return result;
}
function buildDecoratorClass(decorators, offset) {
  const result = [];
  decorators.forEach(decorator => {
    if ((offset >= decorator.start) && (offset < decorator.end)) {
      result.push(decorator.type);
    }
  });
  return result;
}
function buildDecoratorIdList(decorators, offset) {
  const result = [];
  decorators.forEach(decorator => {
    if ((offset >= decorator.start) && (offset < decorator.end)) {
      result.push(decorator.id);
    }
  });
  return result;
}
function changeSpan(decorators, offset) {
  return {
    className: buildDecoratorClass(decorators, offset).join(" "),
    decoratorIds: buildDecoratorIdList(decorators, offset).join(","),
    content: ''
  };
}
