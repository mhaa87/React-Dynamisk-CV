//npx babel --watch src --out-dir . --presets react-app/prod
class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            editMode: false,
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
                { duration: "2007-2010", title: "Studie 1", text: "Info..."}, 
                { duration: "2010-2013", title: "Studie 2", text: "Info..."}],
        }; 
    }

    render() {
        return (
            <div>
                <Siderbar editButton={() => this.setState({editMode: !this.state.editMode})} />
                <div className="info">
                    <h1><EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({name: text})} text={this.state.name}/></h1>               
                    <b>Mobil: </b>
                    <EditText editMode={this.state.editMode} type={"number"} update={(text) => this.setState({tlf: text})} text={this.state.tlf}/><br/>
                    <b>Email: </b>
                    <EditText editMode={this.state.editMode} type={"email"} update={(text) => this.setState({email: text})} text={this.state.email}/><br/>
                    <b>Bosted: </b>
                    <EditText editMode={this.state.editMode} type={"text"} update={(text) => this.setState({place: text})} text={this.state.place}/><br/>
                </div>
                <h2>Intro</h2>
                    <EditArea editMode={this.state.editMode} type={"text"} update={(text) => this.setState({intro: text})} text={this.state.intro} />
                <br/>
                <h2>Erfaring</h2>
                    <List editMode={this.state.editMode} list={this.state.experience} update={(list) => this.setState({experience: list})}/>
                <h2>Utdanning</h2>
                    <List editMode={this.state.editMode} list={this.state.education} update={(list) => this.setState({education: list})}/>
                <h2>Annet</h2>
                    <EditArea editMode={this.state.editMode} type={"text"} update={(text) => this.setState({other: text})} text={this.state.other} />
                <br/>
            </div>
        );
    }
}

class List extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        var list = this.props.list;
        return (
            <span>
                {(this.props.editMode) ?
                <span> 
                    <button onClick={() => {
                        list.push({duration: "2020", title: "Tittel", text: "Info..."});
                        this.props.update(list);
                    }}>Legg til</button>
                    <button onClick={() => {
                        list.sort(sortListFunc);
                        this.props.update(list);
                        }}>Sorter</button>
                </span>
                    : ""}
                <div><ListItems editMode={this.props.editMode} list={list} delete={(i) => {list.splice(i, 1); this.props.update(list)}}/></div>
            </span>);
    }
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
        </span>))
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

function sortListFunc(a, b){
    a_from = 0; a_to = 0; b_from=0; b_to=0;
    a_from = a.duration.substring(0, 4);
    a_to = (a.duration.length > 8) ? a.duration.substring(5, 9) : a_from;
    b_from = b.duration.substring(0, 4);
    b_to = (b.duration.length > 8) ? b.duration.substring(5, 9) : b_from;
    if(a_to == b_to){
        return b_from - a_from;
    }else{
        return b_to - a_to;
    }
}

ReactDOM.render(
    <MainApp />, document.getElementById("MainApp")
);