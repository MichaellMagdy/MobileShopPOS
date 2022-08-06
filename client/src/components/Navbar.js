import { Tab } from 'semantic-ui-react';
import React, { Component } from 'react';
import 'semantic-ui-css-offline';
import Home from '../pages/Home';
import Admin from '../pages/Admin';


class TabExampleBasic extends Component {
    panes() {

        return [
            { menuItem: 'Dashboard', render: () => <Tab.Pane>< Home /></Tab.Pane> },
            { menuItem: 'Admin', render: () => <Tab.Pane><Admin /></Tab.Pane> },
        ]
    }
    state = { activeIndex: 0 }

    handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

    render() {
        const { activeIndex } = this.state

        return (
            <div>


                <Tab
                    panes={this.panes()}
                    activeIndex={activeIndex}
                    onTabChange={this.handleTabChange}
                />
            </div>
        )
    }
}

export default TabExampleBasic