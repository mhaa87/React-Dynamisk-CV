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
            cvName: "default",
            fontColor: "#000000", bgColor: "#ffffff", headerColor: "#f5f5f5", font: '"Times New Roman", Times, serif',
            name: "Ola Nordmann", tlf: "12345678", email: "email@hotmail.com", place: "Oslo",
            intro: "En intro for å presentere personen...",
            other: "Annen informasjon som kan være relevant...",
            experience: [{ duration: "2020", title: "Jobb 3", text: "Info..." }, { duration: "2016-2019", title: "Jobb 2", text: "Info..." }, { duration: "2013-2016", title: "Jobb 1", text: "Info..." }],
            education: [{ duration: "2010-2013", title: "Studie 1", text: "Info..." }, { duration: "2009-2010", title: "Studie 2", text: "Info..." }],
            savedData: JSON.parse(window.localStorage.getItem("cv-saved-data"))
        };
        Fonts.prototype.index = 2;
        return _this;
    }

    _createClass(MainApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.savedData == null) {
                this.state.savedData = {};
                this.SaveData(this.state.cvName);
            }

            var lastName = window.localStorage.getItem('cv-last-name');
            this.LoadData(lastName == null ? this.state.cvName : lastName);
        }
    }, {
        key: "SaveData",
        value: function SaveData(name) {
            if (name == null) return;
            if (name.length < 1) {
                alert("Navn må inneholde minst ett tegn");return;
            }
            this.state.cvName = name;
            window.localStorage.setItem('cv-last-name', name);
            newData = this.state.savedData;
            newData[name] = {
                fontColor: this.state.fontColor, bgColor: this.state.bgColor, headerColor: this.state.headerColor,
                name: this.state.name, tlf: this.state.tlf, email: this.state.email, place: this.state.place,
                intro: this.state.intro, other: this.state.other, font: this.state.font, fontIndex: Fonts.prototype.index,
                experience: this.state.experience, education: this.state.education
            };
            this.setState({ 'savedData': newData });
            window.localStorage.setItem('cv-saved-data', JSON.stringify(this.state.savedData));
        }
    }, {
        key: "LoadData",
        value: function LoadData(name) {
            if (this.state.savedData[name] == null) return;
            this.state.cvName = name;
            window.localStorage.setItem('cv-last-name', name);
            Fonts.prototype.index = this.state.savedData[name].fontIndex;
            this.setState({
                fontColor: this.state.savedData[name].fontColor, bgColor: this.state.savedData[name].bgColor,
                headerColor: this.state.savedData[name].headerColor, font: this.state.savedData[name].font,
                name: this.state.savedData[name].name, tlf: this.state.savedData[name].tlf,
                email: this.state.savedData[name].email, place: this.state.savedData[name].place,
                intro: this.state.savedData[name].intro, other: this.state.savedData[name].other,
                experience: this.state.savedData[name].experience, education: this.state.savedData[name].education
            });
        }
    }, {
        key: "DeleteData",
        value: function DeleteData(name) {
            newData = this.state.savedData;
            delete newData[name];
            this.setState({ 'savedData': newData });
            window.localStorage.setItem('cv-saved-data', JSON.stringify(this.state.savedData));
            window.localStorage.setItem('cv-last-name', null);
        }
    }, {
        key: "Style",
        value: function Style() {
            var _this2 = this;

            if (!this.state.editMode) return "";
            return React.createElement(_Style, {
                fontColor: this.state.fontColor, newFontColor: function newFontColor(c) {
                    _this2.setState({ fontColor: c.target.value });
                },
                bgColor: this.state.bgColor, newBgColor: function newBgColor(c) {
                    _this2.setState({ bgColor: c.target.value });
                },
                headerColor: this.state.headerColor, newHeaderColor: function newHeaderColor(c) {
                    _this2.setState({ headerColor: c.target.value });
                },
                font: this.state.font, newFont: function newFont(f) {
                    return _this2.setState({ font: f });
                }
            });
        }
    }, {
        key: "PersonInfo",
        value: function PersonInfo() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "info" },
                React.createElement(
                    "h1",
                    { style: { backgroundColor: this.state.headerColor } },
                    React.createElement(
                        "span",
                        { className: "name" },
                        React.createElement(EditText, { editMode: this.state.editMode, type: "text", update: function update(text) {
                                return _this3.setState({ name: text });
                            }, text: this.state.name })
                    )
                ),
                React.createElement(
                    "b",
                    null,
                    "Mobil: "
                ),
                React.createElement(EditText, { editMode: this.state.editMode, type: "number", update: function update(text) {
                        return _this3.setState({ tlf: text });
                    }, text: this.state.tlf }),
                React.createElement("br", null),
                React.createElement(
                    "b",
                    null,
                    "Email: "
                ),
                React.createElement(EditText, { editMode: this.state.editMode, type: "email", update: function update(text) {
                        return _this3.setState({ email: text });
                    }, text: this.state.email }),
                React.createElement("br", null),
                React.createElement(
                    "b",
                    null,
                    "Bosted: "
                ),
                React.createElement(EditText, { editMode: this.state.editMode, type: "text", update: function update(text) {
                        return _this3.setState({ place: text });
                    }, text: this.state.place }),
                React.createElement("br", null)
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            this.props.bodyColor(this.state.bgColor);
            return React.createElement(
                "div",
                { style: { color: this.state.fontColor, fontFamily: this.state.font } },
                React.createElement(
                    "div",
                    { className: "main" },
                    React.createElement(Siderbar, { savedData: this.state.savedData, edit: function edit() {
                            return _this4.setState({ editMode: !_this4.state.editMode });
                        },
                        save: function save() {
                            return _this4.SaveData(prompt("Navn: ", _this4.state.cvName));
                        }, load: function load(n) {
                            return _this4.LoadData(n);
                        }, "delete": function _delete(n) {
                            return _this4.DeleteData(n);
                        } }),
                    this.Style(),
                    this.PersonInfo(),
                    React.createElement(
                        "h2",
                        { style: { backgroundColor: this.state.headerColor } },
                        "Intro"
                    ),
                    React.createElement(EditArea, { editMode: this.state.editMode, type: "text", update: function update(text) {
                            return _this4.setState({ intro: text });
                        }, text: this.state.intro }),
                    React.createElement("br", null),
                    React.createElement(
                        "h2",
                        { style: { backgroundColor: this.state.headerColor } },
                        "Erfaring"
                    ),
                    React.createElement(List, { editMode: this.state.editMode, list: this.state.experience, update: function update(list) {
                            return _this4.setState({ experience: list });
                        } }),
                    React.createElement(
                        "h2",
                        { style: { backgroundColor: this.state.headerColor } },
                        "Utdanning"
                    ),
                    React.createElement(List, { editMode: this.state.editMode, list: this.state.education, update: function update(list) {
                            return _this4.setState({ education: list });
                        } }),
                    React.createElement(
                        "h2",
                        { style: { backgroundColor: this.state.headerColor } },
                        "Annet"
                    ),
                    React.createElement(EditArea, { editMode: this.state.editMode, type: "text", update: function update(text) {
                            return _this4.setState({ other: text });
                        }, text: this.state.other }),
                    React.createElement("br", null)
                )
            );
        }
    }]);

    return MainApp;
}(React.Component);

