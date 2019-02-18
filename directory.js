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
    return (
        <form action="" id="directory-filters">
            <p>Filters go here</p>
        </form>
    );
}

// Create the directory component using a class
class Directory extends React.Component {
    constructor(props) {
        //calling the constructor of the class
        super(props);

        this.state = {
            people: window.TCDirectory.people
        };
    }

    render() {
        return (
            <div className="company-directory">
                <h2>
                    Company Directory
                </h2>
                <p>Learn more about each person at Twiclo in this company directory.</p>

                <Filters />

                <People people={this.state.people} />

            </div>
        );
    }
}

// Setup a place where the components can be rendered when they are finished
ReactDOM.render(<Directory />, document.getElementById('directory-root'));
