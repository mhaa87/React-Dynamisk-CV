var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//npx babel --watch src --out-dir . --presets react-app/prod
var MainApp = function (_React$Component) {
    _inherits(MainApp, _React$Component);

    function MainApp(props) {
        _classCallCheck(this, MainApp);

        var _this = _possibleConstructorReturn(this, (MainApp.__proto__ || Object.getPrototypeOf(MainApp)).call(this, props));

        _this.state = {
            editMode: false,
            name: "Ola Nordmann",
            tlf: "12345678",
            email: "email@hotmail.com",
            place: "Oslo",
            intro: "En intro for å presentere personen...",
            other: "Annen informasjon som kan være relevant...",
            experience: [{ duration: "2020", title: "Jobb 3", text: "Info..." }, { duration: "2016-2019", title: "Jobb 2", text: "Info..." }, { duration: "2013-2016", title: "Jobb 1", text: "Info..." }],
            education: [{ duration: "2007-2010", title: "Studie 1", text: "Info..." }, { duration: "2010-2013", title: "Studie 2", text: "Info..." }]
        };
        return _this;
    }

    _createClass(MainApp, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(Siderbar, { editButton: function editButton() {
                        return _this2.setState({ editMode: !_this2.state.editMode });
                    } }),
                React.createElement(
                    "div",
                    { className: "info" },
                    React.createElement(
                        "h1",
                        null,
                        React.createElement(EditText, { editMode: this.state.editMode, type: "text", update: function update(text) {
                                return _this2.setState({ name: text });
                            }, text: this.state.name })
                    ),
                    React.createElement(
                        "b",
                        null,
                        "Mobil: "
                    ),
                    React.createElement(EditText, { editMode: this.state.editMode, type: "number", update: function update(text) {
                            return _this2.setState({ tlf: text });
                        }, text: this.state.tlf }),
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Email: "
                    ),
                    React.createElement(EditText, { editMode: this.state.editMode, type: "email", update: function update(text) {
                            return _this2.setState({ email: text });
                        }, text: this.state.email }),
                    React.createElement("br", null),
                    React.createElement(
                        "b",
                        null,
                        "Bosted: "
                    ),
                    React.createElement(EditText, { editMode: this.state.editMode, type: "text", update: function update(text) {
                            return _this2.setState({ place: text });
                        }, text: this.state.place }),
                    React.createElement("br", null)
                ),
                React.createElement(
                    "h2",
                    null,
                    "Intro"
                ),
                React.createElement(EditArea, { editMode: this.state.editMode, type: "text", update: function update(text) {
                        return _this2.setState({ intro: text });
                    }, text: this.state.intro }),
                React.createElement("br", null),
                React.createElement(
                    "h2",
                    null,
                    "Erfaring"
                ),
                React.createElement(List, { editMode: this.state.editMode, list: this.state.experience, update: function update(list) {
                        return _this2.setState({ experience: list });
                    } }),
                React.createElement(
                    "h2",
                    null,
                    "Utdanning"
                ),
                React.createElement(List, { editMode: this.state.editMode, list: this.state.education, update: function update(list) {
                        return _this2.setState({ education: list });
                    } }),
                React.createElement(
                    "h2",
                    null,
                    "Annet"
                ),
                React.createElement(EditArea, { editMode: this.state.editMode, type: "text", update: function update(text) {
                        return _this2.setState({ other: text });
                    }, text: this.state.other }),
                React.createElement("br", null)
            );
        }
    }]);

    return MainApp;
}(React.Component);

var List = function (_React$Component2) {
    _inherits(List, _React$Component2);

    function List(props) {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));
    }

    _createClass(List, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            var list = this.props.list;
            return React.createElement(
                "span",
                null,
                this.props.editMode ? React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                list.push({ duration: "2020", title: "Tittel", text: "Info..." });
                                _this4.props.update(list);
                            } },
                        "Legg til"
                    ),
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                list.sort(sortListFunc);
                                _this4.props.update(list);
                            } },
                        "Sorter"
                    )
                ) : "",
                React.createElement(
                    "div",
                    null,
                    React.createElement(ListItems, { editMode: this.props.editMode, list: list, "delete": function _delete(i) {
                            list.splice(i, 1);_this4.props.update(list);
                        } })
                )
            );
        }
    }]);

    return List;
}(React.Component);

function ListItems(props) {
    return props.list.map(function (item, index) {
        return React.createElement(
            "span",
            { key: index },
            React.createElement(
                "span",
                { className: "year" },
                React.createElement(EditText, { editMode: props.editMode, type: "text", editText: function editText(text) {
                        return item.duration = text;
                    }, text: item.duration })
            ),
            React.createElement(
                "span",
                { className: "title" },
                React.createElement(EditText, { editMode: props.editMode, type: "text", editText: function editText(text) {
                        return item.title = text;
                    }, text: item.title })
            ),
            props.editMode ? React.createElement(
                "button",
                { onClick: function onClick() {
                        return props.delete(index);
                    } },
                "Slett"
            ) : "",
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(EditArea, { editMode: props.editMode, type: "text", editText: function editText(text) {
                    return item.text = text;
                }, text: item.text }),
            React.createElement("br", null),
            React.createElement("br", null)
        );
    });
}

function EditArea(props) {
    if (props.editMode) {
        return React.createElement("textarea", { rows: "4", cols: "65",
            type: props.type,
            onChange: function onChange(e) {
                props.update(e.target.value);
            },
            value: props.text });
    }
    return props.text;
}

function EditText(props) {
    if (props.editMode) {
        return React.createElement("input", {
            type: props.type,
            onChange: function onChange(e) {
                props.update(e.target.value);
            },
            value: props.text });
    }
    return props.text;
}

var Siderbar = function (_React$Component3) {
    _inherits(Siderbar, _React$Component3);

    function Siderbar(props) {
        _classCallCheck(this, Siderbar);

        return _possibleConstructorReturn(this, (Siderbar.__proto__ || Object.getPrototypeOf(Siderbar)).call(this, props));
    }

    _createClass(Siderbar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "sidebar" },
                React.createElement(
                    "button",
                    { type: "button", onClick: this.props.editButton },
                    "Rediger"
                )
            );
        }
    }]);

    return Siderbar;
}(React.Component);

function sortListFunc(a, b) {
    a_from = 0;a_to = 0;b_from = 0;b_to = 0;
    a_from = a.duration.substring(0, 4);
    a_to = a.duration.length > 8 ? a.duration.substring(5, 9) : a_from;
    b_from = b.duration.substring(0, 4);
    b_to = b.duration.length > 8 ? b.duration.substring(5, 9) : b_from;
    if (a_to == b_to) {
        return b_from - a_from;
    } else {
        return b_to - a_to;
    }
}

ReactDOM.render(React.createElement(MainApp, null), document.getElementById("MainApp"));