var Fonts = function (_React$Component2) {
    _inherits(Fonts, _React$Component2);

    function Fonts(props) {
        _classCallCheck(this, Fonts);

        var _this5 = _possibleConstructorReturn(this, (Fonts.__proto__ || Object.getPrototypeOf(Fonts)).call(this, props));

        _this5.state = { fonts: [{ font: "Georgia, serif", name: "Georgia" }, { font: '"Palatino Linotype", "Book Antiqua", Palatino, serif', name: "Palatino" }, { font: '"Times New Roman", Times, serif', name: "Times New Roman" }, { font: '"Arial", Helvetica, sans-serif', name: "Arial" }, { font: '"Arial Black", Gadget, sans-serif', name: "Arial Black" }, { font: '"Comic Sans MS", cursive, sans-serif', name: "Comic Sans MS" }, { font: '"Impact", Charcoal, sans-serif', name: "Impact" }, { font: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', name: "Lucida Sans" }, { font: '"Tahoma", Geneva, sans-serif', name: "Tahoma" }, { font: '"Trebuchet MS", Helvetica, sans-serif', name: "Trebuchet MS" }, { font: '"Verdana", Geneva, sans-serif', name: "Verdana" }, { font: '"Courier New", Courier, monospace', name: "Courier New" }, { font: '"Lucida Console", Monaco, monospace', name: "Lucida Console" }] };
        return _this5;
    }

    _createClass(Fonts, [{
        key: "setNewFont",
        value: function setNewFont(newFont, index) {
            Fonts.prototype.index = index;
            this.props.newFont(newFont);
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "select",
                { value: this.state.fonts[Fonts.prototype.index].font, onChange: function onChange(e) {
                        return _this6.setNewFont(e.target.value, e.nativeEvent.target.selectedIndex);
                    } },
                this.state.fonts.map(function (item, i) {
                    return React.createElement(
                        "option",
                        { key: i, value: item.font },
                        item.name
                    );
                })
            );
        }
    }]);

    return Fonts;
}(React.Component);

var Siderbar = function (_React$Component3) {
    _inherits(Siderbar, _React$Component3);

    function Siderbar(props) {
        _classCallCheck(this, Siderbar);

        var _this7 = _possibleConstructorReturn(this, (Siderbar.__proto__ || Object.getPrototypeOf(Siderbar)).call(this, props));

        _this7.state = { showLoadMenu: false };
        return _this7;
    }

    _createClass(Siderbar, [{
        key: "LoadMenu",
        value: function LoadMenu() {
            var _this8 = this;

            return React.createElement(
                "div",
                { className: "openMenu" },
                Object.keys(this.props.savedData).map(function (value, index) {
                    return React.createElement(
                        "span",
                        { style: { display: "block" }, key: index },
                        React.createElement(
                            "button",
                            { type: "button", onClick: function onClick() {
                                    return _this8.props.load(value);
                                } },
                            value
                        ),
                        React.createElement(
                            "span",
                            { className: "delete" },
                            React.createElement(
                                "button",
                                { type: "button", onClick: function onClick() {
                                        return _this8.props.delete(value);
                                    } },
                                "X"
                            )
                        )
                    );
                })
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            return React.createElement(
                "span",
                { className: "sidebar" },
                React.createElement(
                    "div",
                    { className: "sidebarButtons" },
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.props.edit },
                        "Rediger"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", onClick: this.props.save },
                        "Lagre"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", onClick: function onClick() {
                                return _this9.setState({ showLoadMenu: !_this9.state.showLoadMenu });
                            } },
                        "\xC5pne"
                    )
                ),
                this.state.showLoadMenu ? this.LoadMenu() : ""
            );
        }
    }]);

    return Siderbar;
}(React.Component);

