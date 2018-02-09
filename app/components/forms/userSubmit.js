import { userSettingsSubmit } from '../../actions/actions'

function userSubmit(values, dispatch) {
  if(values.emailSub == null){
    values.emailSub = 0
  }
  // Check more values here
  dispatch(userSettingsSubmit(values));
}

export default userSubmit
