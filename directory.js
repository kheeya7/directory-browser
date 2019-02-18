(function () {
    "use strict";

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
})();
