//npx babel --watch src --out-dir . --presets react-app/prod
class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            editMode: false,
            cvName: "default",
            fontColor: "#000000", bgColor: "#ffffff", headerColor: "#f5f5f5", font: '"Times New Roman", Times, serif',
            name: "Ola Nordmann", tlf: "12345678", email: "email@hotmail.com", place: "Oslo",
            intro: "En intro for å presentere personen...",
            other: "Annen informasjon som kan være relevant...",
            experience: [
                { duration: "2020", title: "Jobb 3", text: "Info..."},
                { duration: "2016-2019", title: "Jobb 2", text: "Info..."}, 
                { duration: "2013-2016", title: "Jobb 1", text: "Info..."}],
            education: [
                { duration: "2010-2013", title: "Studie 1", text: "Info..."}, 
                { duration: "2009-2010", title: "Studie 2", text: "Info..."}],
            savedData: JSON.parse(window.localStorage.getItem("cv-saved-data"))
        };
        Fonts.prototype.index = 2;
    }

    componentDidMount(){
        if(this.state.savedData == null) {
            this.state.savedData = {};
            this.SaveData(this.state.cvName);
        }

        var lastName = window.localStorage.getItem('cv-last-name');
        this.LoadData(lastName == null ? this.state.cvName : lastName);
    }

    SaveData(name){
        if(name == null) return;
        if(name.length < 1){ (alert("Navn må inneholde minst ett tegn")); return;}
        this.state.cvName = name;
        window.localStorage.setItem('cv-last-name', name);
        newData = this.state.savedData;
        newData[name] = {
            fontColor: this.state.fontColor, bgColor: this.state.bgColor, headerColor: this.state.headerColor,
            name: this.state.name, tlf: this.state.tlf, email: this.state.email, place: this.state.place,
            intro: this.state.intro, other: this.state.other, font: this.state.font, fontIndex: Fonts.prototype.index,
            experience: this.state.experience, education: this.state.education,
        }
        this.setState({'savedData': newData});
        window.localStorage.setItem('cv-saved-data', JSON.stringify(this.state.savedData));
    }

    LoadData(name){
        if(this.state.savedData[name] == null) return;
        this.state.cvName = name;
        window.localStorage.setItem('cv-last-name', name);
        Fonts.prototype.index = this.state.savedData[name].fontIndex;
        this.setState({
            fontColor: this.state.savedData[name].fontColor, bgColor: this.state.savedData[name].bgColor,
            headerColor:this.state.savedData[name].headerColor, font: this.state.savedData[name].font, 
            name: this.state.savedData[name].name, tlf: this.state.savedData[name].tlf,
            email: this.state.savedData[name].email, place: this.state.savedData[name].place,
            intro: this.state.savedData[name].intro, other: this.state.savedData[name].other,
            experience: this.state.savedData[name].experience, education: this.state.savedData[name].education,
        });
    }

    DeleteData(name){
        newData = this.state.savedData;
        delete newData[name];
        this.setState({'savedData': newData});
        window.localStorage.setItem('cv-saved-data', JSON.stringify(this.state.savedData));
        window.localStorage.setItem('cv-last-name', null)
    }

    Style(){
        if(!this.state.editMode) return "";
        return (
        <Style 
            fontColor={this.state.fontColor} newFontColor={(c) => {this.setState({fontColor: c.target.value})}}
            bgColor={this.state.bgColor} newBgColor={(c) => {this.setState({bgColor: c.target.value})}}
            headerColor={this.state.headerColor} newHeaderColor={(c) => {this.setState({headerColor: c.target.value})}}
            font={this.state.font} newFont={(f) => this.setState({font: f})}
        />)
    }

    PersonInfo(){
        return( <div className="info">
            <h1 style={{backgroundColor: this.state.headerColor}}><span className="name">
            <EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({name: text})} text={this.state.name}/></span></h1>            
            <b>Mobil: </b>
            <EditText editMode={this.state.editMode} type={"number"} update={(text) => this.setState({tlf: text})} text={this.state.tlf}/><br/>
            <b>Email: </b>
            <EditText editMode={this.state.editMode} type={"email"} update={(text) => this.setState({email: text})} text={this.state.email}/><br/>
            <b>Bosted: </b>
            <EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({place: text})} text={this.state.place}/><br/>
        </div>);
    }

    render() {
        this.props.bodyColor(this.state.bgColor);
        return (
            <div style={{color:this.state.fontColor, fontFamily: this.state.font}}>
            <div className="main">
                <Siderbar savedData = {this.state.savedData} edit={() => this.setState({editMode: !this.state.editMode})}
                    save={() => this.SaveData(prompt("Navn: ", this.state.cvName))} load={(n) => this.LoadData(n)} delete={(n) => this.DeleteData(n)}/>
                {this.Style()}
                {this.PersonInfo()}
                <h2 style={{backgroundColor: this.state.headerColor}}>Intro</h2>
                    <EditArea editMode={this.state.editMode} type={"text"} update={(text) => this.setState({intro: text})} text={this.state.intro} />
                <br/>
                <h2 style={{backgroundColor: this.state.headerColor}}>Erfaring</h2>
                    <List editMode={this.state.editMode} list={this.state.experience} update={(list) => this.setState({experience: list})}/>
                <h2 style={{backgroundColor: this.state.headerColor}}>Utdanning</h2>
                    <List editMode={this.state.editMode} list={this.state.education} update={(list) => this.setState({education: list})}/>
                <h2 style={{backgroundColor: this.state.headerColor}}>Annet</h2>
                    <EditArea editMode={this.state.editMode} type={"text"} update={(text) => this.setState({other: text})} text={this.state.other} />
                <br/>
            </div></div>
        );
    }
}

