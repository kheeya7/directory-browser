import React from 'react';
import ReactDOM from 'react-dom';
import './data.js';

function Person(props) {
    return (
        <div className="person">
            <h3>
                {props.person.name}, {props.person.title}, Principal Landscape Architect
            </h3>
            <p>
                <img className="size-medium alignright" src={props.person.img} alt={props.person.name} width="300" height="300" sizes="(max-width: 300px) 100vw, 300px" />
                {props.person.bio}
            </p>
        </div>
    );
}

function People(props) {
    return (
        <div className="result">
            {props.people.map(function (person) {
                return <Person key={person.id} person={person} />;
            })}
        </div>
    );
}

function Filters(props) {
    const titles = window.TCDirectory.titles;

    function updateName(evt) {
        props.updateFormState("currentName", evt.target.value);
    }

    function updateTitle(evt) {
        props.updateFormState("currentTitle", evt.target.value);
    }

    function updateIntern(evt) {
        props.updateFormState("isIntern", evt.target.checked);
    }

    return (
        <form action="" id="directory-filters">
            <div className="group">
                <label htmlFor="person-name">Name:</label>
                <input
                    type="text"
                    name="person_name"
                    laceholder="Name of employee"
                    id="person-name"
                    value={props.currentName}
                    onChange={updateName}
                />
            </div>
            <div className="group">
                <label htmlFor="person-title">Job Title:</label>
                <select name="person-title" id="person-title" value={props.currentTitle} onChange={updateTitle}>
                    <option value="">- Select -</option>
                    {titles.map(function (title) {
                        return (
                            <option value={title.key} key={title.key}>
                                {title.display}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="group">
                <label><input type="checkbox" value="1" name="person_intern" checked={props.isIntern} onChange={updateIntern} /> Intern</label>
            </div>
        </form>
    );
}

class Directory extends React.Component {
    constructor(props) {
        //calling the constructor of the class
        super(props);

        this.state = {
            people: window.TCDirectory.people,
            currentName: "",
            currentTitle: "",
            isIntern: false
        };
        this.updateFormState = this.updateFormState.bind(this);
    }

    updateFormState(name, val) {
        // Compueted property key [ES6 feature]: 
        // Let us use the one handler function to se any of the keys 
        this.setState(
            {
                [name]: val
            },
            this.updatePeopleList
        );
    }

    // search the whole employee list with current filters
    updatePeopleList() {
        var filterdPeople = window.TCDirectory.people.filter(
            function (person) {
                return (
                    person.intern === this.state.isIntern && (this.state.currentName === "" || person.name.toLowerCase().indexOf(this.state.currentName.toLowerCase()) !== -1) && (this.state.currentTitle === "" || person.title_cat === this.state.currentTitle)
                );
            }.bind(this)
        );

        this.setState({
            people: filterdPeople
        });
    }


    render() {
        return (
            <div className="company-directory">
                <h2>
                    Company Directory
                </h2>
                <p>Learn more about each person at Twiclo in this company directory.</p>

                <Filters
                    currentName={this.state.currentName}
                    currentTitle={this.state.currentTitle}
                    isIntern={this.state.isIntern}
                    updateFormState={this.updateFormState}
                />

                <People people={this.state.people} />
            </div>
        );
    }
}

// Setup a place where the components can be rendered when they are finished
ReactDOM.render(<Directory />, document.getElementById('directory-root'));
