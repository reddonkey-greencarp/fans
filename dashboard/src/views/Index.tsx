import React, { lazy, PureComponent, Suspense } from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router';

import PageFrame from '../containers/Frame';
import Login from './Login';

import Progress from '../components/Progress';
import Snackbar from '../components/Snackbar';
import Notifier from '../containers/Notifier';

import withRoot from '../styles/withRoot';

const Users = lazy(() => import('../containers/Users'));
const Dashboard = lazy(() => import('../containers/Dashboard'));
const Data = lazy(() => import('../containers/Data'));
const NoMatch = lazy(() => import('./NoMatch'));

class Index extends PureComponent {

    routeRender = (Component: JSX.Element) => (props: RouteComponentProps) =>
        <PageFrame {...props}>
            <Suspense fallback={<Progress/>}>
                {Component}
            </Suspense>
        </PageFrame>;

    render() {
        return (
            <Snackbar>
                <Notifier/>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' exact render={this.routeRender(<Dashboard/>)}/>
                    <Route path='/data' render={this.routeRender(<Data/>)}/>
                    <Route path='/users' render={this.routeRender(<Users/>)}/>
                    <Route render={this.routeRender(<NoMatch/>)}/>
                </Switch>
            </Snackbar>
        );
    }
}

export default withRouter(withRoot(Index));
