// @flow
import * as GitGen from '../../actions/git-gen'
import * as Constants from '../../constants/git'
import DeleteRepo from '.'
import {compose, renderNothing, branch, connect, type TypedState} from '../../util/container'

const mapStateToProps = (state: TypedState, {routeProps}) => {
  const gitMap = Constants.getIdToGit(state)
  const git = gitMap ? gitMap.get(routeProps.get('id')) : null

  return git
    ? {
        error: Constants.getError(state),
        name: git.name,
        teamname: git.teamname,
        waitingKey: Constants.loadingWaitingKey,
      }
    : {
        error: null,
        name: '',
        teamname: '',
        waitingKey: '',
      }
}

const mapDispatchToProps = (dispatch: any, {navigateAppend, navigateUp}) => ({
  _onDelete: (teamname: ?string, name: string, notifyTeam: boolean) => {
    const deleteAction = teamname
      ? GitGen.createDeleteTeamRepo({teamname, name, notifyTeam})
      : GitGen.createDeletePersonalRepo({name})
    dispatch(deleteAction)
  },
  onClose: () => dispatch(navigateUp()),
})

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  stateProps.name
    ? {
        ...stateProps,
        ...dispatchProps,
        onDelete: (notifyTeam: boolean) =>
          dispatchProps._onDelete(stateProps.teamname, stateProps.name, notifyTeam),
      }
    : {
        ...stateProps,
        onClose: dispatchProps.onClose,
        onDelete: () => {},
      }

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  ),
  branch(props => !props.name, renderNothing)
)(DeleteRepo)