function _Style(props) {
    return React.createElement(
        "span",
        null,
        React.createElement(
            "b",
            null,
            "Tekstfarge:"
        ),
        " ",
        React.createElement("input", { type: "color", onChange: props.newFontColor, value: props.fontColor }),
        React.createElement(
            "b",
            null,
            "Bakgrunnsfarge:"
        ),
        " ",
        React.createElement("input", { type: "color", onChange: props.newBgColor, value: props.bgColor }),
        React.createElement("br", null),
        React.createElement(
            "b",
            null,
            "Tittelfarge:"
        ),
        " ",
        React.createElement("input", { type: "color", onChange: props.newHeaderColor, value: props.headerColor }),
        React.createElement(
            "b",
            null,
            "Font:"
        ),
        React.createElement(Fonts, { newFont: props.newFont })
    );
}

function List(props) {
    return React.createElement(
        "span",
        null,
        props.editMode ? React.createElement(
            "span",
            null,
            React.createElement(
                "button",
                { onClick: function onClick() {
                        props.list.unshift({ duration: "2020", title: "Tittel", text: "Info..." });props.update(props.list);
                    } },
                "Legg til"
            ),
            React.createElement(
                "button",
                { onClick: function onClick() {
                        props.list.sort(sortListFunc);props.update(props.list);
                    } },
                "Sorter"
            )
        ) : "",
        React.createElement(
            "div",
            null,
            React.createElement(ListItems, { editMode: props.editMode, list: props.list,
                "delete": function _delete(i) {
                    props.list.splice(i, 1);props.update(props.list);
                } })
        ),
        " "
    );
}

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

function sortListFunc(a, b) {
    a_from = a.duration.substring(0, 4);
    a_to = a.duration.length > 8 ? a.duration.substring(5, 9) : a_from;
    b_from = b.duration.substring(0, 4);
    b_to = b.duration.length > 8 ? b.duration.substring(5, 9) : b_from;
    return a_to == b_to ? b_from - a_from : b_to - a_to;
}

ReactDOM.render(React.createElement(MainApp, { bodyColor: function bodyColor(c) {
        return document.getElementById("body").style.backgroundColor = c;
    } }), document.getElementById("MainApp"));