class Fonts extends React.Component{
    constructor(props){
        super(props)
        this.state ={ fonts: [
            {font: "Georgia, serif", name: "Georgia"},{font: '"Palatino Linotype", "Book Antiqua", Palatino, serif', name: "Palatino"},
            {font: '"Times New Roman", Times, serif', name: "Times New Roman"},{font: '"Arial", Helvetica, sans-serif', name: "Arial"},
            {font: '"Arial Black", Gadget, sans-serif', name: "Arial Black"},{font: '"Comic Sans MS", cursive, sans-serif', name: "Comic Sans MS"},
            {font: '"Impact", Charcoal, sans-serif', name: "Impact"},{font: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', name: "Lucida Sans"},
            {font: '"Tahoma", Geneva, sans-serif', name: "Tahoma"},{font: '"Trebuchet MS", Helvetica, sans-serif', name: "Trebuchet MS"},
            {font: '"Verdana", Geneva, sans-serif', name: "Verdana"},{font: '"Courier New", Courier, monospace', name: "Courier New"},
            {font: '"Lucida Console", Monaco, monospace', name: "Lucida Console"},
        ],};
    }

    setNewFont(newFont, index){
        Fonts.prototype.index = index;
        this.props.newFont(newFont)
    }

    render(){
        return(
            <select value={this.state.fonts[Fonts.prototype.index].font} onChange={(e) => this.setNewFont(e.target.value, e.nativeEvent.target.selectedIndex)}>{
                this.state.fonts.map((item, i) => <option key={i} value={item.font}>{item.name}</option>)
            }</select>
        );
    }

}

class Siderbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {showLoadMenu: false};
    }

    LoadMenu(){
        return(<div className="openMenu">{            
            Object.keys(this.props.savedData).map((value, index) => 
                (<span style={{display: "block"}} key={index}>
                    <button type="button" onClick={() => this.props.load(value)}>{value}</button>
                    <span className="delete"><button type="button" onClick={() => this.props.delete(value)}>X</button></span>
                </span>)
            )}
        </div>);
    }

    render(){
        return (<span className="sidebar"><div className="sidebarButtons" >
                <button type="button" onClick={this.props.edit}>Rediger</button>
                <button type="button" onClick={this.props.save}>Lagre</button>
                <button type="button" onClick={() => this.setState({showLoadMenu: !this.state.showLoadMenu})}>Åpne</button>
            </div>
                {this.state.showLoadMenu ? this.LoadMenu() : ""}
            </span>);
    }
}

function Style(props){
    return (<span>
        <b>Tekstfarge:</b> <input type="color" onChange={props.newFontColor} value={props.fontColor} />
        <b>Bakgrunnsfarge:</b> <input type="color" onChange={props.newBgColor} value={props.bgColor} /><br/>
        <b>Tittelfarge:</b> <input type="color" onChange={props.newHeaderColor} value={props.headerColor} />
        <b>Font:</b><Fonts newFont={props.newFont}/>
    </span>);  
}

function List(props){
    return (<span>
        {(props.editMode) ?
        <span> 
            <button onClick={() => {props.list.unshift({duration: "2020", title: "Tittel", text: "Info..."}); props.update(props.list);}
            }>Legg til</button>
            <button onClick={() => {props.list.sort(sortListFunc); props.update(props.list);}
            }>Sorter</button>
        </span> : ""}
        <div><ListItems editMode={props.editMode} list={props.list} 
        delete={(i) => {props.list.splice(i, 1); props.update(props.list)}}/></div> </span>);
}

function ListItems(props){
    return (props.list.map((item, index) => 
        <span key={index}>
            <span className='year'>
            <EditText editMode={props.editMode} type={"text"} editText={(text) => item.duration = text} text={item.duration} />
            </span>
            <span className='title'>
            <EditText editMode={props.editMode} type={"text"} editText={(text) => item.title = text} text={item.title} />
            </span>
            {(props.editMode) ? 
                <button onClick={() => props.delete(index)}>Slett</button> : ""}
            <br/><br/>
            <EditArea editMode={props.editMode} type={"text"} editText={(text) => item.text = text} text={item.text} />
            <br/><br/>
        </span>));
}

function EditArea(props){
    if(props.editMode) { 
        return(
        <textarea rows="4" cols="65"
            type={props.type} 
            onChange={(e) => {props.update(e.target.value)}} 
            value={props.text}> 
        </textarea>);
    }
    return props.text;
}

function EditText(props) {
    if(props.editMode){     
        return(
            <input
                type={props.type} 
                onChange={(e) => {props.update(e.target.value)}} 
                value={props.text}>
            </input>);
    }
    return props.text;
}

function sortListFunc(a, b){
    a_from = a.duration.substring(0, 4);
    a_to = (a.duration.length > 8) ? a.duration.substring(5, 9) : a_from;
    b_from = b.duration.substring(0, 4);
    b_to = (b.duration.length > 8) ? b.duration.substring(5, 9) : b_from;
    return (a_to == b_to) ?  b_from - a_from : b_to - a_to
}

ReactDOM.render(
    <MainApp bodyColor={(c) => document.getElementById("body").style.backgroundColor = c}/>, 
        document.getElementById("MainApp")
);