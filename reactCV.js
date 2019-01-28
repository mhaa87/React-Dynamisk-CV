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

        _this.state = { editMode: false, savedData: [], content: {} };
        _this.state.content = {
            info: { name: "Ola Nordmann", tlf: "12345678",
                email: "email@hotmail.com", place: "Oslo" },
            intro: "En intro for å presentere personen...",
            other: "Annen informasjon som kan være relevant...",
            experience: [{ duration: "2020", title: "Jobb 3", text: "Info..." }, { duration: "2016-2019", title: "Jobb 2", text: "Info..." }, { duration: "2013-2016", title: "Jobb 1", text: "Info..." }],
            education: [{ duration: "2007-2010", title: "Studie 1", text: "Info..." }, { duration: "2010-2013", title: "Studie 2", text: "Info..." }]
        };
        return _this;
    }

    _createClass(MainApp, [{
        key: "experienceList",
        value: function experienceList(listName, expList) {
            var _this2 = this;

            var addFunc = function addFunc() {
                return expList.push({ duration: "2020", title: "Tittel", text: "Info..." });
            };
            var delFunc = function delFunc(index) {
                return expList.splice(index, 1);
            };
            var sortFunc = function sortFunc() {
                return expList.sort(sortListFunc);
            };
            var update = function update() {
                return _this2.setState(_this2.state.content[listName] = expList);
            };

            var listItems = expList.map(function (item, index) {
                return React.createElement(
                    "span",
                    { key: index },
                    React.createElement(
                        "span",
                        { className: "year" },
                        _this2.editableText(false, "text", function (text) {
                            return item.duration = text;
                        }, item.duration)
                    ),
                    React.createElement(
                        "span",
                        { className: "title" },
                        _this2.editableText(false, "text", function (text) {
                            return item.title = text;
                        }, item.title)
                    ),
                    _this2.state.editMode ? React.createElement(
                        "button",
                        { onClick: function onClick() {
                                delFunc(index);update();
                            } },
                        "Slett"
                    ) : "",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    _this2.editableText(true, "text", function (text) {
                        return item.text = text;
                    }, item.text),
                    React.createElement("br", null),
                    React.createElement("br", null)
                );
            });

            return React.createElement(
                "span",
                null,
                this.state.editMode ? React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                addFunc();update();
                            } },
                        "Legg til"
                    ),
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                sortFunc();update();
                            } },
                        "Sorter"
                    )
                ) : "",
                React.createElement(
                    "div",
                    null,
                    listItems
                )
            );
        }
    }, {
        key: "personInfo",
        value: function personInfo() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "info" },
                React.createElement(
                    "h1",
                    null,
                    this.editableText(false, "text", function (text) {
                        return _this3.state.content.info.name = text;
                    }, this.state.content.info.name)
                ),
                React.createElement(
                    "b",
                    null,
                    "Mobil: "
                ),
                this.editableText(false, "number", function (text) {
                    return _this3.state.content.info.tlf = text;
                }, this.state.content.info.tlf),
                React.createElement("br", null),
                React.createElement(
                    "b",
                    null,
                    "Email: "
                ),
                this.editableText(false, "email", function (text) {
                    return _this3.state.content.info.email = text;
                }, this.state.content.info.email),
                React.createElement("br", null),
                React.createElement(
                    "b",
                    null,
                    "Bosted: "
                ),
                this.editableText(false, "text", function (text) {
                    return _this3.state.content.info.place = text;
                }, this.state.content.info.place),
                React.createElement("br", null)
            );
        }
    }, {
        key: "editableText",
        value: function editableText(textarea, type, editText, text) {
            if (this.state.editMode) {
                if (textarea) {
                    return React.createElement("textarea", { rows: "4", cols: "65",
                        type: type,
                        onChange: function onChange(e) {
                            editText(e.target.value);
                        },
                        value: text });
                }
                return React.createElement("input", {
                    type: type,
                    onChange: function onChange(e) {
                        editText(e.target.value);
                    },
                    value: text });
            }
            return text;
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(Siderbar, {
                    editButton: function editButton() {
                        return _this4.setState({ editMode: !_this4.state.editMode });
                    } }),
                this.personInfo(),
                React.createElement(
                    "h2",
                    null,
                    "Intro"
                ),
                this.editableText(true, "text", function (text) {
                    return _this4.state.content.intro = text;
                }, this.state.content.intro),
                React.createElement("br", null),
                React.createElement(
                    "h2",
                    null,
                    "Erfaring"
                ),
                this.experienceList("experience", this.state.content.experience),
                React.createElement(
                    "h2",
                    null,
                    "Utdanning"
                ),
                this.experienceList("education", this.state.content.education),
                React.createElement(
                    "h2",
                    null,
                    "Annet"
                ),
                this.editableText(true, "text", function (text) {
                    return _this4.state.content.other = text;
                }, this.state.content.other),
                React.createElement("br", null)
            );
        }
    }]);

    return MainApp;
}(React.Component);

var Siderbar = function (_React$Component2) {
    _inherits(Siderbar, _React$Component2);

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