//npx babel --watch src --out-dir . --presets react-app/prod
class MainApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { editMode: false, savedData: [], content: {} };       
        this.state.content = {
            info: { name: "Ola Nordmann", tlf: "12345678",
                    email: "email@hotmail.com", place: "Oslo" },
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



    experienceList(listName, expList){
        const addFunc = () => expList.push({duration: "2020", title: "Tittel", text: "Info..."});
        const delFunc = (index) => expList.splice(index, 1);
        const sortFunc = () => expList.sort(sortListFunc);
        const update = () => this.setState(this.state.content[listName] = expList);

        const listItems = expList.map((item, index) => 
            <span key={index}>
                <span className='year'>
                {this.editableText(false, "text", (text) => item.duration = text, item.duration)}
                </span>
                <span className='title'>
                {this.editableText(false, "text", (text) => item.title = text, item.title)}
                </span>
                {(this.state.editMode) ? 
                    <button onClick={() => {delFunc(index); update();}}>Slett</button> : ""}
                <br/><br/>
                {this.editableText(true, "text", (text) => item.text = text, item.text)}
                <br/><br/>
            </span>);

        return (
            <span>
                {(this.state.editMode) ?
                <span> 
                    <button onClick={() => {addFunc(); update();}}>Legg til</button>
                    <button onClick={() => {sortFunc(); update();}}>Sorter</button>
                </span>
                    : ""}
                <div>{listItems}</div>
            </span>);
    }

    personInfo(){
        return(
            <div className="info">
                <h1>
                {this.editableText(false, "text", (text) => this.state.content.info.name = text, this.state.content.info.name)}
                </h1>               
                <b>Mobil: </b>
                {this.editableText(false, "number", (text) => this.state.content.info.tlf = text, this.state.content.info.tlf)}
                <br/>
                <b>Email: </b>
                {this.editableText(false, "email", (text) => this.state.content.info.email = text, this.state.content.info.email)}
                <br/>
                <b>Bosted: </b>
                {this.editableText(false, "text", (text) => this.state.content.info.place = text, this.state.content.info.place)}
                <br/>
            </div>
        );
    }

    editableText(textarea, type, editText, text) {
        if(this.state.editMode){
            if(textarea) { 
                return(
                <textarea rows="4" cols="65"
                    type={type} 
                    onChange={(e) => {editText(e.target.value)}} 
                    value={text}> 
                </textarea>);
            }      
            return(
                <input
                    type={type} 
                    onChange={(e) => {editText(e.target.value)}} 
                    value={text}>
                </input>);
    
        }
        return text;
    }

    render() {
        return (
            <div>
                <Siderbar 
                    editButton={() => this.setState({editMode: !this.state.editMode})}>
                </Siderbar> 

                {this.personInfo()}

                <h2>Intro</h2>
                {this.editableText(true, "text", (text) => this.state.content.intro = text, this.state.content.intro)}
                <br/>
                <h2>Erfaring</h2>
                {this.experienceList("experience", this.state.content.experience)}
                <h2>Utdanning</h2>
                {this.experienceList("education", this.state.content.education)}

                <h2>Annet</h2>
                {this.editableText(true, "text", (text) => this.state.content.other = text, this.state.content.other)}
                <br/>
            </div>
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