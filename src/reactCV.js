//npx babel --watch src --out-dir . --presets react-app/prod
class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            editMode: false,
            fontColor: "#000000",
            bgColor: "#ffffff",
            headerColor: "#eeeeee",
            name: "Ola Nordmann",
            tlf: "12345678",
            email: "email@hotmail.com",
            place: "Oslo",
            intro: "En intro for å presentere personen...",
            other: "Annen informasjon som kan være relevant...",
            experience: [
                { duration: "2020", title: "Jobb 3", text: "Info..."},
                { duration: "2016-2019", title: "Jobb 2", text: "Info..."}, 
                { duration: "2013-2016", title: "Jobb 1", text: "Info..."}],
            education: [
                { duration: "2010-2013", title: "Studie 1", text: "Info..."}, 
                { duration: "2009-2010", title: "Studie 2", text: "Info..."}],
        }; 
        
    }

    render() {
        this.props.body.style.backgroundColor = this.state.bgColor;
        return (
            <div style={{color:this.state.fontColor}}>
            <div className="main">
                <Siderbar editButton={() => this.setState({editMode: !this.state.editMode})} />
                {this.state.editMode ? <Style 
                    fontColor={this.state.fontColor} newFontColor={(c) => {this.setState({fontColor: c.target.value})}}
                    bgColor={this.state.bgColor} newBgColor={(c) => {this.setState({bgColor: c.target.value})}}
                    headerColor={this.state.headerColor} newHeaderColor={(c) => {this.setState({headerColor: c.target.value})}}
                /> : ""}
                <div className="info">
                    <h1 style={{backgroundColor: this.state.headerColor}}><span className="name">
                    <EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({name: text})} text={this.state.name}/>
                    </span></h1>               
                    <b>Mobil: </b>
                    <EditText editMode={this.state.editMode} type={"number"} update={(text) => this.setState({tlf: text})} text={this.state.tlf}/><br/>
                    <b>Email: </b>
                    <EditText editMode={this.state.editMode} type={"email"} update={(text) => this.setState({email: text})} text={this.state.email}/><br/>
                    <b>Bosted: </b>
                    <EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({place: text})} text={this.state.place}/><br/>
                </div>
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

class Style extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <span>
            Tekstfarge: <input type="color" onChange={this.props.newFontColor} value={this.props.fontColor} />
            Bakgrunnsfarge: <input type="color" onChange={this.props.newBgColor} value={this.props.bgColor} />
            Tittelfarge: <input type="color" onChange={this.props.newHeaderColor} value={this.props.headerColor} />
            </span>
        );  
    }
}

class Siderbar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (        
        <div className="sidebar">
            <button type="button" onClick={this.props.editButton}>Rediger</button>
        </div>);
    }
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
    <MainApp body={document.getElementById("body")}/>, document.getElementById("MainApp")
);